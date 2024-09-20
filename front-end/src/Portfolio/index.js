import "./index.css";
import ramImg from "./ravana.jpeg";
import {useState} from "react";
import axios from "axios"
import { NavLink , Link} from "react-router-dom";
import Typed from 'typed.js';
import { useEffect } from 'react';
import { SiVercel } from "react-icons/si";
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useContext } from "react";
import { store } from "./mainHeader";
import { useNavigate } from "react-router-dom";



const Index=()=>{

  const navigate=useNavigate()
  const [count,setCount]=useContext(store)

  useEffect(() => {
    AOS.init({
     duration: 1500, // duration of the animation in milliseconds
      once: false, // whether animation should happen only once - while scrolling down
      mirror: true,
    });
    AOS.refresh();
  }, []);

    
      
    const[inputData,setInputData] = useState({name:"",Email:"",mobileNumber:"",Message:""});
    const[result,setResult] = useState("")
    
    useEffect(() => {
      
      const options = {
        strings: ["Front-end Developer", "Back-end Developer", "React Developer","Full Stack Developer"],
        typeSpeed: 50,
        backSpeed:25,
        backDelay:700,
        loop: true
      };
     
      const typed = new Typed('.text', options);
      return () => {
        typed.destroy();
      };
    }, []); 


    const handleChange=(field,value)=>{
      setResult("")
      setInputData({...inputData,[field]:value}) 
      //console.log(inputData)
    }
    

    const userDatasent=()=>{
    axios.post("https://my-portfolio-83my.onrender.com/userinputdata",inputData).then((res)=>{
         console.log(res.data.Success)
         if(res.data.Success){
          setInputData({ name: "", Email: "", mobileNumber: "", Message: "" })
        setResult(res.data.Success)
        setCount(true)
        
         }else if( res.data.Fail){
          setResult(res.data.Fail)
         }
         
    })
  }
    
    return(<>
  
    <div className="container-fluid">
        <div className="row">
              
       
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Portfolio</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link home" href="#home">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#About">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#Academics">Academics</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#Skills">Skills</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#Projects">Projects</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#contactInfo">Contact</a>
              </li>
              <li class="nav-item">
                <NavLink to="/adminLogin" className="nav-link" >AdminActivities{count==0 ? <sup>0</sup>:<sup>{count}</sup> }</NavLink>
              </li>
            </ul>
           </div>
           </div>
      </nav>

</div>

      

    <div className="row">

    <section id="home">
       <div className="home-content">
        <h3>Hello ,Welcome to My Portfolio</h3>
        <h1>My Name is <b>"Ramana Reddy"</b></h1>
        <h2>I Trained As A  <b style={{marginLeft:"6px"}}><span className="text"></span></b></h2>
       </div>
    </section>

    </div>

    <div className="row">

    <section id="About"  tabindex="0">
         <div  class="circle" >
          <img src={ramImg}/>
          <div class="content">
            <h1>ABOUT ME</h1>
            <p><b>My self Ramana Reddy. I am Seeking a position to utilize my skills and abilities in the Information Technology industry, that offer
              Professional growth while being resourceful, innovative and flexible.
              My hometown is Khammam, Telangana (State). I completed my post graduation with distinction in Master of Computer Applications with first division in November, 2023. I have full stack development knowledge. I trained in full stack development at Innomatics Research Lab.</b></p>
              <div className="skills-logos" style={{margin:"0px",padding:"0px"}}>
                <span style={{position:"relative",top:"11px"}}> <a  className="skill-Link" href="mailto:ramanareddy.m0342@gmail.com"><i style={{fontSize:"38px"}}  class="fa-solid fa-envelope"></i></a> </span>
                <span style={{position:"relative",top:"8px"}}><a className="skill-Link" href="https://github.com/ramana0342"><i class="fa-brands fa-square-github  fa-2x"></i></a></span>
                <span style={{position:"relative",top:"8px"}}> <a className="skill-Link" href="https://www.linkedin.com/in/ramanareddymaddi/"><i class="fa-brands fa-linkedin fa-2x"></i></a></span> 
                 <span style={{position:'relative',top:"4px"}}> <a className="skill-Link fa-2x" href="https://vercel.com/ramana-reddys-projects"><SiVercel /></a> </span></div>
              </div>
           
         </div>
      </section>

    </div>


    <div className="row">
      


<section id="Academics">
      <div class="container">
        <h1 class="academicsText">Academics</h1>
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-6">
            <div class="card" data-aos="flip-left">
              <div class="card-header">
                <h4>Post Graduation</h4>
              </div>
              <div class="card-body">
                <h1>Master of Computer Applications(MCA)</h1>
                <ul>
                  <li>Branch:MCA</li>
                  <li>College Name:Aurora's Post Graduate college</li>
                  <li>Pass out year:november,2023</li>
                  <li>Percentage:76 %</li>
                </ul>
              </div>
            </div>
          </div>

         
          <div class="col-sm-12 col-md-12 col-lg-6">
            <div class="card" data-aos="flip-right">
              <div class="card-header">
                <h4>Under Graduation</h4>
              </div>
              <div class="card-body">
                <h1>Bachelor of Science</h1>
                <ul>
                  <li>Branch:MPCs(Mathematics,Physics,computer scienc)</li>
                  <li>College Name:University Post Graduate College(OU)</li>
                  <li>Pass out year:november,2021</li>
                  <li>Percentage:87 %</li>
                  <br/>
                  <br/>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-12 col-lg-6">
            <div class="card" data-aos="flip-left">
              <div class="card-header">
                <h4>Intermediate</h4>
              </div>
              <div class="card-body">
                <h1>Intermediate</h1>
                <ul>
                  <li>Branch:MPC(Mathematics,Physics,Chemistry)</li>
                  <li>College Name:Krishnaveni Cooparative Junior College</li>
                  <li>Pass out year:March,2018</li>
                  <li>Percentage:95.90</li>
                </ul>
              </div>
            </div>
          </div>


          <div class="col-sm-12 col-md-12 col-lg-6">
            <div class="card" data-aos="flip-right">
              <div class="card-header">
                <h4>Secondary School Education</h4>
              </div>
              <div class="card-body">
                <h1>SSC</h1>
                <ul>
                  <li>School Name:Z P S School,kamanchikal</li>
                  <li>Pass out year:March,2016</li>
                  <li>Percentage:82%</li>
                  <br/>
                  
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>




   
 </div>

 <div className="row">
 <section id="Skills">
      <div class="container">
        <h1 class="text-center">My Skillls</h1>
       <div class="row p-lg-3 p-0 mb-lg-3 mb-0">
       <div class="col-lg-6 col-12 pt-lg-0  pt-3">
        <label>HTML<img style={{width:"80px" , borderRadius:"80px"}} src="https://w7.pngwing.com/pngs/186/608/png-transparent-html5-icon-%E2%80%A2-html-social-network-icon.png"/> </label>
        <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar htmlProgress" style={{width:"75%"}}>75%</div>
        </div>
        </div>
        <div class="col-lg-6 col-12 pt-lg-0  pt-3">
          <label>CSS <img style={{width:"80px" , borderRadius:"80px"}} src="https://w7.pngwing.com/pngs/696/424/png-transparent-logo-css-css3-thumbnail.png"/> </label>
          <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar cssProgress" style={{width:"70%"}}>70%</div>
          </div>
       </div>
       </div>

      
       <div class="row p-lg-3 p-0 mb-lg-3 mb-0">
        <div class="col-lg-6 col-12 pt-lg-0  pt-3">
         <label>JAVASCRIPT <img style={{width:"80px" , borderRadius:"80px"}} src="https://i.pinimg.com/564x/b4/de/20/b4de205cb6d4e7cad43c2971f780cfd9.jpg"/></label>
         <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
           <div class="progress-bar javascriptProgress" style={{width:"85%"}}>85%</div>
         </div>
         </div>
         <div class="col-lg-6 col-12 pt-lg-0  pt-3">
           <label>REACT <img style={{width:"80px" , borderRadius:"80px"}} src="https://juststickers.in/wp-content/uploads/2016/05/reactjs-badge.png"/></label>
           <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
             <div class="progress-bar reactProgress" style={{width:"80%"}}>80%</div>
           </div>
        </div>
        </div>
        
        <div class="row p-lg-3 p-0 mb-lg-3 mb-0">
          <div class="col-lg-6 col-12 pt-lg-0  pt-3">
           <label>NODE.JS <img style={{width:"80px" , borderRadius:"80px"}} src="https://academyclass.com/wp-content/uploads/2021/11/ACCL-NodeJS-1200x1200.png"/></label>
           <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
             <div class="progress-bar nodejsProgress" style={{width:"70%"}}>70%</div>
           </div>
           </div>
           <div class="col-lg-6 col-12 pt-lg-0  pt-3">
             <label>EXPRESS.JS  <img style={{width:"80px" , borderRadius:"80px"}} src="https://banner2.cleanpng.com/20180711/yfe/aawnyv4jx.webp"/></label>
             <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
               <div class="progress-bar expressProgress" style={{width:"60%"}}>60%</div>
             </div>
          </div>
          </div>

          <div class="row p-lg-3 p-0 mb-lg-3 mb-0">
            <div class="col-lg-6 col-12 pt-lg-0  pt-3">
             <label>MONGO DB  <img style={{width:"80px" , borderRadius:"80px"}} src="https://www.pngkit.com/png/full/383-3839245_monitoring-mongodb-canva-png.png"/></label>
             <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
               <div class="progress-bar dbProgress" style={{width:"60%"}}>60%</div>
             </div>
             </div>
             <div class="col-lg-6 col-12 pt-lg-0  pt-3">
               <label>CORE JAVA (Self Learning) <img style={{width:"80px" , borderRadius:"80px"}} src="https://i.pinimg.com/736x/5c/f3/41/5cf3414bbe67723a8c03bd6340d7417b.jpg"/></label>
               <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                 <div class="progress-bar javaProgress" style={{width: "55%"}}>55%</div>
               </div>
            </div>
            </div>
            </div>
           </section>

 </div>

 <div className="row">
  <section id="Projects">

  <div class="container">
        <h1 class="projectText">Personal project</h1>
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12">
            <div class="card todoTask" data-aos="flip-left">
              <div class="card-header">
                <h3>Project Name : TODO Task</h3>
              </div>
              <div style={{fontWeight:"20px"}} class="card-body">
                <h5>Description : </h5>
                <ul>
                  <li>I developed a "TODO Tasks Website" using React and Node.js.</li>
                  <li>This website "TODO Tasks" allows users to register, login, add, update and delete functions.</li>
                  <li>User authentication is implemented using JWT tokens ,And stored user data and tasks in MongoDB</li>
                  <li>Utilized React for the frontend interface and Axios for making HTTP requests to the backend server</li>
                </ul>
                <a style={{textDecoration:"none",color:"#08ffff"}} href="https://todo-task-full-stack-project.vercel.app/"><h5>Vercel Deploy App<i class="bi bi-link-45deg"></i></h5></a>
                <div style={{textAlign:"center"}}><button style={{padding:"5px"}}  onClick={()=>{navigate("/project1")}}>View More</button></div>
              </div>
            </div>
          </div>

         
          <div class="col-sm-12 col-md-12 col-lg-12">
            <div class="card ecommerceCard" data-aos="flip-right">
              <div class="card-header">
              <h3>Project Name : shopReaseR</h3>
              </div>
              <div style={{fontWeight:"20px"}} class="card-body">
              <h5>Description : </h5>
                <ul>
                  <li>Developed e-commerce website using HTML, CSS,React and Bootstrap with a focuson responsive design</li>
                  <li>Implemented a user-friendly interface allowing customers to browse products and add them to a shopping cart</li>
                </ul>
                <a style={{textDecoration:"none",color:"#08ffff"}} href="https://e-commerce-iota-roan.vercel.app/"><h5>Vercel Deploy App<i class="bi bi-link-45deg"></i></h5></a>
                <div style={{textAlign:"center"}}><button style={{padding:"5px"}}  onClick={()=>{navigate("/project2")}}>View More</button></div>
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-12 col-lg-12">
            <div class="card foodCard" data-aos="flip-left">
              <div class="card-header">
              <h3>Project Name : FreeHungeR </h3>
              </div>
              <div style={{fontWeight:"20px"}} class="card-body">
              <h5>Description : </h5>
                <ul>
                  <li>Developed a food Website using React, providing users with a platform to browse restaurant and search a food item from restaurants, And them to a Food Cart</li>
                  <li>Implemented features such as restaurant listings,menu display and cart management.</li>
                </ul>
                <a style={{textDecoration:"none",color:"#08ffff"}} href="https://food-website-ten-henna.vercel.app/"><h5>Vercel Deploy App<i class="bi bi-link-45deg"></i></h5></a>
                <div style={{textAlign:"center"}}><button style={{padding:"5px"}}  onClick={()=>{navigate("/project3")}}>View More</button></div>
              </div>
            </div>
          </div>




        </div>
      </div>
           


  </section>
 </div>


 <div className="row">
    
 <section id="contactInfo" >
              <div class="container">
                <h1 class="text-center" style={{marginTop:"55px"}}>Contact Details</h1>
                <div class="row" id="ContactRow">
                  <div class="col-md-7">
                    <h4>For Contact Me</h4>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Name</label>
                      <input  onChange={(e)=>{handleChange("name",e.target.value)}} value={inputData.name} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter your Name"/>
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Email</label>
                      <input  onChange={(e)=>{handleChange("Email",e.target.value)}} value={inputData.Email}  type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter Your Email"/>
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Contact Number</label>
                      <input onChange={(e)=>{handleChange("mobileNumber",e.target.value)}} value={inputData.mobileNumber}  type="number" class="form-control" id="exampleFormControlInput1" placeholder="Enter your number"/>
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlTextarea1" class="form-label">Message</label>
                      <textarea onChange={(e)=>{handleChange("Message",e.target.value)}} value={inputData.Message}  class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <button onClick={()=>{userDatasent()}} class="btn btn-primary" style={{width:"120px"}}>Send</button><br/>
                    {result ?  <p><b>{result}</b></p> : ""}
                  </div>
                  <div class="col-md-5">
                    <h4>My Contact Detils</h4>
                    <hr/>
                    <div class="mt-5">
                      <div class="d-flex">
                        <i class="bi bi-geo-alt-fill"></i>
                        <p>Address:</p>
                        
                      </div>
                      <hr/>
                      <div class="d-flex">
                        <i class="bi bi-telephone-fill"></i>
                        <p>Contact:(+91)-7993810342</p>
                        
                      </div>
                      <hr/>
                      <div class="d-flex">
                        <i class="bi bi-envelope-fill"></i>
                        <p>Email ID:- ramanareddy.m0342@gmail.com</p>
                      </div>
                      <hr/>
                      <div class="d-flex">
                        <i class="bi bi-browser-chrome"></i>
                        <p>My Portfolio:- https://my-portfolio-xi-two-63.vercel.app/</p>
                      </div>
                      <hr/>
                      <div class="d-flex">
                        <i class="bi bi-linkedin"></i>
                         <p>www.linkedin.com/in/ramanareddymaddi</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
     
              </section>
     
   

 </div>

 


    </div>
   
    </>)
}


export default Index