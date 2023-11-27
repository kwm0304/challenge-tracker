import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'
import Checklist from './components/Checklist'
import NavBar from './components/NavBar'
import StartChallenge from './components/StartChallenge'
import { AuthProvider, useAuth } from './context/AuthContext'
import Pictures from './components/Pictures'
import Home from './components/Home'
import UpdateContact from './components/UpdateContact'
import ChallengeComplete from './components/ChallengeComplete'
import EndChallenge from './components/EndChallenge'
function App() {
  

  
  return (
    <>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
      
    </>
  )
}

function AppContent() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<StartChallenge />} />
        <Route path="/end" element={<EndChallenge />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pictures" element={<Pictures />} />
        <Route path="/update" element={<UpdateContact/>} />
        <Route path="/complete" element={<ChallengeComplete/>} />
      </Routes>
    </>
  )
}

export default App
