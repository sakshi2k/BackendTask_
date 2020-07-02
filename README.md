### Backend-task

A NodeJS application for user and instructor registration with REST APIs implementation.

#### Salient features
1. Models that includes Authentication via:

  Email id  (Instructor authentication)

    - Authentication status update for Users by Instructor

  Instructor approval  (User authentication)

    - Instructor authentication confirmation through email

2. CRUD operations on users 
3. Update Details of users 
    - individually by ID
    - all users
4. Task uniquely identified by it's name
    - Task Name given to student to access the task.

#### Models

1. User                  
2. Instructor
3. Task

#### Routes 

#####   TASK ROUTES

 /tasks : 
 
     get - Shows all TASKS assigned
      
/addtasks :

     post - Creates an INSTRUCTOR User

/task/:taskName :

     get - Shows the task.

     post - Submits task after editing (by student)

/task/:taskName/:studentName :

     get - Shows submitted Task by Student


#####   INSTRUCTOR ROUTES

 /instructor : 
 
     get - Renders registration page
     
     post - Creates an INSTRUCTOR User
      
 /instructor/verify :
 
     get - To Verify instructor account via Secret Code
     
     post - Authenticated Registeration
      
 /instructor/authenticateUsers :
 
      get - To authenticate new users
      
      post - To authenticate new users 
      
#####  USER ROUTES

 /user :
 
     get - Renders registration page
     
     post - Creates a user
      
 /user/:userEmail :
 
     get - To get details of a single User
     
     patch - Edits the details of a single user
     
     delete - Deletes a single user entry from the User table
      
 /users/findAll : 
 
     get - Lists all the users present in the User table
  

###### dependencies {
    "body-parser": "^1.19.0",
    "ejs": "^3.1.3",
    "express": "^4.17.1",
    "mongoose": "^5.9.18",
    "multer": "^1.4.2",
    "nodemailer": "^6.4.8",
    "randomstring": "^1.1.5"
###### }
