# NoteNest
This is a repository which showcases a project built on full stack technologies such as express.js, node.js and simple frontend for developing a notes app

The NoteNest is a full-stack web application designed to allow users to securely create, manage, and delete personal notes. It features user authentication with login and registration functionality, ensuring that only authorized users can access their notes. The app is built using Node.js, Express, MongoDB, and a frontend with HTML/CSS/JavaScript. This project was created to demonstrate how to build a secure, user-friendly, and visually appealing web application using modern web development technologies.

Features:
User Authentication:

   Secure login and registration system using hashed passwords.

   Session management with cookies.

Note Management:

 Add, view, and delete notes.

 Notes are stored securely in a MongoDB database.

Frontend Design:

  Clean and professional UI with responsive design.

  Backgrounds and graphics sourced from free stock image platforms like Pixabay and Pexels.

Backend API:

 RESTful API for managing user authentication and notes.

 Built with Node.js and Express.js.

Database:

 MongoDB for storing user credentials and notes data.

Technologies Used
 Frontend: HTML5, CSS3, JavaScript

 Backend: Node.js, Express.js

 Database: MongoDB

 Authentication: bcrypt for password hashing, cookies for session management

 Hosting/Version Control: GitHub

How to Run the Project
1. Clone the repository:

   bash
   git clone https://github.com/your-username/notenest.git
   cd notenest
2. Install dependencies:

   bash
   npm install
3. Start the MongoDB server locally or connect to MongoDB Atlas.

4. Configure environment variables:

5. Create a .env file in the root directory.

6. Add the following variables:

    text
    MONGO_URI=<your-mongodb-uri>
    SECRET_KEY=<your-secret-key>
7. Start the server:

   bash
   node server.js
8. Open your browser and navigate to http://localhost:3000.
