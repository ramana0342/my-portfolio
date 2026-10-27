export default function About() {
  return (
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
  );
}
