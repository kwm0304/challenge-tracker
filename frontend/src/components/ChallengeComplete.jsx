import { useEffect, useRef, useState } from 'react'
import Confetti from 'react-confetti'
import { authApi } from '../api/authenticationService'
import { useAuth } from '../context/AuthContext';

const ChallengeComplete = () => {
  const windowSize = useRef([window.innerWidth, window.innerHeight])
  const width = windowSize.current[0]
  const height = windowSize.current[1]
  const username = JSON.parse(userData).username
  const [images, setImages] = useState([])
  const { user } = useAuth();
  const userData = localStorage.getItem('currentUser');
  const userId = JSON.parse(userData).id
  

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await authApi.getStartAndEndPics(user, userId);
        const imageUrls = response.data.map(blob => URL.createObjectURL(blob));
        setImages(imageUrls);
      } catch (err) {
        console.error(err)
      }
    }

    if(userId) {
      fetchImages();
    }
  }, [user, userId])
  
  return (
    <div className="bg-slate-600 min-h-screen flex flex-col items-center">
      <Confetti width={width} height={height} />
      <h1 className="text-amber-300 text-4xl font-bold mt-28 text-center">Congratulations {username}!</h1>
      {images.map((imageUrl, index) => {
        <img key={index} src={imageUrl} className="w-1/2 h-1/2" />
      })}
    </div>
  )
}

export default ChallengeComplete