import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { setUser } from "../utils/userSlice";

const NavBar = () => {
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
            dispatch(setUser(null));
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    return (

        <div className="navbar fixed top-0 inset-x-0 z-50 flex position-shrink-0 bg-base-300 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">🧑‍💻DeveloperConnect</a>
            </div>
            {user &&
                <div className="flex gap-2">
                    <p className="text-lg font-semibold">{user?.firstName} {user?.lastName}</p>
                    <div className="dropdown dropdown-end mx-5">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Profile photo"
                                    src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                            </div>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><Link to="/connections">Connections</Link></li>
                            <li><Link to="/requests">Requests</Link></li>
                            <li><Link to="/login" onClick={handleLogout}>
                                Logout
                            </Link></li>
                        </ul>
                    </div>
                </div>}
        </div>
    )
}

export default NavBar