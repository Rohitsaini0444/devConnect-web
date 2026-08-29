import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { setRequests, removeRequest } from '../utils/requestsSlice';

const Requests = () => {
    const requests = useSelector((state) => state.requests);
    const dispatch = useDispatch();
    const [toastMessage, setToastMessage] = useState(null);

    const reviewRequest = async (requestId, action) => {
        try {
            const response = await axios.post(`${BASE_URL}/request/review/${action}/${requestId}`, {}, { withCredentials: true });
            console.log(`Request ${action}ed successfully`, response.data);
            
            // Show toast message
            setToastMessage(`Request ${action}ed successfully`);
            setTimeout(() => setToastMessage(null), 3000);
            
            // Remove the request from the state after accepting or declining
            dispatch(removeRequest(requestId));
        } catch (error) {
            console.error(`Error ${action}ing request:`, error);
            setToastMessage(`Error ${action}ing request`);
            setTimeout(() => setToastMessage(null), 3000);
        }
    };

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/requests/received`, { withCredentials: true });
            const requestsData = await response?.data?.data;
            console.log('Fetched requests data:', requestsData);
            dispatch(setRequests(requestsData));
        }
        catch (error) {
            console.error('Error fetching requests data:', error);
        }
    };
    
    useEffect(() => {
        if (!requests || requests.length === 0) {
            fetchRequests();
        }
    }, []);

    if (!requests || requests.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-slate-900 via-purple-900/30 to-slate-900 px-4 pt-24">
                <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto mb-6 text-blue-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8a6 6 0 0110.546-1M14.519 4.372a6 6 0 015.946 7.201M3 16a6 6 0 009.165-5.168m0 0a3 3 0 015.396 2.504A3.5 3.5 0 1113.5 16" />
                    </svg>
                    <p className="text-3xl font-bold text-blue-300 mb-3">No Pending Requests</p>
                    <p className="text-slate-400 text-lg">You'll see connection requests here</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {toastMessage && (
                <div className="toast toast-top toast-center z-50">
                    <div className="alert alert-success bg-green-600 border-0 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{toastMessage}</span>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-linear-to-b from-slate-900 via-purple-900/30 to-slate-900 py-8 px-4 pt-24">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Connection Requests</h1>
                        <p className="text-slate-400 text-lg">You have {requests.length} pending request{requests.length !== 1 ? 's' : ''}</p>
                    </div>

                    {/* Requests List */}
                    <div className="space-y-4">
                        {requests.map((request) => (
                            <div key={request._id} className="card bg-slate-800 shadow-lg border border-purple-600/40 hover:shadow-xl hover:shadow-purple-500/30 transition-all">
                                <div className="card-body">
                                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                                        {/* Profile Image */}
                                        <div className="shrink-0">
                                            <div className="avatar">
                                                <div className="w-20 rounded-full border-2 border-purple-600 overflow-hidden">
                                                    <img
                                                        alt={`${request?.fromUserId?.firstName} ${request?.fromUserId?.lastName}`}
                                                        src={request?.fromUserId?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* User Info */}
                                        <div className="grow text-center md:text-left">
                                            <h3 className="text-2xl font-bold mb-2 text-white">
                                                {request?.fromUserId?.firstName} {request?.fromUserId?.lastName}
                                            </h3>
                                            <div className="flex flex-col md:flex-row gap-4 text-sm text-slate-400">
                                                {request?.fromUserId?.age && (
                                                    <span className="badge badge-outline badge-sm bg-slate-700 border-slate-600 text-slate-300">{request.fromUserId.age} years old</span>
                                                )}
                                                {request?.fromUserId?.gender && (
                                                    <span className="badge badge-outline badge-sm bg-slate-700 border-slate-600 text-slate-300">{request.fromUserId.gender}</span>
                                                )}
                                            </div>
                                            {request?.fromUserId?.about && (
                                                <p className="mt-4 text-slate-300 line-clamp-2">{request.fromUserId.about}</p>
                                            )}
                                            {request?.fromUserId?.skills && request.fromUserId.skills.length > 0 && (
                                                <div className="mt-3">
                                                    <p className="text-xs font-semibold text-slate-400 mb-2">Skills</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {request.fromUserId.skills.slice(0, 4).map((skill, idx) => (
                                                            <span key={idx} className="badge badge-sm bg-linear-to-r from-purple-600 to-pink-600 border-0 text-white">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                        {request.fromUserId.skills.length > 4 && (
                                                            <span className="badge badge-outline badge-sm bg-slate-700 border-slate-600 text-slate-300">
                                                                +{request.fromUserId.skills.length - 4}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col gap-2 md:flex-row w-full md:w-auto">
                                            <button
                                                className="btn btn-sm md:btn-md flex-1 md:flex-none bg-linear-to-r from-green-600 to-teal-600 border-0 hover:from-green-500 hover:to-teal-500 text-white"
                                                onClick={() => reviewRequest(request._id, 'accepted')}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                </svg>
                                                Accept
                                            </button>
                                            <button
                                                className="btn btn-outline btn-sm md:btn-md flex-1 md:flex-none border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-red-600"
                                                onClick={() => reviewRequest(request._id, 'rejected')}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                                </svg>
                                                Decline
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Requests