# 🗳️ Poll App

A simple and interactive Polling Application built with **React.js**, **Node.js**, **Express.js**, and **MongoDB**.  
Users can create polls, vote on options, and view results in real-time.

## 🚀 Features
- ✅ Create new polls with multiple options  
- ✅ Vote on polls (one vote per user)  
- ✅ View results instantly  
- ✅ Responsive and user-friendly UI  
- ✅ Backend API with Express.js & MongoDB

  ## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS 
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **State Management:** React Hooks , Context API  
- **HTTP Requests:** Axios  

## 📂 Project Structure
polls/
│
├── backend/ # Backend (Node + Express)
│ ├── config/ # Database connection
│ │ └── db.js
│ ├── Controller/ # Controllers
│ │ └── pollsController.js
│ ├── models/ # Mongoose models
│ │ └── pollsModel.js
│ ├── routes/ # API routes
│ │ └── pollsRoute.js
│ ├── index.js # Backend entry point
│ ├── .env # Environment variables
│ └── package.json
│
├── frontend/ # Frontend (React)
│ ├── public/ # Static files
│ ├── src/
│ │ ├── assets/ # Images, logos etc.
│ │ ├── components/ # Reusable components
│ │ ├── context/ # React Context (state)
│ │ ├── pages/ # Pages (Home, Polls, etc.)
│ │ ├── App.jsx
│ │ ├── index.css
│ │ └── main.jsx
│ ├── package.json
│ └── index.html
├── README.md

## 👤 Author
- **Anjali Rathi**
