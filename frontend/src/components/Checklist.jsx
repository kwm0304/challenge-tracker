import { useEffect, useState } from "react"
import ChecklistItem from "./ChecklistItem"
import Gif from "./Gif"
import { authApi } from "../api/authenticationService"
import { useAuth } from "../context/AuthContext";
import UploadImage from "./UploadImage";

const Checklist = () => {
  const Auth = useAuth();
  const user = Auth.user
  
  const currentUser = user.sub
  const prevUser = localStorage.getItem('lastModifiedUser')
  const correctUser = currentUser === prevUser;

  const today = new Date().toISOString().split('T')[0];
  const fetchedDate = localStorage.getItem('fetchedDate');
  const correctDate = today === fetchedDate;
  console.log(correctDate)

  

  const userSpecificSubmittedKey = `submitted_${currentUser}`;
  const userSpecificChecklistDataKey = `checklistData_${currentUser}`;
  console.log(user)
  console.log(user.data.sub)
  
  const [checklistState, setChecklistState] = useState(() => {
    const savedChecklist = localStorage.getItem('checklistState')
    return savedChecklist ? JSON.parse(savedChecklist) : {
    workoutOne: false,
    workoutTwo: false,
    drinkWater: false,
    noAlcohol: false,
    readTenPages: false,
    noCheatMeals: false,
    takePicture: false,
    }
  })
  const [submitted, setSubmitted] = useState(false)
  const [date, setDate] = useState('')
  const [checklistId, setChecklistId] = useState(null)
  

  //if not submitted for the day, fetch days list
  useEffect(() => {
    const isSubmitted = localStorage.getItem(userSpecificSubmittedKey) === 'true';
    const checklistData = localStorage.getItem(userSpecificChecklistDataKey);
    if ((!isSubmitted && checklistData) && correctUser && correctDate) {
      console.log('2')
      const storedChecklist = JSON.parse(checklistData)
      console.log('storedchecklist', storedChecklist)
      setDate(checklistData.date)
      setChecklistId(checklistData.id)
      setSubmitted(isSubmitted)
    } else if(!correctUser || !correctDate) {
      console.log('1')
      fetchDate()
      setSubmitted(false)
      setChecklistId(null)
      
    } 
  }, [user, currentUser]);

  const fetchDate = async () => {
    try {
      const response = await authApi.getCurrentChecklist(user)
      console.log('response', response)
      setChecklistId(response.data.id)
      console.log(checklistId)
      setDate(response.data.date)
      const today = new Date().toISOString().split('T')[0]; 
      localStorage.setItem('fetchedDate', today);
      localStorage.setItem('checklistData', JSON.stringify(response.data))
      localStorage.setItem('submitted', 'false')
    } catch (err) {
      console.error(err)
    }
  }

  const resetState = () => {
    setChecklistState({
      workoutOne: false,
      workoutTwo: false,
      drinkWater: false,
      noAlcohol: false,
      readTenPages: false,
      noCheatMeals: false,
      takePicture: false,
    });
    setDate('');
    setChecklistId(null);
  };

  const resetLocalStorage = () => {
    localStorage.removeItem(userSpecificChecklistDataKey);
    localStorage.setItem(userSpecificSubmittedKey, 'false');
    localStorage.removeItem('lastModifiedUser');
    localStorage.removeItem('numberCompleted');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.submitCurrentChecklist(user, checklistState, checklistId)
      console.log('checklist submission', response)
      setSubmitted(true)
      localStorage.setItem(userSpecificSubmittedKey, 'true')
      localStorage.setItem('userSubmitted', user.data.sub)
      resetState();
      resetLocalStorage();
    }
    catch (err) {
      console.error(err)
    }
  }
  //1. changes 2. who makes changes
    const handleChecklistChange = (e, key) => {
      const updatedState = {...checklistState, [key]: e.target.checked}
      setChecklistState(updatedState)
      countChecked(updatedState)
      localStorage.setItem(userSpecificChecklistDataKey, JSON.stringify(updatedState))
      localStorage.setItem('lastModifiedUser', currentUser)
    }

    //for local storage
    const countChecked = (updatedState) => {
      const numberComplete = Object.values(updatedState).filter(value => value).length;
      localStorage.setItem('numberCompleted', numberComplete)
    }
    console.log('data', date)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-600">
      {submitted ? <Gif /> : (
        <>
      <div className="grid grid-cols-2 items-center">
        <UploadImage checklistId={checklistId} user={user} />
        <p className="text-amber-300 text-3xl text center mt-8 font-bold">{date}</p>
      </div>
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