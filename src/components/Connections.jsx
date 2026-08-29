import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { setConnections } from '../utils/connectionsSlice';
import UserCard from './UserCard';

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

    if (!connections || connections.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-slate-900 via-purple-900/30 to-slate-900 px-4 pt-24">
                <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto mb-6 text-pink-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 5a2 2 0 11-4 0 2 2 0 014 0zM5 20a6 6 0 0110-11.995" />
                    </svg>
                    <p className="text-3xl font-bold text-pink-300 mb-3">No Connections Yet</p>
                    <p className="text-slate-400 text-lg">Start connecting with developers to build your network!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-900 via-purple-900/30 to-slate-900 py-8 px-4 pt-24">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">Your Connections</h1>
                    <p className="text-slate-400 text-lg">You have {connections.length} connection{connections.length !== 1 ? 's' : ''}</p>
                </div>

                {/* Connections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {connections.map((connection) => (
                        <div key={connection._id} className="flex justify-center">
                            <UserCard user={{ ...connection, showButtons: false }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Connections