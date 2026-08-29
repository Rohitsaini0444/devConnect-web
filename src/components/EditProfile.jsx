import { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { setUser } from '../utils/userSlice';
import { validateEditProfileForm } from '../utils/validators';

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
    const [validationErrors, setValidationErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleBlur = (fieldName) => {
        setTouched({ ...touched, [fieldName]: true });
        validateField(fieldName);
    };

    const validateField = (fieldName) => {
        const profileData = {
            firstName,
            lastName,
            about,
            photoURL,
            skills,
            age,
            gender
        };

        const errors = validateEditProfileForm(profileData);
        let fieldError = errors[fieldName];

        if (fieldError) {
            setValidationErrors({ ...validationErrors, [fieldName]: fieldError });
        } else {
            const newErrors = { ...validationErrors };
            delete newErrors[fieldName];
            setValidationErrors(newErrors);
        }

        return fieldError;
    };

    const handleUpdateProfile = async () => {
        setError(null);

        const profileData = {
            firstName,
            lastName,
            about,
            photoURL,
            skills,
            age,
            gender
        };

        const errors = validateEditProfileForm(profileData);

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            setTouched({
                firstName: true,
                lastName: true,
                about: true,
                photoURL: true,
                skills: true,
                age: true,
                gender: true
            });
            setError('Please fix the errors below before updating');
            return;
        }

        setIsLoading(true);
        try {
            const res = await axios.post(`${BASE_URL}/profile/edit`, {
                firstName,
                lastName,
                about,
                photoURL,
                skills,
                age: age ? parseInt(age, 10) : undefined,
                gender
            }, { withCredentials: true });

            console.log('Profile updated successfully', res.data?.user);
            const updatedUser = res.data?.user || res.data;
            setShowToast(true);
            setValidationErrors({});
            setTouched({});
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
            dispatch(setUser(updatedUser));
        } catch (err) {
            setError(err.response?.data?.message || 'Error updating profile');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {showToast && (
                <div className="toast toast-top toast-center z-50">
                    <div className="alert bg-green-600 border-0 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Profile updated successfully!</span>
                    </div>
                </div>
            )}
            <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900/30 to-slate-900 text-white">
                {/* Page Header */}
                <div className="bg-slate-800 border-b border-slate-700 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 text-white">Edit Your Profile</h1>
                        <p className="text-center text-slate-300">Update your information and customize your profile</p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Profile Preview - Left Side */}
                        <div className="lg:col-span-2">
                            <div className="sticky top-8">
                                <div className="bg-slate-800 rounded-2xl p-6 shadow-lg border border-purple-600/40">
                                    <h2 className="text-xl font-bold mb-6 text-center text-white">Profile Preview</h2>
                                    <UserCard
                                        user={{
                                            firstName,
                                            lastName,
                                            age,
                                            gender,
                                            photoURL,
                                            about,
                                            skills,
                                            showButtons: false
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Edit Form - Right Side */}
                        <div className="lg:col-span-3">
                            <div className="card bg-slate-800 shadow-xl border border-purple-600/40">
                                <div className="card-body">

                            {error && (
                                <div className="alert bg-red-600/20 border border-red-600 text-red-300 mb-4 text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m2-2l2 2m-2-2l-2-2m2 2l2 2m2 2h.01M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            )}

                            <fieldset className="fieldset space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text text-purple-300 font-semibold">First Name *</span>
                                                {touched.firstName && validationErrors.firstName && (
                                                    <span className="label-text-alt text-red-400 text-xs">
                                                        {validationErrors.firstName}
                                                    </span>
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                onBlur={() => handleBlur('firstName')}
                                                placeholder="First Name"
                                                className={`input input-bordered w-full bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                                    touched.firstName && validationErrors.firstName
                                                        ? 'input-error'
                                                        : ''
                                                }`}
                                            />
                                        </label>
                                    </div>

                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text text-pink-300 font-semibold">Last Name *</span>
                                                {touched.lastName && validationErrors.lastName && (
                                                    <span className="label-text-alt text-red-400 text-xs">
                                                        {validationErrors.lastName}
                                                    </span>
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                onBlur={() => handleBlur('lastName')}
                                                placeholder="Last Name"
                                                className={`input input-bordered w-full bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                                                    touched.lastName && validationErrors.lastName
                                                        ? 'input-error'
                                                        : ''
                                                }`}
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text text-blue-300 font-semibold">Age</span>
                                                {touched.age && validationErrors.age && (
                                                    <span className="label-text-alt text-red-400 text-xs">
                                                        {validationErrors.age}
                                                    </span>
                                                )}
                                            </div>
                                            <input
                                                type="number"
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                                onBlur={() => handleBlur('age')}
                                                placeholder="Age"
                                                className={`input input-bordered w-full bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                    touched.age && validationErrors.age
                                                        ? 'input-error'
                                                        : ''
                                                }`}
                                            />
                                        </label>
                                    </div>

                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text text-cyan-300 font-semibold">Gender</span>
                                                {touched.gender && validationErrors.gender && (
                                                    <span className="label-text-alt text-red-400 text-xs">
                                                        {validationErrors.gender}
                                                    </span>
                                                )}
                                            </div>
                                            <select
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                                onBlur={() => handleBlur('gender')}
                                                className={`select select-bordered w-full bg-slate-700 border-slate-600 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                                                    touched.gender && validationErrors.gender
                                                        ? 'select-error'
                                                        : ''
                                                }`}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                                <option value="prefer not to say">Prefer Not to Say</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text text-yellow-300 font-semibold">Photo URL</span>
                                            {touched.photoURL && validationErrors.photoURL && (
                                                <span className="label-text-alt text-red-400 text-xs">
                                                    {validationErrors.photoURL}
                                                </span>
                                            )}
                                        </div>
                                        <input
                                            type="text"
                                            value={photoURL}
                                            onChange={(e) => setPhotoURL(e.target.value)}
                                            onBlur={() => handleBlur('photoURL')}
                                            placeholder="https://example.com/photo.jpg"
                                            className={`input input-bordered w-full bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                                                touched.photoURL && validationErrors.photoURL
                                                    ? 'input-error'
                                                    : ''
                                            }`}
                                        />
                                        <div className="label">
                                            <span className="label-text-alt text-slate-400 text-xs">
                                                Must be a valid image URL (jpg, png, gif, webp)
                                            </span>
                                        </div>
                                    </label>
                                </div>

                                <div>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text text-green-300 font-semibold">Skills (comma-separated)</span>
                                            {touched.skills && validationErrors.skills && (
                                                <span className="label-text-alt text-red-400 text-xs">
                                                    {validationErrors.skills}
                                                </span>
                                            )}
                                        </div>
                                        <input
                                            type="text"
                                            value={skills.join(', ')}
                                            onChange={(e) =>
                                                setSkills(
                                                    e.target.value
                                                        .split(',')
                                                        .map((s) => s.trim())
                                                        .filter((s) => s)
                                                )
                                            }
                                            onBlur={() => handleBlur('skills')}
                                            placeholder="JavaScript, React, Node.js"
                                            className={`input input-bordered w-full bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                                touched.skills && validationErrors.skills
                                                    ? 'input-error'
                                                    : ''
                                            }`}
                                        />
                                        <div className="label">
                                            <span className="label-text-alt text-slate-400 text-xs">
                                                Maximum 50 skills, max 50 characters each
                                            </span>
                                        </div>
                                    </label>
                                </div>

                                <div>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text text-red-300 font-semibold">About</span>
                                            {touched.about && validationErrors.about && (
                                                <span className="label-text-alt text-red-400 text-xs">
                                                    {validationErrors.about}
                                                </span>
                                            )}
                                        </div>
                                        <textarea
                                            value={about}
                                            onChange={(e) => setAbout(e.target.value)}
                                            onBlur={() => handleBlur('about')}
                                            placeholder="Tell us about yourself..."
                                            rows="4"
                                            className={`textarea textarea-bordered w-full resize-none bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                                                touched.about && validationErrors.about
                                                    ? 'textarea-error'
                                                    : ''
                                            }`}
                                        />
                                        <div className="label">
                                            <span className="label-text-alt text-slate-400 text-xs">
                                                {about.length}/500 characters
                                            </span>
                                        </div>
                                    </label>
                                </div>

                                <button
                                    className="btn bg-linear-to-r from-purple-600 to-pink-600 border-0 text-white w-full mt-8 text-lg"
                                    onClick={handleUpdateProfile}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm"></span>
                                            Updating...
                                        </>
                                    ) : (
                                        'Update Profile'
                                    )}
                                </button>
                            </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfile;