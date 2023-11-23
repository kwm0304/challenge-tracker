import { useState, useEffect } from "react"
import {BiSolidUserCircle} from 'react-icons/bi'
import { GrMail } from 'react-icons/gr'
import { authApi } from "../api/authenticationService"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { MdPlaylistAddCheck } from "react-icons/md"

const Profile = () => {
  const navigate = useNavigate();
  const Auth = useAuth();
  const user = Auth.user;
  
  const isUser = user.data.rol[0] === 'USER';
  const [currentUser, setCurrentUser] = useState('');
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    if (!isUser) {
      navigate('/');
    }
  }, [isUser, navigate]);

  useEffect(() => {
    async function fetchProfileData() {
      const numberCompleted = localStorage.getItem('numberCompleted');
      if (numberCompleted === null) {
        setCompleted(0);
        return;
      }
      setCompleted(numberCompleted - 2);
      
      console.log("#", numberCompleted)
      try {
        const response = await authApi.getUserProfile(user);
        console.log('RES', response.data)
        setCurrentUser(response.data);
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        localStorage.setItem('dayNumber', response.data.dayNumber);
      } catch(err) {
        console.log(err);
      }
    }
    fetchProfileData();
  }, [user]);

  console.log(currentUser)
  

  return (
    <div className="pt-12 min-h-screen bg-slate-600 px-4">
      <h1 className="text-amber-500 font-bold text-3xl">Profile</h1>
      {currentUser && (
      <div className="grid grid-cols-2 justify-items-center mt-12 border-2 border-slate-400 rounded-xl p-2 bg-slate-800 gap-y-4">
        <BiSolidUserCircle className="text-amber-300 text-3xl mr-16"/>
        <p className="font-semibold text-xl text-cyan-400">{currentUser.username}</p>
      
      
      <GrMail className="text-amber-300 text-3xl mr-16"/>
      <p className="font-semibold text-xl text-cyan-400">Change contact information</p>
      
      <MdPlaylistAddCheck className="text-amber-300 text-4xl mr-14"/>
      <div className="font-semibold text-xl text-cyan-400"> {completed}/7</div>
      
      </div>
      )}
      <div className="bg-slate-800 w-full text-amber-300">Hello</div>
      <p>Access Token: token</p>
      <p>User Id: id</p>
      {currentUser && (
        <div>{currentUser.roles}</div>
        )}
        
      
    </div>
  )
}

export default Profile