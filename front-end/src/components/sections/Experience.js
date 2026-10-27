export default function Experience() {
  return (
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
  );
}
