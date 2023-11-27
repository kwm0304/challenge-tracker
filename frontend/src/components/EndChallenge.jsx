import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, endUserChallenge } from '../api/authenticationService';
const EndChallenge = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(true);
  }

  const handleCancel = () => {
    setModalOpen(false);
    navigate('/profile');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.endChallenge(user, challengeId);
    }
    setModalOpen(false);
    navigate('/complete');
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-600">
      <div className="grid grid-rows-2 justify-center items-center bg-slate-800 gap-y-4 border-2 border-slate-400 rounded-xl p-4 w-5/6">
        <h1 className="text-amber-300 text-center font-bold text-2xl">End Challenge</h1>
        <button className="bg-red-500 font-semibold rounded-lg w-32 mx-auto h-12 text-white" onClick={toggleModal}>SUBMIT</button>
        {modalOpen && (
          <div className='fixed inset-0 z-50 overflow-y-auto bg-slate-600 bg-opacity-50 flex items-center justify-center text-center'>
            <div className="bg-slate-800 rounded-lg p-4 w-5/6 border-2 border-slate-400">
              <h1 className='text-amber-300 text-2xl font-bold mb-2'>Are you sure?</h1>
              <p className='text-amber-300 font-semibold'>Once submitted action cannot be undone</p>
              <div className='flex justify-center items-center mt-4 gap-8'>
                <button className='bg-slate-400 text-white p-2 rounded-xl font-semibold w-24'
                onClick={handleCancel}
                >CANCEL</button>
                <button className='bg-green-600 p-2 rounded-xl text-white font-semibold w-24'
                onClick={handleSubmit}
                >SUBMIT</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EndChallenge