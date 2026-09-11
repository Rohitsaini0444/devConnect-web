import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removePost } from '../utils/feedSlice';

const UserCard = ({ user }) => {
    const [toastMessage, setToastMessage] = useState(null);
    const dispatch = useDispatch();
    const sendConnectionRequest = async (userId, action) => {
        try {
            const response = await axios.post(`${BASE_URL}/request/send/${action}/${userId}`, {}, { withCredentials: true });
            console.log('Connection request sent successfully', response.data);
            if (response.data?.message) {
                setToastMessage(`${response.data.message} with status ${action}`);
                dispatch(removePost(userId));
            } else {
                setToastMessage(`Request ${action}ed successfully`);
            }
            setTimeout(() => {
                setToastMessage(null);
            }, 3000);
        }
        catch (error) {
            console.error('Error sending connection request:', error);
            setToastMessage(`Failed to ${action} request`);
        }
    }

    return (
        <>
            {toastMessage && (
                <div className="toast toast-top toast-center z-50">
                    <div className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{toastMessage}</span>
                    </div>
                </div>
            )}
            <div className="card bg-slate-800 w-full max-w-sm shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 border-2 border-purple-600/40 hover:border-pink-600/60 rounded-xl overflow-hidden">
                <figure className="relative overflow-hidden bg-linear-to-br from-purple-900 via-slate-900 to-blue-900 h-64">
                    <img
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        src={user?.photoURL || "https://placeimg.com/400/400/arch"}
                        alt={`${user?.firstName} ${user?.lastName}`}
                    />
                    {user?.age && (
                        <div className="absolute top-3 right-3 badge badge-lg bg-linear-to-r from-purple-600 to-pink-600 border-0 text-white">{user.age}</div>
                    )}
                </figure>
                <div className="card-body p-6 bg-slate-800">
                    <h2 className="card-title text-2xl font-bold mb-2 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {user?.firstName} {user?.lastName}
                    </h2>
                    
                    {user?.gender && (
                        <p className="text-sm text-slate-300 mb-3 flex items-center gap-2">
                            <span className="badge badge-sm bg-blue-600/60 border-0 text-blue-100">{user.gender}</span>
                        </p>
                    )}

                    {user?.about && (
                        <p className="text-sm text-slate-300 mb-4 line-clamp-3">{user.about}</p>
                    )}

                    {user?.skills && user.skills.length > 0 && (
                        <div className="mb-4">
                            <p className="text-xs font-semibold text-purple-400 mb-2">Skills</p>
                            <div className="flex flex-wrap gap-2">
                                {user.skills.slice(0, 5).map((skill, idx) => (
                                    <span key={idx} className="badge badge-outline badge-sm bg-slate-700 border-purple-500 text-purple-300">
                                        {skill}
                                    </span>
                                ))}
                                {user.skills.length > 5 && (
                                    <span className="badge badge-outline badge-sm bg-slate-700 border-pink-500 text-pink-300">+{user.skills.length - 5}</span>
                                )}
                            </div>
                        </div>
                    )}

                    {user?.showButtons && (
                        <div className="card-actions justify-between pt-4 border-t border-slate-700 mt-4">
                            <button 
                                className="btn btn-sm btn-primary flex-1 bg-linear-to-r from-purple-600 to-pink-600 border-0 hover:from-purple-500 hover:to-pink-500 text-white"
                                onClick={() => sendConnectionRequest(user._id, "interested")}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                                Interested
                            </button>
                            <button 
                                className="btn btn-sm btn-outline flex-1 border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-blue-500"
                                onClick={() => sendConnectionRequest(user._id, "ignored")}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="12" cy="12" r="1"/><path d="M12 7v1m0 8v1M7 12h1m8 0h1"/>
                                </svg>
                                Ignore
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default UserCard