# Note-Taking App

A simple and efficient note-taking app that allows users to create, edit, delete, and view their notes. This app features user authentication, secure storage of notes, and a sleek, responsive UI built with React, TypeScript, Tailwind CSS, and ShadCN UI.

## Features

- **User Authentication**: Sign up, log in, and log out functionality.
- **CRUD Operations for Notes**: Create, read, update, and delete notes.
- **Note Encryption**: Securely store note content using encryption.
- **Responsive Design**: Built for mobile-first, ensuring a smooth experience across devices.
- **State Management**: Uses Redux for managing authentication state and notes.
- **Frontend**: Built with React, TypeScript, Tailwind CSS, and ShadCN UI for a modern, clean UI.
- **Backend**: Node.js and MongoDB for user and note management.
- **Deployment**: Frontend on Vercel, Backend on Heroku.

## Tech Stack

- **Frontend**: 
  - React
  - TypeScript
  - Tailwind CSS
  - ShadCN UI
  - Redux for state management
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (for storing users and notes)
  - JWT for user authentication
  - `crypto-js` for note encryption
- **Deployment**:
  - Frontend: Vercel
  - Backend: Heroku

## Getting Started

### Prerequisites

Before getting started, ensure you have the following installed:

- Node.js (v16 or higher)
- npm (v7 or higher) or yarn
- Git

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/note-taking-app.git
   ```

2. Navigate to the frontend directory:
   ```bash
   cd note-taking-app/frontend
   ```

3. Set up the environment variables for the frontend:
   - Create a `.env` file in the `frontend` directory.
   - Add the following to the `.env` file:
     ```
     VITE_API_BASE_URL=http://localhost:3000
     ```

4. Install the dependencies:
   ```bash
   npm install
   ```

5. Start the frontend development server:
   ```bash
   npm run dev
   ```

The frontend should now be running on [http://localhost:5173](http://localhost:5173).

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd note-taking-app/backend
   ```

2. Set up the environment variables for the backend:
   - Create a `.env` file in the `backend` directory.
   - Add the following to the `.env` file:
     ```
     MONGO_URI=mongodb://localhost:27017/notedDB
     PORT=3000
     JWT_SECRET=test
     NOTE_SECRET_KEY=test
     FRONTEND_URL=http://localhost:5173
     ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the backend server:
   ```bash
   npm run server
   ```

The backend should now be running on [http://localhost:3000](http://localhost:3000).

### Deployment

- **Frontend**: You can deploy the frontend on Vercel by following the deployment steps mentioned [here](https://vercel.com/docs/platform/deployments).
- **Backend**: Deploy the backend on Heroku by following the deployment steps mentioned [here](https://devcenter.heroku.com/articles/git).

### Connecting Frontend and Backend

Ensure that the frontend makes requests to the live backend API URL after deployment. Update the API endpoints in the frontend to match the Heroku backend URL.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


