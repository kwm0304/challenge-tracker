
import {  getCurrentUser } from "../service/authService"
import {BiSolidUserCircle} from 'react-icons/bi'
const Profile = () => {

  const currentUser = getCurrentUser();

  return (
    <div className="pt-12 min-h-screen bg-slate-600 px-4">
      <h1 className="text-amber-500 font-bold text-3xl">Profile</h1>
      <div className="grid grid-cols-3 justify-items-center pt-12">
        <BiSolidUserCircle />
      <p className="font-semibold text-xl text-cyan-400">{currentUser.username}</p>
      <div className=""></div>
      </div>
      <p>Access Token: {currentUser.accessToken}</p>
      <p>User Id: {currentUser.id}</p>
      <div className="grid grid-cols-3 justify-items-center">
        <p className="text-center">Email</p>
      <p className="font-semibold text-xl text-cyan-400">{currentUser.email}</p>
      </div>
      
      <ul>Role: {currentUser.roles && currentUser.roles.map((role, index) => 
        <li key={index}>{role}</li>
      )}</ul>
    </div>
  )
}

export default Profile