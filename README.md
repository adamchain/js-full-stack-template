# js-full-stack-template

### Summary

Full-stack js/node/express template with PostgreSQL. Lets users sign up, sign in, and open a JWT token-protected page. Includes CRUD for user management.
![flowchart](https://github.com/user-attachments/assets/a6cc215d-fa86-4504-b28b-a1d18eac5c8f)

1. **Frontend**:  
   - **Sign Up**: Form for name, email, and password (with validation).  
   - **Sign In**: Login with email and password, get a JWT.  
   - **Dashboard**: Protected, validates JWT.  

2. **Backend**:  
   - Built with `Express.js`.  
   - Handles routes, auth, and APIs.  
   - Hashes passwords with `bcrypt`.  
   - JWT for sessions.

3. **Database**:  
   - PostgreSQL for user data.  
   - CRUD for create, read, update, delete users.  

Simple, functional starting point for auth-based apps.
--

Database Schema:

<img width="768" alt="Screen Shot 2024-12-20 at 2 27 25 AM" src="https://github.com/user-attachments/assets/dd4f8589-c15f-45a8-8f5d-5e16552f968a" />

--

Guide to setting up node/express-postgres enviornment: https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/

--

