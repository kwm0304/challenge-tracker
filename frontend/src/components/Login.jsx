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
  return (
    <div>
      <form onSubmit={handleLogin}>
      <div>
          <label htmlFor="username">Login</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            {...userAttributes}
            required
            />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Login