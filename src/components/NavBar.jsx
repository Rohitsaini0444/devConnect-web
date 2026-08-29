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
        <div className="navbar fixed top-0 inset-x-0 z-50 bg-linear-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl border-b-2 border-purple-600">
            <div className="flex-1">
                <Link to="/feed" className="btn btn-ghost text-2xl font-bold gap-2 hover:bg-purple-900/50 transition-all bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    <div className="text-3xl">🧑‍💻</div>
                    <span className="hidden sm:inline">DevConnect</span>
                </Link>
            </div>

            {user ? (
                <div className="flex gap-4 items-center">
                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-2">
                        <Link to="/feed" className="btn btn-sm btn-ghost hover:bg-purple-700/50 hover:text-purple-300 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 13h2v8H3zm4-8h2v16H7zm4-2h2v18h-2zm4 4h2v14h-2zm4-2h2v16h-2z" />
                            </svg>
                            Feed
                        </Link>
                        <Link to="/connections" className="btn btn-sm btn-ghost hover:bg-pink-700/50 hover:text-pink-300 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                            </svg>
                            Connections
                        </Link>
                        <Link to="/requests" className="btn btn-sm btn-ghost hover:bg-blue-700/50 hover:text-blue-300 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15 14c2.67 0 8 1.34 8 4v2H7v-2c0-2.66 5.33-4 8-4zm0-2c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zM6 12c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 7.75c-1.38 0-3.47.26-4.99.7.519 1.71 2.47 2.55 4.99 2.55s4.48-.84 5-2.55c-1.52-.44-3.61-.7-5--.7z" />
                            </svg>
                            Requests
                        </Link>
                    </div>

                    {/* User Info and Dropdown */}
                    <div className="flex-col items-end hidden sm:flex">
                        <p className="text-sm font-semibold text-purple-300">{user?.firstName}</p>
                        <p className="text-xs text-purple-400/60">Profile</p>
                    </div>

                    <div className="dropdown dropdown-end">
                        <button className="btn btn-ghost btn-circle avatar ring-2 ring-purple-600 ring-offset-slate-900 ring-offset-2 hover:ring-offset-4 transition-all">
                            <div className="w-10 rounded-full overflow-hidden bg-linear-to-br from-purple-600 to-pink-600">
                                <img
                                    alt="Profile"
                                    src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </button>

                        <ul className="dropdown-content menu bg-slate-800 rounded-lg z-1 w-52 p-2 shadow-2xl border border-purple-600">
                            <li className="menu-title text-purple-400">
                                <span>{user?.firstName} {user?.lastName}</span>
                            </li>
                            <li>
                                <Link to="/profile" className="flex justify-between hover:bg-purple-700/50">
                                    Edit Profile
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </Link>
                            </li>
                            <li>
                                <Link to="/feed" className="flex justify-between hover:bg-purple-700/50">
                                    Feed
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3 13h2v8H3zm4-8h2v16H7zm4-2h2v18h-2zm4 4h2v14h-2zm4-2h2v16h-2z" />
                                    </svg>
                                </Link>
                            </li>
                            <li>
                                <Link to="/connections" className="flex justify-between hover:bg-pink-700/50">
                                    Connections
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                                    </svg>
                                </Link>
                            </li>
                            <li>
                                <Link to="/requests" className="flex justify-between hover:bg-blue-700/50">
                                    Requests
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M15 14c2.67 0 8 1.34 8 4v2H7v-2c0-2.66 5.33-4 8-4zm0-2c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zM6 12c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 7.75c-1.38 0-3.47.26-4.99.7.519 1.71 2.47 2.55 4.99 2.55s4.48-.84 5-2.55c-1.52-.44-3.61-.7-5--.7z" />
                                    </svg>
                                </Link>
                            </li>
                            <li>
                                <Link to="/premium" className="flex justify-between hover:bg-yellow-700/50">
                                    Premium
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                </Link>
                            </li>
                            <li>
                                <hr className="my-2 border-purple-600" />
                            </li>
                            <li>
                                <a onClick={handleLogout} className="text-red-500 flex justify-between hover:bg-red-700/30">
                                    Logout
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <Link to="/login" className="btn btn-primary bg-linear-to-r from-purple-600 to-pink-600 border-0">
                    Login
                </Link>
            )}
        </div>
    )
}

export default NavBar