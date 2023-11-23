import {  useState } from 'react'
import { authApi } from '../api/authenticationService';
import { useAuth } from '../context/AuthContext';

const UpdateContact = () => {
  const { user } = useAuth();
  const userData = localStorage.getItem('currentUser');
  const userDataString = JSON.parse(userData)
  const userId = userDataString.id;
  const userEmail = userDataString.email;

  const [updatedEmail, setUpdatedEmail] = useState('');
  

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
        const contactInfo = {
          email: updatedEmail || userEmail
        }
        const response = await authApi.updateUserInfo(user, contactInfo, userId);
        console.log("User updated successfully", response)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='bg-slate-600 min-h-screen flex flex-col justify-center items-center'>
      <div className='w-4/5 bg-slate-800 rounded-lg p-6 shadow-lg'>
      <h1 className='text-2xl text-amber-300 font-semibold'>Update Contact Info</h1>
      <form onSubmit={updateProfile}>
        
        <div className='mb-4'>
          <label className='block text-slate-300 text-sm font-bold mb-2' htmlFor='updatedEmail'>
            Email
          </label>
          <input
          className='w-full px-3 py-2 text-gray-700 rounded-lg border focus:outline-none focus:border-slate-800'
          type='email'
          id="updatedEmail"
          value={updatedEmail}
          placeholder={userEmail}
          onChange={(e) => setUpdatedEmail(e.target.value)}
          />
        </div>
        <button
          className="w-full py-2 px-4 bg-emerald-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition duration-300"
          type="submit"
          >
            Submit
        </button>
      </form>
      </div>
    </div>
  )
}

export default UpdateContact