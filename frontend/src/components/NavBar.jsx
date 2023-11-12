import { useState, useEffect } from "react"
import { logout, getCurrentUser } from "../service/authService"
import { Link } from "react-router-dom"

const NavBar = () => {
  const [loggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    logout()
    setIsLoggedIn(false)
  }
  return (
    <nav className="p-2 px-4 fixed top-0 left-0 w-full flex justify-between items-center bg-slate-800 text-white">
      <Link to="/">
        <div className="">Home</div>
      </Link>
      <div className="flex space-x-4 font-semibold">
      {loggedIn ? (
          <button onClick={handleLogout} className='text-emerald-400 cursor-pointer'>
            <Link to="/login">Logout</Link>
          </button>
        ) : (
          <div className='text-emerald-400 cursor-pointer'>
          <Link to="/login">Login</Link>
          </div>
        )}
        <Link to="/profile">
          <div className="">Profile</div>
        </Link>
        <Link to="/checklist">
          <div className="">Checklist</div>
        </Link>
        </div>
    </nav>
  )
}

export default NavBar