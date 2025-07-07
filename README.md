
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


### My Design Decisions & Assumptions
- **Zod** for validation was chosen both on the frontend and backend to enforce consistent and type-safe schema validation, which aligns well with TypeScript and avoids runtime bugs.

- **React Hook Form** was used due to its lightweight nature and seamless integration with Zod and custom UI components like those from ShadCN.

- **Zustand** was selected for managing filter state as it is minimal, scalable, and doesn’t require boilerplate compared to other state libraries like Redux.

- **TanStack Query** was used to handle async data fetching and caching, providing automatic refetching and stale data management with minimal code.

- **ShadCN** components were used to maintain a consistent, accessible, and customizable UI based on Tailwind.

- File-based persistence using logs.json was implemented for simplicity, given this is a self-contained assignment without a database. This approach is sufficient for demo purposes, although a production system would typically use a database like PostgreSQL or MongoDB.

- Filters are applied instantly on change rather than needing a separate "Apply" button, for a faster and more reactive user experience. Zustand enables this real-time syncing easily.

---
