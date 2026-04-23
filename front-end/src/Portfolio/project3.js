import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import  "./projects.css"

function Project3() {
    const navigate = useNavigate()

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <>

<div class="card">
  <div class="card-header text-center">
    <h1><img className='img1' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgFr19Wy1Hs0ZYosCVMAed2o354riG91pi294w1SJvy13ZcghLDAHKU-7mkBPSO_VnjNo&usqp=CAU"/>FreeHungeR<img className='img2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgFr19Wy1Hs0ZYosCVMAed2o354riG91pi294w1SJvy13ZcghLDAHKU-7mkBPSO_VnjNo&usqp=CAU"/></h1>
  </div>
  <div class="card-body">
  <p><h4>Overview:</h4><p><span style={{padding:"60px"}}></span>This project is a React-based web application that simulates a restaurant search and food ordering system. It includes functionalities for searching restaurants, viewing restaurant details, searching for specific dishes, and managing a shopping cart.</p></p>
  <h4>Technologies Used:</h4>
  <p><span style={{padding:"60px"}}></span>React, React Router, Redux, React-Redux, Axios, Bootstrap, JavaScript, HTML5 & CSS3</p>
   
  <div class="accordion accordion-flush" id="accordionFlushParent">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse1" aria-expanded="true" aria-controls="flush-collapse1">
        <h4>Components</h4>
      </button>
    </h2>
    <div id="flush-collapse1" class="accordion-collapse collapse show" data-bs-parent="#accordionFlushParent">
      <div class="accordion-body">
    
      <div class="accordion accordion-flush" id="accordionFlushChild1">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse11" aria-expanded="false" aria-controls="flush-collapse11">
      <h6><b>Header.js</b></h6>
      </button>
    </h2>
    <div id="flush-collapse11" class="accordion-collapse collapse" data-bs-parent="#accordionFlushChild1">
      <div class="accordion-body">
        <ul>
            <li><b>Purpose:</b> Displays the navigation bar and sets up routing for different pages.</li>
            <li><b>Features:</b>
                <ul>
                    <li>Navigation links to Home, Search Restaurants, Search Dishes, and Cart.</li>
                    <li>Displays the total number of items in the cart.</li>
                    <li>Uses react-router-dom for routing and react-redux to access the Redux store.</li>
                </ul>
            </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse12" aria-expanded="false" aria-controls="flush-collapse12">
        <h6><b>Index.js</b></h6>
      </button>
    </h2>
    <div id="flush-collapse12" class="accordion-collapse collapse" data-bs-parent="#accordionFlushChild1">
      <div class="accordion-body">
          <ul>
              <li><b>Purpose:</b> Displays the initial list of restaurants and handles search functionality.</li>
              <li><b>Features:</b>
                  <ul>
                    <li>Uses Axios to fetch restaurant data based on the user’s location.</li>
                    <li>Provides a search bar to filter restaurants by name.</li>
                    <li>Displays restaurant cards using InitialHomeData component.</li>
                    <li>Contains RestaurantsLocationName component for location input and suggestions.</li>
                  </ul>
              </li>
           </ul>
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse13" aria-expanded="false" aria-controls="flush-collapse13">
        <h6><b>InitialHomeData.js</b></h6>
      </button>
    </h2>
    <div id="flush-collapse13" class="accordion-collapse collapse" data-bs-parent="#accordionFlushChild1">
      <div class="accordion-body">
        <ul>
            <li><b>Purpose:</b> Displays restaurant cards either from initial data or filtered results.</li>
            <li><b>Features:</b>
                <ul>
                    <li>Uses Bootstrap for layout and styling.</li>
                    <li>Dynamically updates based on the filtered or initial list of restaurants.</li>
                    <li>Allows navigation to a specific restaurant’s detail page.</li>
                </ul>
            </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse14" aria-expanded="false" aria-controls="flush-collapse14">
        <h6><b>RestaurantsItemsSpace.js</b></h6>
      </button>
    </h2>
    <div id="flush-collapse14" class="accordion-collapse collapse" data-bs-parent="#accordionFlushChild1">
      <div class="accordion-body">
        <ul>
            <li><b>Purpose:</b> Displays menu items for a selected restaurant.</li>
            <li><b>Features:</b>
                <ul>
                    <li>Fetches menu data from an API using the restaurant ID.</li>
                    <li>Displays each menu item with options to add to the cart.</li>
                    <li>Uses Redux to handle adding items to the cart.</li>
                </ul>
            </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse15" aria-expanded="false" aria-controls="flush-collapse15">
        <h6><b>Dishes.js</b></h6>
      </button>
    </h2>
    <div id="flush-collapse15" class="accordion-collapse collapse" data-bs-parent="#accordionFlushChild1">
      <div class="accordion-body">
        <ul>
            <li><b>Purpose:</b> Searches and displays dishes available across restaurants.</li>
            <li><b>Features:</b>
                <ul>
                    <li>Provides a search bar to enter dish names.</li>
                    <li>Displays results from the search with options to view restaurant details and add dishes to the cart.</li>
                </ul>
            </li>
        </ul>

      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse16" aria-expanded="false" aria-controls="flush-collapse16">
        <h6><b>RestaurantsLocationName.js</b></h6>
      </button>
    </h2>
    <div id="flush-collapse16" class="accordion-collapse collapse" data-bs-parent="#accordionFlushChild1">
      <div class="accordion-body">
        <ul>
            <li><b>Purpose:</b> Allows users to search for and select a location.</li>
            <li><b>Features:</b>
                <ul>
                    <li>Fetches location suggestions based on user input.</li>
                    <li>Updates the location state based on selected suggestions.</li>
                </ul>
            </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse17" aria-expanded="false" aria-controls="flush-collapse17">
        <h6><b>SearchRestaurants.js</b></h6>
      </button>
    </h2>
    <div id="flush-collapse17" class="accordion-collapse collapse" data-bs-parent="#accordionFlushChild1">
      <div class="accordion-body">
          <ul>
            <li><b>Purpose:</b> Allows users to search for restaurants based on a name query.</li>
            <li><b>Features:</b>
                <ul>
                    <li>Provides a search bar for restaurant names.</li>
                    <li>Displays search results with options to view details for each restaurant.</li>
                </ul>
            </li>
          </ul>
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse18" aria-expanded="false" aria-controls="flush-collapse18">
        <h6><b>FoodCart.js</b></h6>
      </button>
    </h2>
    <div id="flush-collapse18" class="accordion-collapse collapse" data-bs-parent="#accordionFlushChild1">
      <div class="accordion-body">
        <ul>
            <li><b>Purpose:</b> Manages and displays the shopping cart.</li>
            <li><b>Features:</b>
                <ul>
                    <li>Allows users to add or remove items from the cart.</li>
                    <li>Displays a list of selected items and their quantities.</li>
                    <li>Provides options to proceed to checkout.</li>
                </ul>
            </li>
        </ul>
      </div>
    </div>
  </div>


  </div>   {/*Child Accordian End*/}


      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse2" aria-expanded="false" aria-controls="flush-collapse2">
        <h4>Routing</h4>
      </button>
    </h2>
    <div id="flush-collapse2" class="accordion-collapse collapse" data-bs-parent="#accordionFlushParent">
      <div class="accordion-body">
        <ul>
            <li><b>/:</b> Renders the Index component which displays the list of restaurants.</li>
            <li><b>/restaurantsItems/:id:</b>Renders the RestaurantsItemsSpace component to display menu items for the restaurant with the given ID.</li>
            <li><b>/findRestaurants/:</b> Renders the SearchRestaurants component for searching restaurants.</li>
            <li><b>/Dishes/:</b>Renders the Dishes component for searching and displaying dishes.</li>
            <li><b>/cartItems/:</b> Renders the FoodCart component to display items in the cart.</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse3" aria-expanded="false" aria-controls="flush-collapse3">
        <h4>State Management</h4>
      </button>
    </h2>
    <div id="flush-collapse3" class="accordion-collapse collapse" data-bs-parent="#accordionFlushParent">
      <div class="accordion-body">
        <ul>
            <li><b>Redux: </b>Manages the application’s global state, particularly for the cart.
                <ul>
                    <li><b>Actions:</b> Define actions for adding items to the cart.</li>
                    <li><b>Reducers:</b> Handle state updates in response to actions.</li>
                    <li><b>Store:</b> Configures the Redux store with middleware.</li>
                </ul>
            </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse4" aria-expanded="false" aria-controls="flush-collapse4">
        <h4>Conclusion</h4>
      </button>
    </h2>
    <div id="flush-collapse4" class="accordion-collapse collapse" data-bs-parent="#accordionFlushParent">
      <div class="accordion-body">
        <p><span style={{padding:"60px"}}></span>This React-based web application successfully simulates a restaurant search and food ordering system, offering a comprehensive user experience from searching for restaurants to managing a shopping cart. By leveraging modern web technologies such as React, Redux, and Axios, the application provides a responsive and efficient platform for users to explore dining options, view detailed menus, and place orders.</p>
        <p><span style={{padding:"60px"}}></span>The use of Redux for state management ensures seamless handling of cart operations, while React Router enables smooth navigation across different views. The integration of Bootstrap enhances the visual appeal and usability of the application. As the project evolves, future improvements such as enhanced error handling, user authentication, and pagination could further enrich the user experience.</p>
      </div>
    </div>
  </div>


  </div>

 
    
  </div>
  <div class="card-footer text-body-secondary">
  <a href='https://food-website-ten-henna.vercel.app/'>Deployment App Link</a>
  </div>
  <div  className='text-center'><button style={{margin:"5px"}} onClick={()=>{navigate("/")}} class="btn btn-primary">Go Back</button></div>

</div>


    </>
  )
}

export default Project3