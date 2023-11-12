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

  return (
    <div>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="firstName">Username</label>
          <input
            type="text"
            id="firstName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Signup