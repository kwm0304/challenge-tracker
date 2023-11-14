import { useState } from 'react'
import { parseJwt } from '../helpers'
import { Navigate } from 'react-router-dom'
import { authApi } from '../api/authenticationService'
import { useAuth } from '../context/AuthContext'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const Auth = useAuth();
  const isLoggedIn = Auth.userIsAuthenticated();

  const handleSignup = async (e) => {
    e.preventDefault();
    const user = { username, email, password }

    try {
      const response = await authApi.signup(user);
      const { accessToken } = response.data;
      const data = parseJwt(accessToken);
      const authenticatedUser = { data, accessToken };

      Auth.userLogin(authenticatedUser);
      setUsername('');
      setEmail('');
      setPassword('');
      if (isLoggedIn) {
        return <Navigate to='/profile' />
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Invalid signup", error.response.data)
      } if (error.response.data.status === 409) {
        console.log("User already exists")
      } else if (error.response.data.status === 400) {
        console.log(error.response.data.errors[0].defaultMessage)
      }
    }
  }
  

  const formInputClass = "w-full px-3 py-2 text-gray-700 border rounded-lg  focus:border-blue-500 ";
  const formLabelClass = "block text-slate-300 text-sm font-bold mb-2";
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-600'>
      <div className="w-96 p-6 bg-slate-800 rounded-lg shadow-lg">
        <h1 className="text-amber-500 font-bold text-3xl pb-6 text-center">Signup</h1>
      
      <form onSubmit={handleSignup}>
        <div className='mb-4'>
          <label htmlFor="username" className={formLabelClass}>Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={formInputClass}
            />
        </div>
        
        <div className='mb-4'>
          <label htmlFor="email" className={formLabelClass}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={formInputClass}
            />
        </div>
        <div className='mb-4'>
          <label htmlFor="password" className={formLabelClass}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={formInputClass}
            />
        </div>
        <div className='flex justify-center'>
        <button className='bg-green-600 text-lg uppercase text-white  font-semibold w-24 my-4 rounded-xl p-2'>Submit</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Signup