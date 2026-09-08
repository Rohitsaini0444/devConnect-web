import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { validateLoginForm, validateSignupForm } from '../utils/validators';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState(null)
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [validationErrors, setValidationErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [touched, setTouched] = useState({})
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBlur = (fieldName) => {
    setTouched({ ...touched, [fieldName]: true });
    validateField(fieldName);
  };

  const validateField = (fieldName) => {
    let fieldError = null;
    let errors = { ...validationErrors };

    if (isLoginForm) {
      const loginErrors = validateLoginForm(email, password);
      if (fieldName === 'email') fieldError = loginErrors.email;
      else if (fieldName === 'password') fieldError = loginErrors.password;

      if (fieldError) {
        errors[fieldName] = fieldError;
      } else {
        delete errors[fieldName];
      }
    } else {
      const signupErrors = validateSignupForm(firstName, lastName, email, password);
      if (fieldName === 'firstName') fieldError = signupErrors.firstName;
      else if (fieldName === 'lastName') fieldError = signupErrors.lastName;
      else if (fieldName === 'email') fieldError = signupErrors.email;
      else if (fieldName === 'password') fieldError = signupErrors.password;

      if (fieldError) {
        errors[fieldName] = fieldError;
      } else {
        delete errors[fieldName];
      }
    }

    setValidationErrors(errors);
    return fieldError;
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null);

    const errors = validateLoginForm(email, password);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setTouched({ email: true, password: true });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, { email, password }, { withCredentials: true })
      console.log('Login successful:', response.data);
      const user = response?.data?.user;
      dispatch(setUser(user));
      navigate('/feed');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      if (err.response && err.response.status === 401) {
        console.error('Login failed:', err)
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError(null);

    const errors = validateSignupForm(firstName, lastName, email, password);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setTouched({ firstName: true, lastName: true, email: true, password: true });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, { firstName, lastName, email, password }, { withCredentials: true })
      console.log('Registration successful:', response.data);
      const user = response?.data?.user;
      dispatch(setUser(user));
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      if (err.response && err.response.status === 400) {
        console.error('Registration failed:', err)
      }
    } finally {
      setIsLoading(false);
    }
  }

  const inputClass = (fieldName, focusRing) => `input input-bordered w-full bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-2 ${focusRing} focus:border-transparent ${
    touched[fieldName] && validationErrors[fieldName] ? 'ring-2 ring-red-500 border-red-500' : ''
  }`;

  return (
    <div className="flex items-center justify-center min-h-screen py-4 bg-linear-to-br from-slate-900 via-purple-900/30 to-slate-900">
      <div className="card card-bordered bg-slate-800 w-full max-w-md shadow-2xl border-purple-600/40">
        <div className="card-body">
          <h2 className="card-title text-center text-2xl mb-6 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {isLoginForm ? 'Welcome Back' : 'Create Account'}
          </h2>

          {error && (
            <div className="alert mb-4 text-sm bg-red-600/20 border border-red-600 text-red-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m2-2l2 2m-2-2l-2-2m2 2l2 2m2 2h.01M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={isLoginForm ? handleLogin : handleRegister} className="space-y-4">
            {!isLoginForm && (
              <>
                <div>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-purple-300">First Name</span>
                      {touched.firstName && validationErrors.firstName && <span className="label-text-alt text-red-400 text-xs">{validationErrors.firstName}</span>}
                    </div>
                    <input type="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} onBlur={() => handleBlur('firstName')} className={inputClass('firstName', 'focus:ring-purple-600')} />
                  </label>
                </div>

                <div>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-pink-300">Last Name</span>
                      {touched.lastName && validationErrors.lastName && <span className="label-text-alt text-red-400 text-xs">{validationErrors.lastName}</span>}
                    </div>
                    <input type="text" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} onBlur={() => handleBlur('lastName')} className={inputClass('lastName', 'focus:ring-pink-600')} />
                  </label>
                </div>
              </>
            )}

            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-blue-300">Email</span>
                  {touched.email && validationErrors.email && <span className="label-text-alt text-red-400 text-xs">{validationErrors.email}</span>}
                </div>
                <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => handleBlur('email')} className={inputClass('email', 'focus:ring-blue-600')} />
              </label>
            </div>

            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-cyan-300">Password</span>
                  {touched.password && validationErrors.password && <span className="label-text-alt text-red-400 text-xs">{validationErrors.password}</span>}
                </div>
                <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={() => handleBlur('password')} className={inputClass('password', 'focus:ring-cyan-600')} />
              </label>
              <div className="label">
                <span className="label-text-alt text-xs text-slate-400 mt-1">Must be 8+ characters with uppercase, lowercase, and numbers</span>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="btn w-full mt-6 bg-linear-to-r from-purple-600 to-pink-600 border-0 hover:from-purple-500 hover:to-pink-500 text-white disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? <><span className="loading loading-spinner loading-sm"></span>Loading...</> : isLoginForm ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <div className="divider divider-slate-700 my-4 text-slate-400">OR</div>

          <button type="button" onClick={() => {
            setIsLoginForm(!isLoginForm);
            setValidationErrors({});
            setTouched({});
            setError(null);
          }} className="btn btn-outline w-full border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-purple-500 hover:text-purple-300">
            {isLoginForm ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login