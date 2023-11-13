
import {  getCurrentUser } from "../service/authService"
import {BiSolidUserCircle} from 'react-icons/bi'
import { GrMail } from 'react-icons/gr'
const Profile = () => {

  const currentUser = getCurrentUser();

  return (
    <div className="pt-12 min-h-screen bg-slate-600 px-4">
      <h1 className="text-amber-500 font-bold text-3xl">Profile</h1>
      <div className="grid grid-cols-3 justify-items-center mt-12 border-2 border-slate-400 rounded-xl p-2 bg-slate-800 gap-y-4">
        <BiSolidUserCircle className="text-amber-300 text-3xl mr-16"/>
      <p className="font-semibold text-xl text-cyan-400">{currentUser.username}</p>
      <div></div>
      <GrMail className="text-amber-300 text-3xl mr-16"/>
      <p className="font-semibold text-xl text-cyan-400">{currentUser.email}</p>
      <div></div>
      </div>
      <p>Access Token: {currentUser.accessToken}</p>
      <p>User Id: {currentUser.id}</p>
      
      
      <ul>Role: {currentUser.roles && currentUser.roles.map((role, index) => 
        <li key={index}>{role}</li>
      )}</ul>
    </div>
  )
}

export default Profile