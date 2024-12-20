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



