import { useState, useEffect } from "react"
import { FaStar } from "react-icons/fa6";
import { ImRedo2 } from 'react-icons/im'
import { GrMail } from 'react-icons/gr'
import { authApi } from "../api/authenticationService"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { MdPlaylistAddCheck } from "react-icons/md"
import { Link } from "react-router-dom"

const Profile = () => {
  const navigate = useNavigate();
  const Auth = useAuth();
  const user = Auth.user;
  console.log(user)
  
  const isUser = user.data.rol[0] === 'USER';
  const [currentUser, setCurrentUser] = useState('');
  const [completed, setCompleted] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);

  useEffect(() => {
    if (!isUser) {
      navigate('/');
    }
  }, [isUser, navigate]);

  useEffect(() => {
    async function fetchProfileData() {
      const numberCompleted = localStorage.getItem('tasksCompleted');
      if (numberCompleted === null) {
        setCompleted(0);
        return;
      }
      setCompleted(numberCompleted);
      
      console.log("#", numberCompleted)
      try {
        const response = await authApi.getUserProfile(user);
        console.log('RES', response.data)
        setCurrentUser(response.data);
        setTotalCompleted((response.data.numberCompleted) - 3);
        console.log(response.data)
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        localStorage.setItem('dayNumber', response.data.dayNumber);
      } catch(err) {
        console.log(err);
      }
    }
    fetchProfileData();
  }, [user]);
  
  return (
    <div className="pt-12 min-h-screen bg-slate-600 px-4 flex flex-col pt-24">
      {currentUser && (
        <>
        <h1 className="text-amber-300 text-center text-4xl font-bold pb-12">{currentUser.username}</h1>
        <div className="flex items-center px-4 justify-between">
          
        <GrMail className="text-amber-300 text-3xl mr-16"><a href="/update"/></GrMail>
        <p className="font-semibold text-xl text-cyan-400"><a href="/update">Change email</a></p>
        
        </div>
        <div className="flex items-center px-4 pt-6 justify-between">
        <MdPlaylistAddCheck className="text-amber-300 text-5xl mr-14"/>
        <p className="font-semibold text-xl text-cyan-400 "> Daily tasks: <a className="text-amber-300 font-semibold text-xl">{completed}/7</a></p>
        </div>
        <div className="flex items-center px-4 pt-6 justify-between">
          <FaStar className="text-amber-300 text-3xl"/>
          <p className="font-semibold text-xl text-cyan-400 "> Current streak: <a className="text-amber-300 font-semibold text-xl">{totalCompleted}</a></p>
        </div>
        <div className="flex items-center justify-between px-4 pt-6">
          <Link to="/restart">
          <ImRedo2 className="text-3xl text-amber-300"/>
          </Link>
          <p className='font-semibold text-xl text-cyan-400 '>Start challenge over </p>
        </div>
        </>
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