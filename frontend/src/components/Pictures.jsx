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
  const [pictures, setPictures] = useState([])
  

  useEffect(() => {
    axios.get(`http://localhost:8080/api/challenge/user/${user.id}/images`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(response => {
      const ids = response.data;
      return Promise.all(ids.map(id => {
        axios.get(checklistImageUrl(id), {
          headers: { Authorization: `Bearer ${accessToken}` },
        responseType: 'blob'
      }).then(res => URL.createObjectURL(res.data))
    })
  })
  .then(urls => {
    setPictures(urls)
  })
  .catch(err => {
    console.log(err)
  })
  }, [user, accessToken])
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