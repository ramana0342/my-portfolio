import { useEffect } from "react";
import Typed from "typed.js";

export default function Home() {
  useEffect(() => {
    const typed = new Typed(".text", {
      strings: ["React Developer", "Front-end Developer", "Back-end Developer", "Full Stack Developer"],
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 1200,
      loop: true,
    });
    return () => typed.destroy();
  }, []);

  return (
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
  );
}
