import "./index.scss";
import { useState, useEffect, useContext, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Typed from 'typed.js';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { store } from "./mainHeader";
import { toast } from "react-toastify";
import { getUserContactMessagesCount, postUserContact } from "../network/portfolioApiService/portfolioApiService";
import { useForm } from "react-hook-form";
import { getAdminTokenData } from "../utils/adminToken";
import UserChat from "./chats/userChat";
import AIAssistant from "./AIAssistant/AIAssistant";
import { MdSupportAgent } from "react-icons/md";

const Index = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const [count, setCount] = useContext(store)
  const [isSendLoading, setIsSendLoading] = useState(false)
  const [supportMode, setSupportMode] = useState(null);
  const firstOpenRef = useRef(true);
  const [activeSection, setActiveSection] =
    useState("home");

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
      strings: [
        "React Developer",
        "Front-end Developer",
        "Back-end Developer",
        "Full Stack Developer"
      ],

      typeSpeed: 50,

      backSpeed: 25,

      backDelay: 1200,

      loop: true
    };

    const typed = new Typed('.text', options);
    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {

    const sections =
      document.querySelectorAll("section[id]");


    const observer =
      new IntersectionObserver(
        (entries) => {

          const visibleSections =
            entries
              .filter(
                (entry) =>
                  entry.isIntersecting
              )
              .sort(
                (a, b) =>
                  b.intersectionRatio -
                  a.intersectionRatio
              );


          if (
            visibleSections.length > 0
          ) {

            setActiveSection(
              visibleSections[0]
                .target
                .id
            );
          }
        },
        {
          root: null,

          rootMargin:
            "-100px 0px -55% 0px",

          threshold: [
            0.1,
            0.25,
            0.5
          ]
        }
      );


    sections.forEach((section) => {
      observer.observe(section);
    });


    return () => {

      sections.forEach((section) => {
        observer.unobserve(section);
      });

    };

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



  const closeNavbar = () => {
    const navbar = document.getElementById("navbarSupportedContent");
    if (navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };

  return (<>

    <div className="container-fluid">
      <div className="row user-navbar-container">
        <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Portfolio</a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-1">

                <li className="nav-item">
                  <a
                    className={`nav-link ${activeSection === "home"
                      ? "active"
                      : ""
                      }`}
                    href="#home"
                    onClick={closeNavbar}
                  >
                    Home
                  </a>
                </li>


                <li className="nav-item">
                  <a
                    className={`nav-link ${activeSection === "about"
                      ? "active"
                      : ""
                      }`}
                    href="#about"
                    onClick={closeNavbar}
                  >
                    About
                  </a>
                </li>


                <li className="nav-item">
                  <a
                    className={`nav-link ${activeSection === "experience"
                      ? "active"
                      : ""
                      }`}
                    href="#experience"
                    onClick={closeNavbar}
                  >
                    Experience
                  </a>
                </li>


                <li className="nav-item">
                  <a
                    className={`nav-link ${activeSection === "academics"
                      ? "active"
                      : ""
                      }`}
                    href="#academics"
                    onClick={closeNavbar}
                  >
                    Academics
                  </a>
                </li>


                <li className="nav-item">
                  <a
                    className={`nav-link ${activeSection === "skills"
                      ? "active"
                      : ""
                      }`}
                    href="#skills"
                    onClick={closeNavbar}
                  >
                    Skills
                  </a>
                </li>


                <li className="nav-item">
                  <a
                    className={`nav-link ${activeSection === "projects"
                      ? "active"
                      : ""
                      }`}
                    href="#projects"
                    onClick={closeNavbar}
                  >
                    Projects
                  </a>
                </li>


                <li className="nav-item">
                  <a
                    className={`nav-link ${activeSection === "contact"
                      ? "active"
                      : ""
                      }`}
                    href="#contact"
                    onClick={closeNavbar}
                  >
                    Contact
                  </a>
                </li>


                <li className="nav-item">
                  <NavLink
                    to={
                      getAdminTokenData()
                        ? "/admin-panel/user-messages"
                        : "/admin-login"
                    }
                    className="nav-link"
                  >
                    Admin

                    {getAdminTokenData() && (
                      <sup>
                        {count || 0}
                      </sup>
                    )}
                  </NavLink>
                </li>

              </ul>
            </div>
          </div>
        </nav>

      </div>



      <div className="row">
        <section id="home">
          <div className="hero-shell">

            {/* =========================
        HERO CONTENT
    ========================== */}
            <div className="hero-content">

              <div className="hero-eyebrow">
                <span className="hero-status-dot"></span>
                Available for new opportunities
              </div>

              <p className="hero-kicker">
                HELLO, I'M
              </p>

              <h1>
                Ramana<span>.</span>
              </h1>

              <h2>
                I'm a <span className="text"></span>
                <br />
                who builds modern web applications.
              </h2>

              <p className="hero-description">
                I have professional experience as a Frontend Developer and
                hands-on experience building full-stack web applications
                using React.js, Node.js, Express.js, PostgreSQL, Docker,
                CI/CD and AWS.
              </p>

              <div className="home-buttons">
                <a
                  href="#projects"
                  className="btn-primary-custom"
                >
                  Explore My Work
                  <span>↗</span>
                </a>

                <a
                  href="#contact"
                  className="btn-outline-custom"
                >
                  Let's Talk
                </a>
              </div>

              <div className="hero-meta">

                <div>
                  <strong>React.js</strong>
                  <span>Frontend</span>
                </div>

                <div>
                  <strong>Node.js</strong>
                  <span>Backend</span>
                </div>

                <div>
                  <strong>PostgreSQL</strong>
                  <span>Database</span>
                </div>

              </div>

            </div>


            {/* =========================
        HERO TECHNICAL PROFILE
    ========================== */}
            <div className="hero-visual">

              <div className="hero-grid"></div>

              <div className="hero-code-card">

                <div className="hero-code-header">

                  <div className="hero-code-title">
                    <span className="hero-window-dot"></span>
                    <span className="hero-window-dot"></span>
                    <span className="hero-window-dot"></span>

                    <span className="hero-code-file">
                      developer_profile
                    </span>
                  </div>

                  <span className="hero-code-status">
                    <span className="hero-code-dot"></span>
                    available
                  </span>

                </div>


                <div className="hero-code-content">

                  {/* NAME */}
                  <div className="hero-code-section hero-code-name">

                    <div className="hero-code-label">
                      <span className="hero-code-icon">&gt;</span>
                      <span>name</span>
                    </div>

                    <div className="hero-code-value">
                      "Ramana"
                    </div>

                  </div>


                  {/* FRONTEND */}
                  <div className="hero-code-section">

                    <div className="hero-code-label">
                      <span className="hero-code-icon">&gt;</span>
                      <span>frontend</span>
                    </div>

                    <div className="hero-code-items">
                      <span>React.js</span>
                      <span>JavaScript</span>
                      <span>HTML</span>
                      <span>CSS</span>
                      <span>Bootstrap</span>
                    </div>

                  </div>


                  {/* BACKEND */}
                  <div className="hero-code-section">

                    <div className="hero-code-label">
                      <span className="hero-code-icon">&gt;</span>
                      <span>backend</span>
                    </div>

                    <div className="hero-code-items">
                      <span>Node.js</span>
                      <span>Express.js</span>
                      <span>REST APIs</span>
                    </div>

                  </div>


                  {/* DATABASE */}
                  <div className="hero-code-section">

                    <div className="hero-code-label">
                      <span className="hero-code-icon">&gt;</span>
                      <span>database</span>
                    </div>

                    <div className="hero-code-items">
                      <span>PostgreSQL</span>
                      <span>MongoDB</span>
                      <span>Supabase</span>
                    </div>

                  </div>


                  {/* DEVOPS */}
                  <div className="hero-code-section">

                    <div className="hero-code-label">
                      <span className="hero-code-icon">&gt;</span>
                      <span>devops &amp; tools</span>
                    </div>

                    <div className="hero-code-items">
                      <span>Docker</span>
                      <span>Jenkins</span>
                      <span>Git</span>
                      <span>AWS</span>
                      <span>Linux</span>
                    </div>

                  </div>


                  {/* ADDITIONAL */}
                  <div className="hero-code-section hero-code-additional">

                    <div className="hero-code-label">
                      <span className="hero-code-icon">&gt;</span>
                      <span>additional</span>
                    </div>

                    <div className="hero-code-learning">
                      <span className="hero-learning-dot"></span>

                      <span>
                        Always Learning
                      </span>
                    </div>

                  </div>

                </div>


                {/* FOOTER */}
                <div className="hero-code-footer">

                  <span>01</span>

                  <span>
                    software_developer
                  </span>

                  <span>
                    2026
                  </span>

                </div>

              </div>


              <div className="hero-orbit hero-orbit-one"></div>

              <div className="hero-orbit hero-orbit-two"></div>

              <span className="hero-code-mark">
                &lt;/&gt;
              </span>

            </div>

          </div>
        </section>
      </div>

      <div className="row">
        <section id="about" className="about-section">
          <div className="about-container">

            <div className="about-main">

              {/* LEFT */}
              <div className="about-label">

                <span className="about-number">
                  ABOUT
                </span>

                <span className="about-line"></span>

                <h2>
                  About
                  <br />
                  Me.
                </h2>

              </div>


              {/* RIGHT */}
              <div className="about-content">

                <span className="about-kicker">
                  WHO I AM
                </span>

                <h3>
                  Frontend Developer
                  <span> & Web Application Development</span>
                </h3>

                <div className="about-description">

                  <p>
                    I'm <strong>Ramana</strong>, a Frontend Developer with
                    professional experience at <strong>Promilo, Bengaluru</strong>,
                    where I worked on production web applications using
                    <strong> React.js, JavaScript, HTML and CSS</strong>. My work
                    focused on building responsive, reusable interfaces and
                    integrating frontend applications with backend APIs.
                  </p>

                  <p>
                    Alongside my professional experience, I have built full-stack
                    applications using <strong>React.js, Node.js, Express.js and
                      PostgreSQL</strong>, working with authentication, REST APIs,
                    database operations and real-time communication.
                  </p>

                  <p>
                    I also have hands-on experience with <strong>Docker, Jenkins,
                      Git, Linux and AWS</strong>, giving me practical exposure to
                    application deployment and development workflows beyond
                    frontend implementation.
                  </p>

                </div>

                <div className="about-actions">

                  <a
                    href="#contact"
                    className="about-btn-primary"
                  >
                    Let's Work Together
                    <span>↗</span>
                  </a>

                  <a
                    href="/documents/resume.pdf"
                    className="about-btn-secondary"
                    download="Ramana_Reddy_Resume.pdf"
                  >
                    Download CV
                  </a>

                </div>

              </div>

            </div>


            {/* INFORMATION STRIP */}


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

                  <span>Feb 2025 - May 2026</span>

                  <p>
                    Developed and maintained product modules including Application Form,
                    Campus Visit, Prospect Grouping, and Intent Engine across User,
                    Advertiser, and Admin platforms using React.js.
                  </p>

                  <p>
                    Built reusable and scalable UI components, integrated REST APIs,
                    and improved frontend data flow across applications. Implemented
                    non-blocking analytics event tracking to monitor user interactions
                    without affecting application performance.
                  </p>

                  <p>
                    Optimized React component rendering by minimizing unnecessary
                    re-renders, resolved frontend issues to improve application
                    stability, and collaborated with cross-functional teams using
                    Azure DevOps (VSTS).
                  </p>

                  <div className="exp-tags">
                    <span>React.js</span>
                    <span>JavaScript</span>
                    <span>TypeScript</span>
                    <span>SCSS</span>
                    <span>Bootstrap</span>
                    <span>REST APIs</span>
                    <span>Performance Optimization</span>
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
        <section id="academics" className="portfolio-section academics-section">
          <div className="section-shell">
            <div className="section-heading" data-aos="fade-up">
              <span className="section-kicker">EDUCATION</span>
              <h2>Academic Journey</h2>
              <p>My academic foundation in computer science and mathematics.</p>
            </div>

            <div className="academic-list">
              <article className="academic-item" data-aos="fade-up">
                <div className="academic-year">2023</div>
                <div className="academic-marker" aria-hidden="true"></div>
                <div className="academic-content">
                  <span className="academic-level">POST GRADUATION</span>
                  <h3>Master of Computer Applications</h3>
                  <p className="academic-institute">Aurora's Post Graduate College</p>
                  <div className="academic-meta"><span>MCA</span><span>76%</span><span>November 2023</span></div>
                </div>
              </article>

              <article className="academic-item" data-aos="fade-up">
                <div className="academic-year">2021</div>
                <div className="academic-marker" aria-hidden="true"></div>
                <div className="academic-content">
                  <span className="academic-level">UNDER GRADUATION</span>
                  <h3>Bachelor of Science</h3>
                  <p className="academic-institute">University Post Graduate College (OU)</p>
                  <div className="academic-meta"><span>MPCs</span><span>87%</span><span>November 2021</span></div>
                </div>
              </article>

              <article className="academic-item" data-aos="fade-up">
                <div className="academic-year">2018</div>
                <div className="academic-marker" aria-hidden="true"></div>
                <div className="academic-content">
                  <span className="academic-level">INTERMEDIATE</span>
                  <h3>Intermediate</h3>
                  <p className="academic-institute">Krishnaveni Cooperative Junior College</p>
                  <div className="academic-meta"><span>MPC</span><span>95.90%</span><span>March 2018</span></div>
                </div>
              </article>

              <article className="academic-item" data-aos="fade-up">
                <div className="academic-year">2016</div>
                <div className="academic-marker" aria-hidden="true"></div>
                <div className="academic-content">
                  <span className="academic-level">SECONDARY SCHOOL</span>
                  <h3>Secondary School Certificate</h3>
                  <p className="academic-institute">Z P S School, Kamanchikal</p>
                  <div className="academic-meta"><span>SSC</span><span>82%</span><span>March 2016</span></div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>

      <div className="row">
        <section id="skills" className="portfolio-section skills-section">
          <div className="section-shell">
            <div className="section-heading" data-aos="fade-up">
              <span className="section-kicker">TECH STACK</span>
              <h2>Skills &amp; Technologies</h2>
              <p>Technologies I use to design, build, connect and deploy web applications.</p>
            </div>

            <div className="skills-layout">
              <div className="skills-intro" data-aos="fade-right">
                <span className="skills-number">01</span>
                <h3>Building beyond the interface.</h3>
                <p>I work across frontend development and backend integration, with hands-on experience building full-stack applications and deployment workflows.</p>
                <div className="skills-highlight">
                  <strong>Core focus</strong>
                  <span>React.js · JavaScript · Node.js · Express.js · PostgreSQL</span>
                </div>
              </div>

              <div className="skills-groups">
                <div className="skill-group" data-aos="fade-up">
                  <div className="skill-group-heading"><span>01</span><h3>Frontend</h3></div>
                  <div className="skill-tags">
                    <span>React.js</span><span>JavaScript</span><span>HTML5</span><span>CSS3</span><span>Bootstrap</span>
                  </div>
                </div>

                <div className="skill-group" data-aos="fade-up">
                  <div className="skill-group-heading"><span>02</span><h3>Backend</h3></div>
                  <div className="skill-tags">
                    <span>Node.js</span><span>Express.js</span><span>REST APIs</span><span>JWT</span><span>Socket.IO</span>
                  </div>
                </div>

                <div className="skill-group" data-aos="fade-up">
                  <div className="skill-group-heading"><span>03</span><h3>Database</h3></div>
                  <div className="skill-tags">
                    <span>PostgreSQL</span><span>MongoDB</span><span>Supabase</span>
                  </div>
                </div>

                <div className="skill-group" data-aos="fade-up">
                  <div className="skill-group-heading"><span>04</span><h3>Tools &amp; DevOps</h3></div>
                  <div className="skill-tags">
                    <span>Git</span><span>Docker</span><span>Jenkins</span><span>AWS</span><span>Linux</span>
                  </div>
                </div>

                <div className="skill-group skill-group-muted" data-aos="fade-up">
                  <div className="skill-group-heading"><span>05</span><h3>Additional</h3></div>
                  <div className="skill-tags"><span>Core Java · Self Learning</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="row">
        <section id="projects" className="portfolio-section projects-section">
          <div className="section-shell">
            <div className="section-heading section-heading-wide" data-aos="fade-up">
              <span className="section-kicker">SELECTED WORK</span>
              <h2>Projects</h2>
              <p>Real applications where I combined interface development, APIs, authentication and data management.</p>
            </div>

            <div className="project-showcase">
              <article className="project-feature project-feature-primary" data-aos="fade-up">
                <div className="project-visual">
                  {/* <span className="project-index">01</span> */}
                  <div className="project-visual-grid"></div>
                  <div className="project-visual-window"><span></span><span></span><span></span></div>
                  <strong>TODO</strong>
                </div>
                <div className="project-details">
                  <span className="project-type">FULL STACK APPLICATION</span>
                  <h3>TODO Task Management</h3>
                  <p>A task management application with authentication, task CRUD operations and a React interface connected to a Node.js backend.</p>
                  <div className="project-tags"><span>React</span><span>Node.js</span><span>MongoDB</span><span>JWT</span></div>
                  <button className="project-link" onClick={() => navigate("/projects/task-management")}>View Project <span>↗</span></button>
                </div>
              </article>

              <article className="project-feature project-feature-secondary" data-aos="fade-up">
                <div className="project-details">
                  <span className="project-type">E-COMMERCE APPLICATION</span>
                  <h3>shopReaseR</h3>
                  <p>A responsive shopping experience focused on product discovery, cart interactions and a clean customer-facing interface.</p>
                  <div className="project-tags"><span>React</span><span>JavaScript</span><span>Bootstrap</span><span>CSS</span></div>
                  <button className="project-link" onClick={() => navigate("/projects/ecommerce-app")}>View Project <span>↗</span></button>
                </div>
                <div className="project-visual project-visual-commerce">
                  {/* <span className="project-index">02</span> */}
                  <div className="commerce-lines"><i></i><i></i><i></i></div>
                  <strong>SHOP</strong>
                </div>
              </article>

              <article className="project-feature project-feature-tertiary" data-aos="fade-up">
                <div className="project-visual project-visual-food">
                  {/* <span className="project-index">03</span> */}
                  <div className="food-orbit"></div>
                  <strong>FOOD</strong>
                </div>
                <div className="project-details">
                  <span className="project-type">FOOD DISCOVERY PLATFORM</span>
                  <h3>FreeHungeR</h3>
                  <p>A React-based food platform for browsing restaurants, discovering menu items and managing a food cart.</p>
                  <div className="project-tags"><span>React</span><span>Restaurant Listing</span><span>Cart</span></div>
                  <button className="project-link" onClick={() => navigate("/projects/food-app")}>View Project <span>↗</span></button>
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>

      <div className="row">

        <section id="contact" className="portfolio-section contact-section">
          <div className="section-shell">
            <div className="section-heading section-heading-wide" data-aos="fade-up">
              <span className="section-kicker">GET IN TOUCH</span>
              <h2>Let's Build Something.</h2>
              <p>Have a project in mind or want to discuss an opportunity? Send me a message and I'll get back to you.</p>
            </div>
            <div className="row" id="ContactRow">
              <div className="col-md-7 contact-form-panel" data-aos="fade-right">
                <span className="contact-panel-label">SEND A MESSAGE</span>
                <h3>Start a conversation.</h3>
                <form onSubmit={handleSubmit(handleSendUserContactData)}>
                  <div className="mb-3">
                    <label htmlFor="contact-name" className="form-label">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      className="form-control"
                      placeholder="Enter your Name"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <p className="text-danger">{errors.name.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contact-email" className="form-label">Email</label>
                    <input
                      id="contact-email"
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
                  <div className="mb-3">
                    <label htmlFor="contact-mobile" className="form-label">Contact Number <span>Optional</span></label>
                    <input
                      id="contact-mobile"
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
                  <div className="mb-3">
                    <label htmlFor="contact-message" className="form-label">Message</label>
                    <textarea
                      id="contact-message"
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
                  <button type="submit" disabled={isSendLoading} className="contact-submit">
                    {isSendLoading ? (<><span className="spinner-border spinner-border-sm" aria-hidden="true"></span><span role="status">Sending...</span></>) : <>Send Message <span>&rarr;</span></>}
                  </button>
                </form>
              </div>
              <div className="col-md-5 contact-details-panel" data-aos="fade-left">
                <span className="contact-panel-label">CONTACT DETAILS</span>
                <h3>Let's connect.</h3>
                <p className="contact-intro">I'm always open to talking about frontend development, collaborative work and new opportunities.</p>
                <div className="contact-details-list">
                  <div className="contact-detail"><i className="bi bi-telephone-fill"></i><div><span>PHONE</span><p>(+91) 7993810342</p></div></div>
                  <div className="contact-detail"><i className="bi bi-envelope-fill"></i><div><span>EMAIL</span><p>ramanareddy.m0342@gmail.com</p></div></div>
                  <div className="contact-detail"><i className="bi bi-browser-chrome"></i><div><span>PORTFOLIO</span><p>https://ramana-portfolio-eight.vercel.app</p></div></div>
                  <div className="contact-detail"><i className="bi bi-linkedin"></i><div><span>LINKEDIN</span><p className="bi-linkedin-content">linkedin.com/in/ramanareddymaddi</p></div></div>
                </div>
              </div>
            </div>
          </div>

        </section>



      </div>




    </div>



    {supportMode === "menu" && (
      <div className="support-wrapper">
        <div className="support-menu">

          <div className="support-header">
            <div>
              <h5>How can I help?</h5>
              <small>Select an option</small>
            </div>

            <button
              className="support-close"
              onClick={() => setSupportMode(null)}
            >
              ✕
            </button>
          </div>

          <div
            className="support-item"
            onClick={() => setSupportMode("ai")}
          >
            <div className="support-icon ai">
              🤖
            </div>

            <div className="support-content">
              <h6>AI Assistant</h6>
              <p>Ask about my skills, projects & experience</p>
            </div>

            <span>›</span>
          </div>

          <div
            className="support-item"
            onClick={() => setSupportMode("chat")}
          >
            <div className="support-icon chat">
              💬
            </div>

            <div className="support-content">
              <h6>Live Chat</h6>
              <p>Chat directly with Ramana</p>
            </div>

            <span>›</span>
          </div>

        </div>
      </div>
    )}



    {!supportMode && (

      <div className="chat-wrapper">

        <div className="chat-attention">
          <span>👋</span>
          Need help?
        </div>

        <div
          className="chat-float-btn"
          onClick={() => {

            setSupportMode(prev =>
              prev === "menu" ? null : "menu"
            );

            const navbar =
              document.getElementById("navbarSupportedContent");

            if (navbar?.classList.contains("show")) {
              navbar.classList.remove("show");
            }
          }}
        >

          <span className="chat-glow"></span>

          <MdSupportAgent size={32} />

          <span className="chat-notification">!</span>

        </div>

      </div>

    )}

    {supportMode === "chat" && (
      <UserChat
        setIsChatOpen={() => setSupportMode(null)}
      />
    )}

    {supportMode === "ai" && (
      <AIAssistant
        onClose={() => setSupportMode(null)}
      />
    )}

  </>)
}


export default Index
