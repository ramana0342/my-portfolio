import "./index.css";
import ramImg from "./icons/ramana.jpeg";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Typed from 'typed.js';
import { useEffect } from 'react';
import { SiVercel } from "react-icons/si";
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useContext } from "react";
import { store } from "./mainHeader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserContactMessagesCount, postUserContact } from "../network/portfolioApiService/portfolioApiService";
import { useForm } from "react-hook-form";
import { getAdminTokenData } from "../utils/adminToken";
import UserChat from "./chats/userChat";
import ReactLogo from "./icons/react-icon.jpeg";
import NodeLogo from "./icons/node-icon.png";

const Index = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const [count, setCount] = useContext(store)
  const [isSendLoading, setIsSendLoading] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowHint(false), 4000);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
      mirror: true,
    });
    AOS.refresh();
  }, []);

  useEffect(() => {
    getUsersMessagesCount()
  }, [])

  useEffect(() => {

    const options = {
      strings: ["Front-end Developer", "Back-end Developer", "React Developer", "Full Stack Developer"],
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 700,
      loop: true
    };

    const typed = new Typed('.text', options);
    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    const skillsSection = document.getElementById("skills");

    const handleScroll = () => {
      if (!skillsSection) return;

      const rect = skillsSection.getBoundingClientRect();

      if (rect.top < window.innerHeight - 100 && rect.bottom > 100) {
        skillsSection.classList.add("animate");
      } else {
        skillsSection.classList.remove("animate");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSendUserContactData = async (formData) => {
    setIsSendLoading(true)
    try {
      const data = await postUserContact(formData)
      if (data.status.code === 201) {
        reset();
        toast.success(data?.status?.message);
        getUsersMessagesCount()
      } else {
        toast.error(data?.status?.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSendLoading(false)
    }
  };



  const getUsersMessagesCount = async () => {
    try {
      let data = await getUserContactMessagesCount()
      if (data.status.code === 200) {
        if (data?.response?.totalMessages) {
          setCount(data.response.totalMessages);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isChatOpen) return;

    const timer = setTimeout(() => {
      setIsChatOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const closeNavbar = () => {
    const navbar = document.getElementById("navbarSupportedContent");
    if (navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };

  return (<>

    <div className="container-fluid">
      <div className="row">
        <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Portfolio</a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              onClick={()=>{if(isChatOpen){setIsChatOpen(false)};}}
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link home" href="#home" onClick={closeNavbar}>Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#about" onClick={closeNavbar}>About</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#experience" onClick={closeNavbar}>Experience</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#academics" onClick={closeNavbar}>Academics</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#skills" onClick={closeNavbar}>Skills</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#projects" onClick={closeNavbar}>Projects</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#contact" onClick={closeNavbar}>Contact</a>
                </li>
                {/* <li class="nav-item">
                  <NavLink to="/user-chat" className="nav-link">Chat</NavLink>
                </li> */}
                <li class="nav-item">
                  <NavLink to={getAdminTokenData() ? "/admin-panel/user-messages" : "/admin-login"} className="nav-link" >AdminActivities{count ? <sup>{count}</sup> : <sup>0</sup>}</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

      </div>



      <div className="row">

        <section id="home">
          <div className="home-content">

            <h3>Hello, Welcome to My Portfolio</h3>

            <h1>
              I'm <span style={{ color: "#0d6efd" }}>Ramana Reddy</span>
            </h1>

            <h2>
              I am a <span className="text"></span>
            </h2>

            <div className="home-buttons">
              <a href="#projects" className="btn-primary-custom">
                View Projects
              </a>

              <a href="#contact" className="btn-outline-custom">
                Hire Me
              </a>
            </div>

          </div>
        </section>
      </div>

      <div className="row">

        <section id="about">
          <div className="about-container">
            <h1 className="about-title">About Me</h1>

            <div className="about-card">
              <p>
                Hi, I'm <b>Ramana Reddy</b>, a passionate <b>Full Stack Developer</b>&nbsp;
                with experience in building scalable web applications using
                <b> React, Node.js, Express</b>.
              </p>

              <p>
                I completed my <b>MCA</b> in 2023 and gained practical experience
                working on real-time applications, focusing on clean architecture
                and efficient problem solving.
              </p>

              <p>
                Currently working as a <b>Frontend Developer</b>, I build reusable
                components, integrate APIs, and optimize performance to deliver
                seamless user experiences.
              </p>

              <p>
                I am open to <b>freelance opportunities</b> and confident in delivering
                high-quality, scalable solutions.
              </p>

              <div className="about-buttons">
                <a href="#contact" className="btn-about-primary">
                  Hire Me
                </a>

                <a href="/documents/resume.pdf" className="btn-about-outline" download="Ramana_Reddy_Resume.pdf">
                  Download CV
                </a>
              </div>

              <div className="about-links">
                <a href="mailto:ramanareddy.m0342@gmail.com" target="_blank" rel="noopener noreferrer">
                  Email
                </a>
                <a href="https://github.com/ramana0342" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/ramanareddymaddi/" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>

      <div className="row">
        <section id="experience">
          <div className="container">
            <h1 className="text-center experience-title">Experience</h1>

            <div className="timeline">

              <div className="timeline-item" data-aos="fade-up">
                <div className="timeline-content">
                  <h3>Frontend Developer</h3>
                  <h5>Promilo</h5>
                  <span>Feb 2025 - Present</span>
                  <p>
                    Working as a Frontend Developer building responsive and scalable web applications.
                    Developed reusable React components, improved UI performance, and integrated APIs.
                    Collaborated with backend teams and enhanced user experience across platforms.
                  </p>

                  <div className="exp-tags">
                    <span>React</span>
                    <span>JavaScript</span>
                    <span>Bootstrap</span>
                    <span>API Integration</span>
                  </div>
                </div>
              </div>

              <div className="timeline-item" data-aos="fade-up">
                <div className="timeline-content">
                  <h3>Full Stack Developer Trainee & Intern</h3>
                  <h5>Innomatics Research Labs</h5>
                  <span>Dec 2023 - Feb 2025</span>

                  <p>
                    Completed full stack development training and internship programs, gaining strong hands-on experience in both frontend and backend development.
                  </p>

                  <p>
                    Worked on building responsive user interfaces using React and Bootstrap, and developed REST APIs using Node.js and Express.
                    Gained practical knowledge in authentication (JWT), API integration, and database management.
                  </p>

                  <p>
                    Built real-world projects including task management systems and e-commerce applications, improving problem-solving and development skills.
                  </p>

                  <div className="exp-tags">
                    <span>React</span>
                    <span>Node.js</span>
                    <span>Express</span>
                    <span>MongoDB</span>
                    <span>JWT</span>
                    <span>REST APIs</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>


      <div className="row">



        <section id="academics">
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
                      <li>Branch : MCA</li>
                      <li>College Name : Aurora's Post Graduate college</li>
                      <li>Pass out year : November, 2023</li>
                      <li>Percentage : 76 %</li>
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
                      <li>Branch : MPCs(Mathematics,Physics,computer scienc)</li>
                      <li>College Name : University Post Graduate College(OU)</li>
                      <li>Pass out year : November, 2021</li>
                      <li>Percentage : 87 %</li>


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
                      <li>Branch : MPC(Mathematics,Physics,Chemistry)</li>
                      <li>College Name : Krishnaveni Cooparative Junior College</li>
                      <li>Pass out year : March, 2018</li>
                      <li>Percentage : 95.90 %</li>
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
                      <li>School Name : Z P S School,kamanchikal</li>
                      <li>Pass out year : March, 2016</li>
                      <li>Percentage : 82 %</li>

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="row">

        <section id="skills">
          <div class="container">
            <h1 class="text-center skills-title">My Skills</h1>

            <div class="row">
              <div class="col-lg-6 col-12">
                <div class="skill-card">
                  <div class="skill-header">
                    <span>HTML</span>
                    <img src="https://w7.pngwing.com/pngs/186/608/png-transparent-html5-icon-%E2%80%A2-html-social-network-icon.png" alt="HTML Logo" loading="lazy" />
                  </div>
                  <div class="progress">
                    <div class="progress-bar htmlProgress"></div>
                  </div>
                </div>
              </div>

              <div class="col-lg-6 col-12">
                <div class="skill-card">
                  <div class="skill-header">
                    <span>CSS</span>
                    <img src="https://w7.pngwing.com/pngs/696/424/png-transparent-logo-css-css3-thumbnail.png" alt="CSS Logog" loading="lazy" />
                  </div>
                  <div class="progress">
                    <div class="progress-bar cssProgress"></div>
                  </div>
                </div>
              </div>


              <div class="col-lg-6 col-12">
                <div class="skill-card">
                  <div class="skill-header">
                    <span>JAVASCRIPT</span>
                    <img src="https://i.pinimg.com/564x/b4/de/20/b4de205cb6d4e7cad43c2971f780cfd9.jpg" alt="JavaScript Logo" loading="lazy" />
                  </div>
                  <div class="progress">
                    <div class="progress-bar javascriptProgress"></div>
                  </div>
                </div>
              </div>


              <div class="col-lg-6 col-12">
                <div class="skill-card">
                  <div class="skill-header">
                    <span>REACT</span>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7aZNscHTmVGAAEz85uBcJ18hsKTexROCvNzMqly_KAw&s" alt="React Logo" loading="lazy" />
                  </div>
                  <div class="progress">
                    <div class="progress-bar reactProgress"></div>
                  </div>
                </div>
              </div>

              <div class="col-lg-6 col-12">
                <div class="skill-card">
                  <div class="skill-header">
                    <span>NODE.JS</span>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr2zv_xURifbiscWq5eG_WtIu8QSbOuES2Eqo1RPJGqA&s" alt="Node.js Logo" loading="lazy" />
                  </div>
                  <div class="progress">
                    <div class="progress-bar nodejsProgress"></div>
                  </div>
                </div>
              </div>

              <div class="col-lg-6 col-12">
                <div class="skill-card">
                  <div class="skill-header">
                    <span>EXPRESS.JS</span>
                    <img src="https://banner2.cleanpng.com/20180711/yfe/aawnyv4jx.webp" alt="Express.js Logo" loading="lazy" />
                  </div>
                  <div class="progress">
                    <div class="progress-bar expressProgress"></div>
                  </div>
                </div>
              </div>

              <div class="col-lg-6 col-12">
                <div class="skill-card">
                  <div class="skill-header">
                    <span>PostgreSQL</span>
                    <img src="https://raw.github.com/CircleCI-Public/cimg-postgres/main/img/circle-postgres.svg?sanitize=true" alt="PostgreSQL Logo" loading="lazy" />
                  </div>
                  <div class="progress">
                    <div class="progress-bar dbProgress"></div>
                  </div>
                </div>
              </div>

              <div class="col-lg-6 col-12">
                <div class="skill-card">
                  <div class="skill-header">
                    <span>CORE JAVA (Self Learning)</span>
                    <img src="https://i.pinimg.com/736x/5c/f3/41/5cf3414bbe67723a8c03bd6340d7417b.jpg" alt="Java Logo" loading="lazy" />
                  </div>
                  <div class="progress">
                    <div class="progress-bar javaProgress"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>

      <div className="row">
        <section id="projects">

          <div class="container">
            <h1 class="projectText">Personal Projects</h1>
            <div class="row">
              <div class="col-sm-12 col-md-12 col-lg-12">
                <div class="card todoTask" data-aos="flip-left">
                  <div class="card-header">
                    <h3>Project Name : TODO Task</h3>
                  </div>
                  <div style={{ fontWeight: "20px" }} class="card-body">
                    <h5>Description : </h5>
                    <ul>
                      <li>I developed a "TODO Tasks Website" using React and Node.js.</li>
                      <li>This website "TODO Tasks" allows users to register, login, add, update and delete functions.</li>
                      <li>User authentication is implemented using JWT tokens ,And stored user data and tasks in MongoDB</li>
                      <li>Utilized React for the frontend interface and Axios for making HTTP requests to the backend server</li>
                    </ul>
                    {/* <a style={{ textDecoration: "none", color: "#08ffff" }} href="https://todo-task-full-stack-project.vercel.app/"><h5>Vercel Deploy App<i class="bi bi-link-45deg"></i></h5></a> */}
                    <div style={{ textAlign: "center" }}><button style={{ padding: "8px 10px" }} onClick={() => { navigate("/projects/task-management") }}>View More</button></div>
                  </div>
                </div>
              </div>


              <div class="col-sm-12 col-md-12 col-lg-12">
                <div class="card ecommerceCard" data-aos="flip-right">
                  <div class="card-header">
                    <h3>Project Name : shopReaseR</h3>
                  </div>
                  <div style={{ fontWeight: "20px" }} class="card-body">
                    <h5>Description : </h5>
                    <ul>
                      <li>Developed e-commerce website using HTML, CSS,React and Bootstrap with a focuson responsive design</li>
                      <li>Implemented a user-friendly interface allowing customers to browse products and add them to a shopping cart</li>
                    </ul>
                    {/* <a style={{ textDecoration: "none", color: "#08ffff" }} href="https://e-commerce-iota-roan.vercel.app/"><h5>Vercel Deploy App<i class="bi bi-link-45deg"></i></h5></a> */}
                    <div style={{ textAlign: "center" }}><button style={{ padding: "8px 10px" }} onClick={() => { navigate("/projects/ecommerce-app") }}>View More</button></div>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-12 col-lg-12">
                <div class="card foodCard" data-aos="flip-left">
                  <div class="card-header">
                    <h3>Project Name : FreeHungeR </h3>
                  </div>
                  <div style={{ fontWeight: "20px" }} class="card-body">
                    <h5>Description : </h5>
                    <ul>
                      <li>Developed a food Website using React, providing users with a platform to browse restaurant and search a food item from restaurants, And them to a Food Cart</li>
                      <li>Implemented features such as restaurant listings,menu display and cart management.</li>
                    </ul>
                    {/* <a style={{ textDecoration: "none", color: "#08ffff" }} href="https://food-website-ten-henna.vercel.app/"><h5>Vercel Deploy App<i class="bi bi-link-45deg"></i></h5></a> */}
                    <div style={{ textAlign: "center" }}><button style={{ padding: "8px 10px" }} onClick={() => { navigate("/projects/food-app") }}>View More</button></div>
                  </div>
                </div>
              </div>

            </div>
          </div>



        </section>
      </div>


      <div className="row">

        <section id="contact" >
          <div class="container">
            <h1 class="text-center" style={{ marginTop: "55px" }}>Contact Details</h1>
            <div class="row" id="ContactRow">
              <div class="col-md-7">
                <h4>For Contact Me</h4>
                <form onSubmit={handleSubmit(handleSendUserContactData)}>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your Name"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <p className="text-danger">{errors.name.message}</p>}
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Your Email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address"
                        }
                      })}
                    />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}

                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Contact Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your number"
                      {...register("mobile", {
                        validate: (value) => {
                          if (!value) return true;
                          if (!/^\d{10}$/.test(value)) {
                            return "Enter valid 10-digit mobile number";
                          }
                          return true;
                        }
                      })}
                    />

                    {errors.mobile && (
                      <p className="text-danger">{errors.mobile.message}</p>
                    )}
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Message</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      {...register("message", {
                        required: "Message is required",
                        minLength: {
                          value: 5,
                          message: "Minimum 5 characters"
                        }
                      })}
                    />
                    {errors.message && <p className="text-danger">{errors.message.message}</p>}
                  </div>
                  <button disabled={isSendLoading} class="btn btn-primary" style={{ width: "120px" }}>
                    {isSendLoading ? (<><span class="spinner-border spinner-border-sm" aria-hidden="true"></span><span role="status">sending...</span></>) :
                      "Send"}
                  </button><br />
                </form>
              </div>
              <div class="col-md-5">
                <h4>My Contact Detils</h4>
                <hr />
                <div class="mt-5">
                  <div class="d-flex">
                    <i class="bi bi-geo-alt-fill"></i>
                    <p>Address:</p>

                  </div>
                  <hr />
                  <div class="d-flex">
                    <i class="bi bi-telephone-fill"></i>
                    <p>Contact:(+91)-7993810342</p>

                  </div>
                  <hr />
                  <div class="d-flex">
                    <i class="bi bi-envelope-fill"></i>
                    <p>Email ID:- ramanareddy.m0342@gmail.com</p>
                  </div>
                  <hr />
                  <div class="d-flex">
                    <i class="bi bi-browser-chrome"></i>
                    <p>My Portfolio:- https://my-portfolio-xi-two-63.vercel.app/</p>
                  </div>
                  <hr />
                  <div class="d-flex">
                    <i class="bi bi-linkedin"></i>
                    <p className="bi-linkedin-content">www.linkedin.com/in/ramanareddymaddi</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </section>



      </div>




    </div>

    {!isChatOpen && (
      <div className="chat-wrapper">
        <div className="chat-tooltip">Need help? Chat with me 👋</div>

        <div
          className="chat-float-btn pulse"
          onClick={() => {
            setIsChatOpen(true);

            const navbar = document.getElementById("navbarSupportedContent");
            if (navbar.classList.contains("show")) {
              navbar.classList.remove("show");
            }
          }}
        >
          💬
        </div>
      </div>
    )}

    {showHint && <div className="chat-tooltip show">Hi 👋 Need help?</div>}

    {isChatOpen && <UserChat setIsChatOpen={setIsChatOpen} />}

  </>)
}


export default Index