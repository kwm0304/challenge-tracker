import { Link } from "react-router-dom"
const Home = () => {
return (
  <div className="bg-gradient-to-b from-amber-300 via-amber-900 to-black">
  <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="font-display text-white text-6xl text-center mb-12">75 Day Challenge</h1>
  <div className="mt-12 text-2xl grid gap-y-8">
    <div className="">
    <button className="bg-green-600 w-48 py-3 rounded-xl text-white font-semibold">
      <Link to="/signup">Signup</Link>
    </button>
    </div>
    <div>
    <button className="bg-green-600 w-48 py-3 rounded-xl text-white font-semibold">
      <Link to="/login">Login</Link>
    </button>
    </div>
  </div>
  </div>
  </div>
)
}


export default Home