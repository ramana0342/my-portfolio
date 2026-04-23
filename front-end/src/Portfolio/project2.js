import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import "./projects.css"

function Project2() {
  const navigate = useNavigate()
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>

<div class="card">
  <div class="card-header text-center">
    <h1><img className='img1' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgFr19Wy1Hs0ZYosCVMAed2o354riG91pi294w1SJvy13ZcghLDAHKU-7mkBPSO_VnjNo&usqp=CAU"/>shopReaseR<img className='img2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgFr19Wy1Hs0ZYosCVMAed2o354riG91pi294w1SJvy13ZcghLDAHKU-7mkBPSO_VnjNo&usqp=CAU"/></h1>
  </div>
  <div class="card-body">
  <p><h4>Overview:</h4><p><span style={{padding:"60px"}}></span>This project is a React-based e-commerce application with Redux for state management. It includes features such as viewing products, filtering them, adding items to the cart, and viewing the cart's contents. The application supports various product filters based on rating and price, and provides a responsive and user-friendly interface.</p></p>
  <h4 class="card-title">Technologies Used:</h4>
  <ul>
    <li><b>React:</b> A JavaScript library for building user interfaces. Used for creating reusable UI components and managing the application state.</li>
    <li><b>Redux:</b> A state management library for JavaScript applications. Utilized for handling the global state of the shopping cart and product data.</li>
 <li><b>React-Redux:</b> The official React bindings for Redux. Provides hooks like useDispatch and useSelector for interacting with the Redux store.</li>
<li><b>React-Router-Dom:</b> A library for handling routing and navigation in React applications. Used for managing navigation between different pages such as the home page and the cart page.</li>
<li><b>CSS:</b> Cascading Style Sheets used for styling the application. Custom styles are applied to components for layout and presentation.</li>
<li><b>JavaScript:</b> The programming language used for writing the logic and functionality of the application.</li>
<li><b>Node.js:</b> A JavaScript runtime used for running the development server and managing packages via npm .</li>
<li><b>npm:</b> Package managers used for installing and managing project dependencies.</li>
  </ul>
    
  <div class="accordion accordion-flush" id="accordionFlushParent">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="true" aria-controls="flush-collapseOne">
      <h4>Components</h4>
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionFlushParent">
      <div class="accordion-body">



      <div class="accordion accordion-flush" id="accordionFlushChild">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse11" aria-expanded="true" aria-controls="flush-collapse11">
        <h6><b>InitialProduct Component</b></h6>
      </button>
    </h2>
    <div id="flush-collapse11" class="accordion-collapse collapse show" data-bs-parent="#accordionFlushChild">
      <div class="accordion-body">
        <ul>
            <li>Description: Displays a list of initial products. Users can view product details and add items to the cart.</li>
            <li>Key Features:
                <ul>
                    <li>Product Carousel: Displays a carousel of product images.</li>
                    <li>Add to Cart: Dispatches addToShopCart action to add a product.</li>
                    <li>Disable Button: Shows a disabled "Added To Cart" button if the item is already in the cart.</li>
                </ul>
            </li>
            <li>Dependencies: useDispatch, useSelector from react-redux; addToShopCart action from Reducer.</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse12" aria-expanded="false" aria-controls="flush-collapse12">
      <h6><b>Cart Component</b></h6>
      </button>
    </h2>
    <div id="flush-collapse12" class="accordion-collapse collapse" data-bs-parent="#accordionFlushChild">
      <div class="accordion-body">
        <ul>
            <li>Description: Displays items in the shopping cart, allows users to remove items, adjust quantities, and view the subtotal.</li>
            <li> Key Features:
                <ul>
                <li>Remove Item: Dispatches removeFromCart action to remove an item.</li>
                <li>Increase/Decrease Quantity: Dispatches IncreaseQty and DecreaseQty actions to adjust quantities.</li>
                <li>Subtotal Calculation: Computes the subtotal of all items.</li>
                </ul>
            </li>
            <li>Dependencies: useDispatch, useSelector from react-redux; removeFromCart, IncreaseQty, and DecreaseQty actions from Reducer.</li>
        </ul>
      </div>
    </div>
  </div>


  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse13" aria-expanded="false" aria-controls="flush-collapse13">
        <h6><b>ProductFilters Component</b></h6>
      </button>
    </h2>
    <div id="flush-collapse13" class="accordion-collapse collapse" data-bs-parent="#accordionFlushChild">
      <div class="accordion-body">
        <ul>
            <li>Description: Displays products based on applied filters. Users can view product details and add items to the cart.</li>
            <li>Key Features:
                <ul>
                    <li>Product Carousel: Displays a carousel of product images.</li>
                    <li>Add to Cart: Dispatches addToShopCart action to add a product.</li>
                </ul>
            </li>
            <li>Dependencies: useDispatch from react-redux; addToShopCart action from Reducer.</li>

        </ul>
        </div>
    </div>
  </div>


  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse14" aria-expanded="false" aria-controls="flush-collapse14">
        <h6><b>Header Component</b></h6>
      </button>
    </h2>
    <div id="flush-collapse14" class="accordion-collapse collapse" data-bs-parent="#accordionFlushChild">
      <div class="accordion-body">
         <ul>
            <li>Description: Displays the navigation bar and a link to the cart, including the number of items in the cart.</li>
            <li>Key Features:
                <ul>
                    <li>Navigation Links: Links to home page and cart page.</li>
                    <li>Cart Item Count: Shows the total number of items in the cart.</li>
                </ul>
            </li>
<li>Dependencies: useSelector from react-redux; BrowserRouter, Routes, Route, and Link from react-router-dom.</li>
         </ul>
      </div>
    </div>
  </div>


  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse15" aria-expanded="false" aria-controls="flush-collapse15">
        <h6><b>SheimerEffect Component</b></h6>
      </button>
    </h2>
    <div id="flush-collapse15" class="accordion-collapse collapse" data-bs-parent="#accordionFlushChild">
      <div class="accordion-body">
        <ul>
            <li>Description: Displays a skeleton loading screen effect for product cards.</li>
            <li>Key Features:
                <ul>
                   <li> Placeholder Elements: Displays placeholders for product images and text to indicate loading.</li>
                </ul>
            </li>

            <li>Dependencies: None specific; relies on CSS for styling</li>
        </ul>
      </div>
    </div>
  </div>


  </div>   {/*  child Accordian   */}


     </div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse2" aria-expanded="false" aria-controls="flush-collapse2">
        <h4>Reducers</h4>
      </button>
    </h2>
    <div id="flush-collapse2" class="accordion-collapse collapse" data-bs-parent="#accordionFlushParent">
      <div class="accordion-body">
        
      <div class="accordion accordion-flush" id="accordionFlushChild2">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse21" aria-expanded="false" aria-controls="flush-collapse21">
        <h6><b>Reducer.js</b></h6>
      </button>
    </h2>
    <div id="flush-collapse21" class="accordion-collapse collapse" data-bs-parent="#accordionFlushChild2">
      <div class="accordion-body">
        <ul>
            <li>Description: Contains Redux actions and reducers for managing the shopping cart state.</li>
<li>Key Actions:
    <ul>
        <li>addToShopCart(cartItems): Adds a new item to the cart.</li>
        <li>removeFromCart(index): Removes an item from the cart at the specified index.</li>
        <li>IncreaseQty(ProductID): Increases the quantity of the item with the given ProductID.</li>
        <li>DecreaseQty(ProductID): Decreases the quantity of the item with the given ProductID.</li>
    </ul>
</li>
        </ul>
      </div>
    </div>
  </div>
  </div>

      </div>
    </div>
  </div>


  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse3" aria-expanded="false" aria-controls="flush-collapse3">
      <h4>Styling</h4>
      </button>
    </h2>
    <div id="flush-collapse3" class="accordion-collapse collapse" data-bs-parent="#accordionFlushParent">
      <div class="accordion-body">


      <div class="accordion accordion-flush" id="accordionFlushChild3">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse31" aria-expanded="false" aria-controls="flush-collapse31">
         <h6><b>App.css</b></h6>
      </button>
    </h2>
    <div id="flush-collapse31" class="accordion-collapse collapse" data-bs-parent="#accordionFlushChild3">
      <div class="accordion-body">
        <ul>
            <li>Description: Contains styling for various application components including the cart, product cards, headers, and other UI elements.</li>
            <li>Key Classes:
                <ul>
                    <li>container: General layout container.</li>
                    <li>card: Styles for product and cart cards.</li>
                    <li>price: Styling for price display.</li>
                    <li>CartImg: Styling for cart item images.</li>
                    <li>MainCard: Main styling for card components.</li>
                </ul>
            </li>
        </ul>
      </div>
    </div>
  </div>
  </div>




     
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
        <p><span style={{padding:"25px"}}></span>This e-commerce application provides a comprehensive solution for managing products and shopping cart functionalities in a modern, responsive environment. By leveraging React and Redux, the application ensures a seamless user experience with efficient state management and dynamic content rendering. The modular component structure and integration of filtering and search functionalities enhance usability, making it easier for users to navigate and interact with the product offerings.</p>

<p> <span style={{padding:"25px"}}></span>This documentation outlines the core components, setup instructions, and functionality, providing a solid foundation for further development and customization. Future improvements could include additional features such as user authentication, product reviews, and enhanced analytics.</p>
      </div>
    </div>
  </div>

  </div>
 
    
  </div>
  <div class="card-footer text-body-secondary">
  <a href='https://e-commerce-iota-roan.vercel.app/'>Deployment App Link</a>
  </div>
  <div  className='text-center'><button style={{margin:"5px"}} onClick={()=>{navigate("/")}} class="btn btn-primary">Go Back</button></div>

</div>


    </>
  )
}

export default Project2;