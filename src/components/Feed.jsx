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
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
        <p className="text-3xl font-bold">No users found in the feed.</p>
      </div>
    );
  }

  return (
    < >
      <h1 className="text-2xl text-center font-bold">Feed</h1>
      <div className="flex flex-col p-4 items-center">
        <UserCard user={{ ...feed[0], showButtons: true }} />
        {/* {feed.map((user) => (
            <UserCard key={user._id} user={user} />
          ))} */}
      </div>
    </>
  )
}

export default Feed