# MERN Todo List Project

This is a full-stack todo list project built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The project includes user registration and login functionality for authentication and authorization. Users can perform CRUD (Create, Read, Update, Delete) operations on their own todos.

## Features

- **User Authentication:** Users can register and login to access their todo lists.
- **Todo Operations:** Users can create, read, update, and delete todos.
- **Real-time Updates:** Changes to todo lists are reflected in real-time.
- **Responsive Design:** The application is responsive and works well on different screen sizes.
- **Secure Authentication:** Passwords are securely hashed before being stored in the database.
- **Error Handling:** Comprehensive error handling for user feedback.

## Technologies Used

- **Frontend:**
  - React.js: A popular JavaScript library for building user interfaces.
  - React Query: A powerful data-fetching library for React applications.
  - React Hook Form: A library for managing form state in React.
  - Tailwind CSS: A utility-first CSS framework for styling the application.

- **Backend:**
  - Node.js: A JavaScript runtime for building server-side applications.
  - Express.js: A minimalist web framework for Node.js.
  - MongoDB: A NoSQL database for storing application data.

## How to Start

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
Install Dependencies:

bash
Copy code
cd frontend
npm install

cd ../backend
npm install
Start the Frontend and Backend Servers:

bash
Copy code
# Frontend
cd frontend
npm start

# Backend
cd ../backend
npm start
Access the Application:

Frontend: Open http://localhost:3000 in your browser.
Backend: The backend server runs on http://localhost:8080.

# Database Configuration
The MongoDB database for this project is hosted on MongoDB Atlas, a fully managed cloud database service. It is configured to allow any IP to access it.
