# React CRUD User Management App

A full-stack React application for managing users with CRUD (Create, Read, Update, Delete) operations.  
The project uses a configuration-driven form system and a separate Express backend API.

---

## Setup Instructions

### 1. Clone the Repository

git clone git@github.com:Heena-Kapoor/React_CRUD_Web.git  
cd react-crud

---

### 2. Run Frontend (React + Vite)

npm install  
npm run dev  

Frontend runs on:  
http://localhost:5173

---

### 3. Run Backend (Express API)

cd backend  
npm install  
npm start  

Backend runs on:  
http://localhost:10000/users

---

### 4. Environment Variable (Production)

For deployment (e.g., Netlify), set:

VITE_API_URL=https://your-render-backend-url/users

Then redeploy the frontend.

---

## How to Add New Fields to the Form

1. Open `src/config/fieldsConfig.js`
2. Add a new object inside the `userFields` array with:
   - `name`
   - `label`
   - `type`
   - `required`
   - `validation` (Yup schema)

Example:

{
  name: 'dateOfBirth',
  label: 'Date of Birth',
  type: 'date',
  required: false,
  validation: Yup.date().nullable()
}

No other changes are required —  
The form and display components render fields dynamically based on configuration.

---

## Assumptions and Design Decisions

- Frontend and backend are separated for scalability.
- Express is used instead of JSON-server for production readiness.
- Formik + Yup manage validation effectively.
- Config-driven field structure allows easy extensibility.
- No global state management library used (kept simple intentionally).
- Backend currently uses in-memory storage (data resets on restart).
- Environment variables are used for API configuration in production.

---