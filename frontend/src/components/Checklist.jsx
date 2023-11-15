import { useEffect, useState } from "react"
import ChecklistItem from "./ChecklistItem"
import Gif from "./Gif"
import { authApi } from "../api/authenticationService"
import { useAuth } from "../context/AuthContext";

const Checklist = () => {
  const Auth = useAuth();
  const user = Auth.user
  console.log(user)
  
  const [checklistState, setChecklistState] = useState({
    workoutOne: false,
    workoutTwo: false,
    drinkWater: false,
    noAlcohol: false,
    readTenPages: false,
    noCheatMeals: false,
    takePicture: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [date, setDate] = useState('')
  const [checklistId, setChecklistId] = useState(null)

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const fetchedDate = localStorage.getItem('fetchedDate');
    const isSubmitted = localStorage.getItem('submitted') === 'true';

    if (fetchedDate === today && isSubmitted) {
      setSubmitted(true);
      const storedChecklist = localStorage.getItem('checklistData');
      if (storedChecklist) {
        const checklistData = JSON.parse(storedChecklist);
        setDate(checklistData.date);
      }
    } else {
      fetchDate();
    }
  }, [user])

  const fetchDate = async () => {
    try {
      const response = await authApi.getCurrentChecklist(user)
      setChecklistId(response.data.id)
      setDate(response.data.date)

      const today = new Date().toISOString.split('T')[0];
      console.log(today)
      localStorage.stItem('fetchedDate', today);
      localStorage.setItem('checklistData', JSON.stringify(response.data))
      localStorage.setItem('submitted', 'false')
    } catch (err) {
      console.error(err)
    }
  }
    
  console.log(date)
  console.log(checklistState)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.submitCurrentChecklist(user, checklistState, checklistId)
      console.log('checklist submission', response)
      setSubmitted(true)
      localStorage.setItem('submitted', 'true')
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
      <p className="text-amber-300 text-3xl text center mt-8 font-bold">{date}</p>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-rows-7 gap-y-6 h-full px-2 w-96 text-center pt-4 items-center">
          <ChecklistItem label="Workout 1" value={checklistState.workoutOne} onChange={(e) => handleChecklistChange(e, "workoutOne")} />
          <ChecklistItem label="Workout2" value={checklistState.workoutTwo} onChange={e => handleChecklistChange(e, 'workoutTwo')} />
          <ChecklistItem label="Drink Water" value={checklistState.drinkWater} onChange={e => handleChecklistChange(e, 'drinkWater')} />
          <ChecklistItem label="No Alcohol" value={checklistState.noAlcohol} onChange={e => handleChecklistChange(e, 'noAlcohol')} />
          <ChecklistItem label="Read 10 Pages" value={checklistState.readTenPages} onChange={e => handleChecklistChange(e, 'readTenPages')} />
          <ChecklistItem label="Stuck to Diet" value={checklistState.noCheatMeals} onChange={e => handleChecklistChange(e, 'noCheatMeals')} />
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