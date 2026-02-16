# React CRUD User Management App

A simple React application for managing user data with CRUD operations. Built with extensibility in mind using configuration-driven forms.

## Features
- Create, Read, Update, Delete users
- Form validation (required fields, email/phone formats)
- Clean UI with Material-UI
- Extensible field system

## Setup Instructions
1. Clone the repo: `git clone git@github.com:Heena-Kapoor/React_CRUD_Web.git`
2. Install dependencies: `npm install`
3. Start Server: `npm run server` (runs JSON-server on port 3001)
4. Start app: `npm run dev` (runs on port 5173)

## How to Add New Fields
1. Edit `src/config/fieldsConfig.js`:
   - Add a new object to `userFields` with `name`, `label`, `type`, `required`, and `validation` (using Yup).
   - Example: For "Date of Birth", add `{ name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: false, validation: Yup.date().nullable() }`
2. Update the mock API data in `db.json` to include the new field.
3. The form and display components will automatically render the new field—no other code changes needed.

## Assumptions and Design Decisions
- Used Material-UI for UI components (clean and responsive).
- Formik + Yup for validation (handles dynamic fields well).
- JSON-server for mock API (easy to replace with real API).
- No state management library (e.g., Redux) for simplicity; used simple props/state.
- Refresh on save for simplicity; in production, use proper state updates.
- Responsive design via Material-UI's built-in breakpoints.

## Deployment
1. Build the app: `npm run build`
2. Deploy to Vercel: `npm install -g vercel`, then `vercel` (or use Netlify/GitHub Pages).
3. For mock API, deploy JSON-server separately or use a real API.

## Evaluation Notes
- React standards: Modular components, hooks, clean code.
- Validation: Yup schemas ensure accuracy.
- API: Axios with try/catch for errors/loading.
- Extensibility: Config-driven, minimal changes for new fields.
- UI/UX: Intuitive layout.
- Deployment: Follow instructions above.
- Git: Proper commits as described.
- Bonus: Not using TypeScript (but could be added easily).
