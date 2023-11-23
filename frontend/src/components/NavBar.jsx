
import { useAuth } from "../context/AuthContext"

import { Link } from "react-router-dom"

import { IoMdPhotos } from "react-icons/io";
import { FaClipboardList, FaUserCircle } from "react-icons/fa";

const NavBar = () => {
  const { userLogout } = useAuth();
 
  const logout = () => {
    userLogout()
    
  }

  return (
    <nav className="p-2 px-4 h-20 fixed top-0  w-screen flex justify-between items-center bg-slate-800 text-white">
      <button onClick={logout} className='font-bold uppercase text-slate-800 bg-amber-400 cursor-pointer  rounded-lg p-2 focus:bg-amber-500 focus:text-white focus:scale-125 transform transition hover:scale-105 duration-300 ease-in-out'>
        <Link to="/">Logout</Link>
      </button>
      <div className="flex space-x-4 font-semibold">
        <Link to="/profile">
          <FaUserCircle className="text-amber-400 text-3xl"/>
        </Link>
        <Link to="/checklist">
          <FaClipboardList className="text-amber-400 text-3xl"/>
        </Link>
        <Link to="/pictures">
          <IoMdPhotos className="text-amber-400 text-3xl"/>
        </Link>
        </div>
    </nav>
  )
}

export default NavBar