import { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { setUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [about, setAbout] = useState(user?.about || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const [skills, setSkills] = useState(user?.skills || []);
    const [age, setAge] = useState(user?.age || '');
    const [gender, setGender] = useState(user?.gender || '');
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

    const handleUpdateProfile = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/profile/edit`, {
                firstName,
                lastName,
                about,
                photoURL,
                skills,
                age,
                gender
            }, { withCredentials: true });
            console.log('Profile updated successfully', res.data?.user);
            const updatedUser = res.data?.user || res.data;
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
            dispatch(setUser(updatedUser));

        } catch (err) {
            setError(err.response?.data?.message || 'Error updating profile');
        }
    };

    return (
        <>
            {showToast && (
                <div className="toast toast-top toast-center z-50">
                    <div className="alert alert-success ">
                        <span>Message sent successfully.</span>
                    </div>
                </div>
            )}
            <div className="hero bg-base-200 min-h-screen">

                <div className="hero-content flex-col lg:flex-row-reverse p-4">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Profile</h1>
                        <UserCard user={{ firstName, lastName, age, gender, photoURL, about, skills }} />
                    </div>

                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <fieldset className="fieldset">
                                <label className="label">First Name</label>
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input" placeholder="First Name" />
                                <label className="label">Last Name</label>
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input" placeholder="Last Name" />
                                <label className="label">Age</label>
                                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="input" placeholder="Age" />
                                <label className="label">Gender</label>
                                <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className="input" placeholder="Gender" />
                                 <label className="label">Photo URL</label>
                                <input type="text" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} className="input" placeholder="Photo URL" />
                                <label className="label">Skills (comma-separated)</label>
                                <input type="text" value={skills.join(', ')} onChange={(e) => setSkills(e.target.value.split(',').map((s) => s.trim()))} className="input" placeholder="Skills" />
                                <label className="label">About</label>
                                <textarea value={about} onChange={(e) => setAbout(e.target.value)} className="textarea" placeholder="About" />
                                {error && <p className="text-red-500">{error}</p>}
                                <button className="btn btn-primary mt-4" onClick={handleUpdateProfile}>
                                    Update Profile
                                </button>
                                {/* <div><a className="link link-hover">Forgot password?</a></div> */}
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfile