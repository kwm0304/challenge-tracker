
import { useAuth } from "../context/AuthContext"

import { Link } from "react-router-dom"

const NavBar = () => {
  const {  userIsAuthenticated, userLogout } = useAuth();
 
  const logout = () => {
    userLogout()
    
  }

  
  return (
    <nav className="p-2 px-4 h-20 fixed top-0  w-screen flex justify-between items-center bg-slate-800 text-white">
      {userIsAuthenticated ? (
          <button onClick={logout} className='font-semibold uppercase text-amber-400 cursor-pointer border-2 border-amber-500 rounded-lg p-1 focus:bg-amber-500 focus:text-white focus:scale-125 transform transition hover:scale-105 duration-300 ease-in-out'>
            <Link to="/login">Logout</Link>
          </button>
        ) : (
          <div className='text-amber-400 cursor-pointer'>
          <Link to="/login">Login</Link>
          </div>
        )}
      <div className="flex space-x-4 font-semibold">
        
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