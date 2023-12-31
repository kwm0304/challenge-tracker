import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authApi } from '../api/authenticationService';
import { parseJwt } from '../helpers';


const Login = () => {
  const Auth = useAuth();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.authenticate(username, password)
      const { accessToken, hasActiveChallenge } = response.data;
      
      const data = parseJwt(accessToken);
      const authenticatedUser = { data, accessToken };

      Auth.userLogin(authenticatedUser);
      setUsername('');
      setPassword('');

      return navigate(hasActiveChallenge ? '/profile' : '/start')
    } catch (error) {
      console.log(error)
    }
  }

const formInputClass = "w-full px-3 py-2 text-gray-700 border rounded-lg  focus:border-blue-500 ";
  const formLabelClass = "block text-slate-300 text-sm font-bold mb-2";

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-600'>

    <div className='w-96 p-6 bg-slate-800 rounded-lg shadow-lg'>
      <h1 className='text-amber-500 font-bold text-3xl pb-6 text-center'>Login</h1>
      <form onSubmit={handleLogin}>
      <div>
          <label htmlFor="username" className={formLabelClass}>Login</label>
          <input
            type="text"
            id="username"
            value={username}
            required
            className={formInputClass}
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <div className='m'>
          <label htmlFor="password" className={formLabelClass}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='********'
            className={formInputClass}
            />
        </div>
        <p className='text-slate-400 mt-4'>Don't have an account? <a href='/signup' className='text-amber-500'>Signup</a></p>
        <div className='flex justify-center'>
        <button className='bg-green-600 text-lg uppercase text-white  font-semibold w-24 my-4 rounded-xl p-2'>Submit</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Login