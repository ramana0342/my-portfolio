export default function Academics() {
  return (
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
  );
}
