import pic from '../assets/pic.png'
import { useEffect, useState } from 'react'
import { checklistImageUrl } from '../api/authenticationService'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
const Pictures = () => {
  const Auth = useAuth();
  const user = Auth.user
  const accessToken = user.accessToken;
  const checklistDataString = localStorage.getItem('checklistData')
  const checklistData = JSON.parse(checklistDataString)
  const checklistId = checklistData.id;
  console.log(checklistId)
  const [picture, setPicture] = useState(null)
  

  useEffect(() => {
    axios.get(checklistImageUrl(checklistId), {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      responseType: 'blob'
    })
    .then(response => {
      const imageUrl = URL.createObjectURL(response.data)
      setPicture(imageUrl)
    })
    .catch(error => {
      console.error("Error fetching image", error)
    })
  }, [checklistId, accessToken])
  return (
    <div className="min-h-screen bg-slate-800">
      <div className="grid grid-cols-3 gap-1 mx-1 text-white pt-24 justify-center text-center">
      <div>
        <img src={picture} 
        className='w-full h-full'
        />
      </div>
      <div>
        <img src={pic}/>
      </div>
      <div>
        <img src={pic}/>
      </div>
      
      </div>
    </div>
  )
}

export default Pictures