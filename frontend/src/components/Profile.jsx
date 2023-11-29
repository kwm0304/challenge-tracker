import { useState, useEffect } from "react"
import { FaStar } from "react-icons/fa6";
import { ImRedo2 } from 'react-icons/im'
import { GrMail } from 'react-icons/gr'
import { authApi, checklistImageUrl } from "../api/authenticationService"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { MdPlaylistAddCheck } from "react-icons/md"
import { AiOutlineUserDelete } from "react-icons/ai";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const Auth = useAuth();
  const user = Auth.user;
  console.log(user)
  
  const isUser = user.data.rol[0] === 'USER';
  const [currentUser, setCurrentUser] = useState('');
  const [completed, setCompleted] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const checklistId = localStorage.getItem('checklistId');
  console.log('checklistId', checklistId)
  const [image, setImage] = useState(null)


  useEffect(() => {
    if (!isUser) {
      navigate('/');
    } else {
      axios.get(checklistImageUrl(checklistId), {
        headers: { Authorization: `Bearer ${user.accessToken}` },
        responseType: 'blob'
    }).then(res => {
      const imageUrl = URL.createObjectURL(res.data)
      setImage(imageUrl)
    }).catch(err => {
      console.log(err)
    })
  }
  }, [isUser, navigate]);

  useEffect(() => {
    async function fetchProfileData() {
      const numberCompleted = localStorage.getItem('tasksCompleted');
      
      setCompleted(numberCompleted - 1);
      if (numberCompleted === null) {
        setCompleted(0);
      }
      
      console.log("#", numberCompleted)
      try {
        const response = await authApi.getUserProfile(user);
        console.log('RES', response.data)
        setCurrentUser(response.data);
        setTotalCompleted((response.data.numberCompleted));
        console.log(response.data)
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        localStorage.setItem('dayNumber', response.data.dayNumber);
      } catch(err) {
        console.log("Error fetching profile", err);
      }
    }
    fetchProfileData();
  }, [user]);
  
  return (
    <div className="pt-12 min-h-screen bg-slate-600 px-4 flex flex-col pt-24">
      {currentUser && (
        <>
        <h1 className="text-amber-300 text-center text-4xl font-bold pb-12">{currentUser.username}</h1>
        <div className="bg-slate-800 py-8 border-2 border-slate-400 rounded-xl drop-shadow-xl">

        <div className="flex items-center px-4 justify-between  mb-8">
        <GrMail className="text-amber-300 text-3xl mr-16 "><a href="/update"/></GrMail>
        <p className="font-semibold text-xl text-cyan-400"><a href="/update">Change email</a></p>
        </div>
        <div className="border-t-2 border-slate-400  mx-auto"></div>
        <div className="flex items-center px-4 pt-6 justify-between mb-8">
        <MdPlaylistAddCheck className="text-amber-300 text-5xl mr-14"/>
        <p className="font-semibold text-xl text-cyan-400 "> Daily tasks: <a className="text-amber-300 font-semibold text-xl">{completed}/7</a></p>
        </div>
        <div className="border-t-2 border-slate-400  mx-auto"></div>
        <div className="flex items-center px-4 pt-6 justify-between mb-8">
          <FaStar className="text-amber-300 text-3xl"/>
          <p className="font-semibold text-xl text-cyan-400 "> Current streak: <a className="text-amber-300 font-semibold text-xl">{totalCompleted}</a></p>
        </div>
        <div className="border-t-2 border-slate-400  mx-auto"></div>
        <div className="flex items-center justify-between px-4 pt-6 mb-8">
          <ImRedo2 className="text-3xl text-amber-300"><a href="/end"></a></ImRedo2>
          <p className='font-semibold text-xl text-cyan-400 '><a href="/end">Start challenge over </a></p>
        </div>
        <div className="border-t-2 border-slate-400 mx-auto"></div>
        <div className="flex items-center justify-between px-4 pt-6">
          <AiOutlineUserDelete className="text-3xl text-amber-300"><a href="/delete"></a></AiOutlineUserDelete>
          <p className='font-semibold text-xl text-cyan-400 '><a href="/end">Delete Account</a></p>
        </div>

        </div>
        <div className="flex justify-center pt-2">
          {image && (
            <>
            <img src={image} alt="checklist" className="rounded-full" width={200} height={200}/>
            </>
          )}
        </div>
        </>
      )}
  
        
      
    </div>
  )
}

export default Profile