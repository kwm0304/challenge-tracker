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
import PrivateRoute from './components/PrivateRoute'
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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/checklist" element={<PrivateRoute><Checklist /></PrivateRoute>} />
        <Route path="/start" element={<PrivateRoute><StartChallenge /></PrivateRoute>} />
        <Route path="/end" element={<PrivateRoute><EndChallenge /></PrivateRoute>} />
        <Route path="/checklist" element={<PrivateRoute><Checklist /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/pictures" element={<PrivateRoute><Pictures /></PrivateRoute>} />
        <Route path="/update" element={<PrivateRoute><UpdateContact/></PrivateRoute>} />
        <Route path="/complete" element={<PrivateRoute><ChallengeComplete/></PrivateRoute>} />
      </Routes>
    </>
  )
}

export default App
