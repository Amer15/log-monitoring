
# Logs Dashboard

A full-stack project to **view logs**, **add logs**, and **filter logs** using various parameters.

---

## Backend Tech Stack

- Node.js with Express  
- TypeScript  
- Zod (for validation)  

---

## Frontend Tech Stack

- React  
- TypeScript  
- Tailwind CSS  
- ShadCN UI (for components)  
- Zustand (for filter state management)  
- TanStack Query (for data fetching and caching)  
- React Hook Form (for forms)  
- Zod (for form validation)

---

## Steps To Run Project Locally

1. Clone the repo using this link: `https://github.com/Amer15/log-monitoring.git`
2. Open the project in your code editor.
3. Open two terminals:
   - One inside the `frontend/` folder
   - One inside the `backend/` folder
4. Install dependencies in both terminals:
   ```bash
   npm install
   ```
5. Create a `.env` file inside the **backend** folder with the following content:
   ```env
   NODE_ENV=development
   PORT=5000
   ```
6. Create a `.env` file inside the **frontend** folder with the following content:
   ```env
   VITE_API_BASEURL=http://localhost:5000/api
   ```
7. Run both frontend and backend apps in their respective terminals:
   ```bash
   npm run dev
   ```
8. That’s it! Now open the frontend app in your browser to:
   - View logs  
   - Add new logs  
   - Apply filters (level, message, resourceId, and timestamp range)

---
