import { useState, useRef } from 'react'
import { login } from '../service/authService'
import { useNavigate } from 'react-router-dom'
import useInput from '../hooks/useInput';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { setAuth } = useAuth();

  
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const userRef = useRef();

  const [user, resetUser, userAttributes] = useInput('user', '')

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(user, password)
      
        const accessToken = response.data.accessToken;
        const roles = response.data.roles;
        setAuth({ user, password, roles, accessToken });
        if (accessToken) {
          localStorage.setItem("currentUser", JSON.stringify(response.data));
        }
        resetUser();
        setPassword('');
        navigate('/profile')
    } catch (err) {
      console.error("Login failed", err)
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
            ref={userRef}
            {...userAttributes}
            required
            className={formInputClass}
            />
        </div>
        <div className='m'>
          <label htmlFor="password" className={formLabelClass}>Password</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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

export default Login