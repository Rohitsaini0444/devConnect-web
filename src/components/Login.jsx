import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState(null)
  const [isLoginForm, setIsLoginForm] = useState(true)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, { email, password }, { withCredentials: true })
      console.log('Login successful:', response.data);
      const user = response?.data?.user;
      dispatch(setUser(user));
      navigate('/feed');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
      if (error.response && error.response.status === 401) {
        console.error('Login failed:', error)
      }
    }

  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, { firstName, lastName, email, password }, { withCredentials: true })
      console.log('Registration successful:', response.data);
      const user = response?.data?.user;
      dispatch(setUser(user));
      navigate('/profile');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
      if (error.response && error.response.status === 400) {
        console.error('Registration failed:', error)
      }
    }
  }

  return (
    <div className="flex justify-center ">
      <div className="card card-border bg-base-100 w-96">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{isLoginForm ? 'Login' : 'Sign Up'}</h2>
           {error && <p className="text-red-500">{error}</p>}
          <div className="card-actions justify-center">
            {!isLoginForm && (<>
              <label className="input validator">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor">
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                  </g>
                </svg>
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="input validator">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor">
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                  </g>
                </svg>
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </>)}
            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                placeholder="mail@site.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <p className="validator-hint hidden">Enter valid email address</p>
            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                  ></path>
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
              </svg>
              <input
                type="password"
                required
                placeholder="Password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
            </p>
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleRegister}>
             {isLoginForm ? 'Login' : 'Sign Up'}
            </button>
            <button className="btn btn-link" onClick={() => setIsLoginForm(!isLoginForm)}>
              {isLoginForm ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login