import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'
import Checklist from './components/Checklist'
import NavBar from './components/NavBar'
import StartChallenge from './components/StartChallenge'
import { AuthProvider } from './context/AuthContext'
import Home from './components/Home'
function App() {
  

  
  return (
    <>
      
      <AuthProvider>
      <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<StartChallenge />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </Router>
      </AuthProvider>
      
    </>
  )
}

export default App
