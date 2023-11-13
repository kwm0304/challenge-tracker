import { useNavigate } from "react-router-dom";
import axios from 'axios'
const StartChallenge = () => {
const navigate = useNavigate();
const userId = JSON.parse(localStorage.getItem("currentUser")).id;
  const handleStartChallenge = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/api/challenge/${userId}`);
      if (response.status === 200) {
        console.log("challenge started")
        navigate("/checklist")
      }
      
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div className="bg-slate-600 min-h-screen pt-12 px-4 grid items-center">
      <div className="grid grid-rows-2 justify-center items-center bg-slate-800 gap-y-4 border-2 border-slate-400 rounded-xl p-4">
        <h1 className="text-amber-300 text-center font-bold text-2xl">Start New Challenge?</h1>
        <button className="bg-green-600 font-semibold rounded-lg w-32 mx-auto h-12 text-white" onClick={handleStartChallenge}>START</button>
      </div>
    </div>
  )
}

export default StartChallenge