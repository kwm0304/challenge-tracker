import { useRef } from 'react'
import Confetti from 'react-confetti'

const ChallengeComplete = () => {
  const windowSize = useRef([window.innerWidth, window.innerHeight])
  const width = windowSize.current[0]
  const height = windowSize.current[1]
  const userData = localStorage.getItem('currentUser')
  const username = JSON.parse(userData).username
  
  return (
    <div className="bg-slate-600 min-h-screen flex flex-col items-center">
      <Confetti width={width} height={height} />
      <h1 className="text-amber-300 text-4xl font-bold mt-28 text-center">Congratulations {username}!</h1>
    </div>
  )
}

export default ChallengeComplete