import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useState } from 'react';

const UserCard = ({ user }) => {
    const [toastMessage, setToastMessage] = useState(null);
    const sendConnectionRequest = async (userId, action) => {
        try {
            const response = await axios.post(`${BASE_URL}/request/send/${action}/${userId}`, {}, { withCredentials: true });
            console.log('Connection request sent successfully', response.data);
            if (response.data?.message) {
                setToastMessage(`${response.data.message} with status ${action}`);
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
                    <div className="alert alert-success ">
                        <span>{toastMessage}</span>
                    </div>
                </div>
            )}
            <div className="card bg-base-300 w-60 shadow-md text-left my-4">
                <figure>
                    <img className="w-60 h-60 object-cover"
                        src={user?.photoURL || "https://placeimg.com/400/225/arch"}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {user.firstName} {user.lastName}
                        {/* {<div className="badge badge-secondary">NEW</div>} */}
                    </h2>
                    <p>{user?.about}</p>
                   { user?.showButtons && (
                        <div className="card-actions justify-between">
                        <button className="btn btn-primary" onClick={() => sendConnectionRequest(user._id, "interested")}>
                            Interested
                        </button>
                        <button className="btn btn-secondary" onClick={() => sendConnectionRequest(user._id, "ignored")}>
                            Ignore
                        </button>
                    </div>)}
                </div>
            </div>
        </>
    )
}

export default UserCard