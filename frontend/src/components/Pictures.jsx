import { useEffect, useState } from 'react'
import { checklistImageUrl } from '../api/authenticationService'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { apiClient } from '../api/axios'
const Pictures = () => {
  const Auth = useAuth();
  const user = Auth.user
  const userData = localStorage.getItem('currentUser')
  const userDataString = JSON.parse(userData)
  const userId = userDataString.id
  console.log('userId', userId)

  const accessToken = user.accessToken;
  const localChecklistId = localStorage.getItem('checklistId')
  const parsedChecklistId = JSON.parse(localChecklistId)
  const checklistId = parsedChecklistId;
  console.log(checklistId)
  const [pictures, setPictures] = useState([])
  

  //move to authService
  useEffect(() => {
    const fetchImages = async () => {
      if (!userId|| !accessToken) {
        console.log('userId', userId)
        console.log(accessToken)
        console.log("Waiting on user id or access token")
        return;   
      }
      try {
        const response = await apiClient.get(`/api/challenge/${userId}/images`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        console.log(userId)
        const ids = response.data;
        console.log('ids', ids)
        console.log(accessToken)
        const urls = await Promise.all(ids.map(id => 
          axios.get(checklistImageUrl(id), {
            headers: { Authorization: `Bearer ${accessToken}` },
          responseType: 'blob'
        }).then(res => URL.createObjectURL(res.data))
        
        ))
        setPictures(urls)
      } catch (error) {
        console.log(error)
      }
    }
    fetchImages()
  }, [user, accessToken, userId])
  console.log(pictures)
  return (
    <div className="min-h-screen bg-slate-800">
      <div className="grid grid-cols-3 gap-1 mx-1 text-white pt-24 justify-center text-center">
        {pictures.map((url, index) => (
          <div key={index}>
            <img src={url} className='w-full h-full'/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pictures