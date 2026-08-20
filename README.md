# DevConnect

DevConnect is a developer networking platform inspired by swipe-based community apps. It helps developers discover other developers, send connection requests, manage incoming requests, and build meaningful professional relationships.

This project is split into two parts:

- `devConnect` — backend API built with Node.js, Express, and MongoDB
- `devConnect-web` — frontend application built with React, Vite, Redux, and Tailwind CSS

## Features

- User sign up and login
- Secure authentication using JWT and cookies
- Profile viewing and editing
- Developer feed to discover other users
- Send, accept, reject, and review connection requests
- Connection management dashboard
- Responsive UI for browsing and networking

## Tech Stack

### Frontend
- React 19
- Vite
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS
- DaisyUI

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- cookie-parser for cookie management

## Project Structure

```bash
devConnect/
  src/
    app.js
    config/
    middlewares/
    models/
    routes/
    utils/

devConnect-web/
  src/
  public/
  index.html
  vite.config.js
```

## Prerequisites

Before running the app, make sure you have:

- Node.js 18 or newer
- npm
- MongoDB instance running locally or in the cloud

## Backend Setup

```bash
cd devConnect
npm install
```

Create a `.env` file in the backend root with the following values:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
PORT=3000
```

Run the backend:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

## Frontend Setup

```bash
cd devConnect-web
npm install
```

Start the frontend:

```bash
npm run dev
```

The app should open in the browser at:

```text
http://localhost:5173
```

## Production Build

For the frontend:

```bash
cd devConnect-web
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Main API Endpoints

### Auth
- `POST /auth/signup` — register a new user
- `POST /auth/login` — log in a user
- `POST /auth/logout` — log out the current user

### Profile
- `GET /profile/view` — fetch logged-in user profile
- `PATCH /profile/edit` — update profile details
- `PATCH /profile/password` — change password

### Requests
- `POST /request/send/:status/:userId` — send interested or ignored request
- `POST /request/review/:status/:requestId` — accept or reject request

### User
- `GET /user/user/requests/received` — view received requests
- `GET /user/user/connections` — view accepted connections
- `GET /user/feed` — browse suggested users

## Notes

- The backend uses cookies for JWT-based session management.
- The frontend expects the backend to run on `http://localhost:3000` by default.
- The app is designed for local development and can be extended for deployment with environment-specific config.

## License

This project is currently available for learning and development use.
