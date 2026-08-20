import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { setRequests, removeRequest } from '../utils/requestsSlice';

const Requests = () => {
    const requests = useSelector((state) => state.requests);
    const dispatch = useDispatch();

    const reviewRequest = async (requestId, action) => {
        try {
            const response = await axios.post(`${BASE_URL}/request/review/${action}/${requestId}`, {}, { withCredentials: true });
            console.log(`Request ${action}ed successfully`, response.data);
            // Remove the request from the state after accepting or declining
            dispatch(removeRequest(requestId));
        } catch (error) {
            console.error(`Error ${action}ing request:`, error);
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
    return (
        <>
            <p className="text-3xl font-bold text-center my-4">Connection Requests</p>
            <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
                {requests && requests.length > 0 ?
                    requests.map((request) => (
                        <div key={request._id} className="flex  bg-base-100 shadow-xl">
                            <div>
                                <img
                                    className="w-24 h-24 rounded-full mx-auto mt-4"
                                    alt="Profile photo"
                                    src={request?.fromUserId?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                />
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">
                                    {request?.fromUserId?.firstName} {request?.fromUserId?.lastName}
                                </h4>
                                <p>{request?.fromUserId?.age || "N/A"} {request?.fromUserId?.gender || "N/A"}</p>
                                {/* <p>Skills: {request?.fromUserId?.skills?.join(', ') || "N/A"}</p>
                            <p>Bio: {request?.fromUserId?.about || ""}</p> */}

                            </div>
                            <div className="flex card-actions m-4">
                                <button className="btn btn-primary self-center" onClick={() => reviewRequest(request._id, 'accepted')}>Accept</button>
                                <button className="btn btn-secondary self-center ml-2" onClick={() => reviewRequest(request._id, 'rejected')}>Decline</button>
                            </div>
                        </div>
                    )) : (
                        <h3 className="text-xl font-bold">No requests found!!!!!!!!!!!!</h3>
                    )}
            </div>
        </>
    )
}

export default Requests