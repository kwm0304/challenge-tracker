import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'
import Checklist from './components/Checklist'
import NavBar from './components/NavBar'
import StartChallenge from './components/StartChallenge'
import { AuthProvider } from './context/AuthContext'
import Pictures from './components/Pictures'
function App() {
  

  
  return (
    <>
      
      <AuthProvider>
      <Router>
      <NavBar />
      <Routes>
        
        <Route path="/start" element={<StartChallenge />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/pictures" element={<Pictures />} />
      </Routes>
      </Router>
      </AuthProvider>
      
    </>
  )
}

export default App
