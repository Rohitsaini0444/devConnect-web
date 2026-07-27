import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useEffect } from "react";
import {BASE_URL} from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true });
      const userData = await response?.data?.user;
      dispatch(setUser(userData));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    <div className="pt-16">
      <NavBar />
      <main className="overflow-y-auto">
      <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Body;