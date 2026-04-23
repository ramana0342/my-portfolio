import React from 'react'
import { useNavigate  } from 'react-router-dom';
import { useEffect } from 'react';
import "./projects.css"

function Project1() {
    const navigate=useNavigate()

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (<>

<div class="card project1Card">
  <div className='imgDiv'></div>
  <div class="card-header text-center">
  <h1><img className='img1' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgFr19Wy1Hs0ZYosCVMAed2o354riG91pi294w1SJvy13ZcghLDAHKU-7mkBPSO_VnjNo&usqp=CAU"/>TODO Task <img className='img2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgFr19Wy1Hs0ZYosCVMAed2o354riG91pi294w1SJvy13ZcghLDAHKU-7mkBPSO_VnjNo&usqp=CAU"/></h1>
  </div>
  <div class="card-body">
    <p><h4>Overview:</h4><p><span style={{padding:"60px"}}></span>This application is a Task Management System that allows users to register, log in, and manage their tasks. Each task is associated with the specific user who created it, ensuring that tasks are private and only accessible by the user who created them. Users can add, update, and delete tasks, as well as view all their tasks in a user-specific manner. The application uses React for the frontend, Express for the backend, and MongoDB for data storage. JWT tokens are employed for session management.</p></p>
    <h4 class="card-title">Technologies Used:</h4>
    <p class="card-text"><b>Front-End:</b>HTML,CSS,Javascript, React, React Router DOM, Axios </p>
     <p><b>Back-End:</b> Node.js, Express.js,Mongoose, JWT, Bcrypt </p>
    <p><b>Styling:</b> CSS , Bootstrap</p>
    


  



   <div class="accordion accordion-flush" id="accordionFlushExample">


   <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse1" aria-expanded="True" aria-controls="flush-collapse1">
      <h4 className='text-center'>Project Structure</h4>
      </button>
    </h2>
    <div id="flush-collapse1" class="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
      <h6><b>1) Front-End (React)</b></h6>
    <ul>
        <li>App.js: Main component that sets up routing and includes navigation.</li>
        <li>UserRegister.js: Component for user registration.</li>
        <li>UserLogin.js: Component for user login.</li>
        <li>UserActivity.js: Component for managing and displaying tasks.</li>
        <li>App.css: CSS styles for the application.</li>
    </ul>
    <h6><b>2) Back-End</b></h6>
    <ul>
        <li>index.js: Entry point for the Express server.</li>
        <li>API Views/: Directory containing route handlers.
            <ul>
                <li>users.js: Handles user registration and login</li>
                <li>tasks.js: Handles task management (CRUD operations).</li>

            </ul>
        </li>
        <li>Model/: Directory containing Mongoose schemas.
            <ul>
                <li>user.js: Schema for user data.</li>
                <li>toDoTask.js: Schema for tasks.</li>
            </ul>
        </li>
        
    </ul>

      </div>
    </div>
  </div>



  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse2" aria-expanded="false" aria-controls="flush-collapse2">
      <h4>Front-End Components</h4>
      </button>
    </h2>
    <div id="flush-collapse2" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">

      <h6><b>App.js</b></h6>
    <ul>
        <li>Sets up routing using BrowserRouter, Routes, and Route.</li>
<li>Includes navigation links using NavLink.</li>
<li>Handles user authentication state and logout functionality.</li>
    </ul>

    <h6><b>UserRegister.js</b></h6>
    <ul>
        <li>Provides a form for user registration.</li>
<li>Handles form input changes and form submission.</li>
<li>Communicates with the backend to register a user and handle errors.</li>
    </ul>

   <h6><b>UserLogin.js</b></h6>
   <ul>
    <li>Provides a form for user login.</li>
<li>Handles form input changes and form submission.</li>
<li>Communicates with the backend to authenticate the user and manage login state.</li>
</ul>
     <h6><b>UserActivity.js</b></h6>
     <ul>
    <li>Allows users to add, update, and delete tasks.</li>
    <li>Fetches tasks from the backend and updates the task list.</li>
<li>Displays tasks and includes buttons for task management.</li>
</ul>
   <h6><b>CSS Styles </b></h6>
  <ul> <li>App.css: Contains styles for various components including the header, forms, and task items.</li></ul> 
   


      </div>
    </div>
  </div>



  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      <h4>Back-End Routes</h4>
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
        <h6><b>User Routes</b></h6>
        <ul>
            <li>POST /register: Register a new user. Requires Name, Email, and Password.</li>
            <li>POST /login: Authenticate a user. Requires Email and Password.</li>
        </ul>

        <h6><b>Task Routes</b></h6>
        <ul>
            <li>POST /addTask: Add a new task. Requires Task in the request body and an Authorization token.</li>
             <li>GET /getUserTasks: Retrieve all tasks for the authenticated user.</li>
             <li>PUT /UpDataTask/: Update a task by ID. Requires updated task data and Authorization token.</li>
             <li>DELETE /DeleteTask/: Delete a task by ID. Requires Authorization token.</li>
        </ul>
      </div>
    </div>
  </div>


  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
      <h4>API Endpoints</h4>
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
        <ul>
            <li>Base URL: https://todo-task-full-stack-project.onrender.com/</li>
            <li><b>User Endpoints</b>
            <ul>
                <li>/register: Register a new user.</li>
                <li>/login: Login a user.</li>
            </ul>
            </li>
            <li><b>Task Endpoints:</b>
            <ul>
                <li>/addTask: Add a new task.</li>
<li>/getUserTasks: Get tasks for the logged-in user.</li>
<li>/UpDataTask/:id: Update a specific task.</li>
<li>/DeleteTask/:id: Delete a specific task.</li>
               
            </ul>
            </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
        <h4>Database Schema</h4>
      </button>
    </h2>
    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
        <h6><b>User Schema (user.js)</b></h6>
        <ul>
            <li>Name: String, required</li>
            <li>Email: String, required</li>
            <li>Password: String, required</li>
        </ul>

        <h6><b>Task Schema (toDoTask.js)</b></h6>
        <ul>
            <li>UserID: ObjectId, required</li>
            <li>Task: String, required</li>
          
        </ul>
      </div>
    </div>
  </div>


  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapsefour" aria-expanded="false" aria-controls="flush-collapsefour">
      <h4>Conclusion</h4>
      </button>
    </h2>
    <div id="flush-collapsefour" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
      This Task Management Application effectively allows users to register, log in, and manage their tasks. It ensures user-specific task management by associating each task with the individual user who created it. The functionality includes:
      <ul>
        <li><b>Task Management:</b> Users can view, add, update, and delete tasks specific to their account.</li>
        <li><b>Individual Task Data:</b>Tasks are fetched from the server for each logged-in user, ensuring privacy and user-specific data access.</li>
      </ul>
      The implementation uses JWT tokens for secure user sessions, and tasks are managed through a RESTful API built with Express. The frontend, developed with React, provides a user-friendly interface for task management.

This design ensures that each user's tasks remain private and only accessible to the authenticated user, adhering to best practices in secure web application development.
      </div>
    </div>
  </div>





  </div>




   
  

  </div>

  <div class="card-footer text-body-secondary">
    <a href='https://todo-task-full-stack-project.vercel.app/'>Deployment App Link</a>
  </div>
  <div  className='text-center'><button style={{margin:"5px"}} onClick={()=>{navigate("/")}} class="btn btn-primary">Go Back</button></div>
</div>

    </>)
}

export default Project1