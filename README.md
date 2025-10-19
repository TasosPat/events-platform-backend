🌿 Community Events Platform (Backend)

The backend API for the Community Events Platform, providing endpoints for user authentication, event management, and attendance tracking.

🚀 Live API

🔗 Production URL:
https://events-platform-backend-ny5b.onrender.com/api/

🧠 Overview

This backend supports:

User Authentication via Firebase

Event Creation & Retrieval

Attendance Tracking

Role-based Access (users and staff)

Integration with a PostgreSQL database for persistence

🛠️ Tech Stack

Node.js + Express

TypeScript

PostgreSQL

Firebase Authentication

⚙️ Environment Variables

The project uses environment variables for sensitive information such as:

Database credentials

Firebase API keys

Admin secret key for protected routes

⚠️ These are not included in this repository for security reasons.
The application is already configured and deployed, so no additional setup is required for evaluation.

▶️ Running Locally (Optional)

If you wish to run this project locally, ensure you have:

Node.js (v18+)

PostgreSQL

A Firebase project (for authentication)

Then:

git clone https://github.com/TasosPat/events-platform-backend
cd events-platform-backend
npm install
npm run build
npm start


You will need your own .env file for local testing. These are private keys so the easiest way to evaluate my work is via the deployment links.
Example structure:

PORT=3000
DATABASE_URL=your_postgres_connection_url
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key
ADMIN_SECRET_KEY=your_custom_secret

✅ Status
The backend is fully deployed and functional, serving the live frontend at:
👉 https://events-platform-frontend.netlify.app/