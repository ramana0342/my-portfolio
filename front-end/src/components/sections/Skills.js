export default function Skills() {
  return (
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
  );
}
