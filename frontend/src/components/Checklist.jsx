import { useEffect, useState } from "react"
import axios from "axios"
import ChecklistItem from "./ChecklistItem"
import Gif from "./Gif"

const Checklist = () => {
  const challengeId = JSON.parse(localStorage.getItem("currentUser")).currentChallengeId;
  console.log(challengeId)
  const accessToken = JSON.parse(localStorage.getItem("currentUser")).accessToken;
console.log(accessToken)
  const [checklistState, setChecklistState] = useState({
    workout1: false,
    workout2: false,
    drinkWater: false,
    noAlcohol: false,
    readTenPages: false,
    noCheatMeal: false,
    takePicture: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [date, setDate] = useState('')

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/checklist/current/${challengeId}`, {
           headers: {
            'Authorization': `Bearer ${accessToken}`
          } });
        console.log(response)
        setDate(response.data.date)
      } catch (err) {
        console.error(err)
      }
    }
    fetchDate()
  }, [challengeId])
  console.log(date)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(`http://localhost:8080/api/checklist/current/${challengeId}`, checklistState,{
          headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("currentUser")).accessToken,
          }
      })
      console.log('checklist submission', response)
      setSubmitted(true)
    }
    catch (err) {
      console.error(err)
    }
  }
    const handleChecklistChange = (e, key) => {
      const updatedState = {...checklistState, [key]: e.target.checked}
      setChecklistState(updatedState)}

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-600">
      {submitted ? <Gif /> : (
        <>
      <p className="text-amber-300 text-3xl text center">{date}</p>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-rows-7 gap-y-6 h-full px-2 w-96 text-center pt-4 items-center">
          <ChecklistItem label="Workout 1" value={checklistState.workout1} onChange={(e) => handleChecklistChange(e, "workout1")} />
          <ChecklistItem label="Workout2" value={checklistState.workout2} onChange={e => handleChecklistChange(e, 'workout2')} />
          <ChecklistItem label="Drink Water" value={checklistState.drinkWater} onChange={e => handleChecklistChange(e, 'drinkWater')} />
          <ChecklistItem label="No Alcohol" value={checklistState.noAlcohol} onChange={e => handleChecklistChange(e, 'noAlcohol')} />
          <ChecklistItem label="Read 10 Pages" value={checklistState.readTenPages} onChange={e => handleChecklistChange(e, 'readTenPages')} />
          <ChecklistItem label="Stuck to Diet" value={checklistState.noCheatMeal} onChange={e => handleChecklistChange(e, 'noCheatMeals')} />
          <ChecklistItem label="Take Picture" value={checklistState.takePicture} onChange={e => handleChecklistChange(e, 'takePicture')} />
        </div>
        <div className='flex justify-center'>
        <button className='bg-green-600 text-lg uppercase text-white  font-semibold w-24 my-4 rounded-xl p-2'>Submit</button>
        </div>
      </form>
      </>
      )}
    </div>
  )
}

export default Checklist