import { useState } from 'react'
import { register } from '../service/authService'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    try {
      register( username, email, password)
    .then((response) => {
      console.log("hi", response);
      navigate('/login')
    })
    } catch (err) {
      if (!err?.response) {
        console.error("No server response", err)
      } else {
        console.log("Signup failed", err)
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
            type="text"
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