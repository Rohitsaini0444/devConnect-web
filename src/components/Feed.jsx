import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { setFeed } from "../utils/feedSlice";
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    try {
      if (feed && feed.length > 0) return; // If feed is already present, do not fetch again
      const response = await axios.get(`${BASE_URL}/user/feed`, { withCredentials: true });
      dispatch(setFeed(response.data?.data));
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (!feed || feed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-slate-900 via-purple-900/30 to-slate-900 px-4 pt-24">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto mb-6 text-purple-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-3xl font-bold text-purple-300 mb-3">No Users Available</p>
          <p className="text-slate-400 text-lg">Check back later for more developers to connect with!</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-purple-900/30 to-slate-900 py-8 px-4 pt-24">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Discover Developers</h1>
            <p className="text-slate-400 text-lg">Explore profiles and connect with like-minded developers</p>
          </div>

          {/* User Card */}
          <div className="flex flex-col items-center justify-center">
            <UserCard user={{ ...feed[0], showButtons: true }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Feed