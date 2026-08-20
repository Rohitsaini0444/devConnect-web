import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { setConnections } from '../utils/connectionsSlice';

const Connections = () => {
    const connections = useSelector((state) => state.connections);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true });
            const connectionsData = await response?.data?.data;
            console.log('Fetched connections data:', connectionsData);
            dispatch(setConnections(connectionsData));
        }
        catch (error) {
            console.error('Error fetching connections data:', error);
        }
    };
    useEffect(() => {
        if (!connections || connections.length === 0) {
            fetchConnections();
        }
    }, []);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
            <p className="text-3xl font-bold">Connections</p>
            {connections && connections.length > 0 ?
                connections.map((connection) => (
                    // <UserCard key={connection._id} user={connection?.fromUserId} />
                    <div key={connection._id} className="flex w-96 bg-base-100 shadow-xl m-4">
                        <div>
                            <img
                                className="w-24 h-24 rounded-full mx-auto mt-4"
                                alt="Profile photo"
                                src={connection?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                            />
                        </div>
                        <div className="card-body">
                            <h2 className="card-title">
                                {connection?.firstName} {connection?.lastName}
                            </h2>
                            <p>Age: {connection?.age || "N/A"}</p>
                            <p>Gender: {connection?.gender || "N/A"}</p>
                            <p>Skills: {connection?.skills?.join(', ') || "N/A"}</p>
                            <p>Bio: {connection?.about || ""}</p>
                        </div>
                    </div>
                )) : (
                    <p>No connections found.</p>
                )}
        </div>
    )
}

export default Connections