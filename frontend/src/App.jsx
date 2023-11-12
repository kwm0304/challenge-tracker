import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'
import Checklist from './components/Checklist'
import NavBar from './components/NavBar'
import { AuthProvider } from './context/AuthProvider'
function App() {
  

  
  return (
    <>
      <BrowserRouter>
      <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
