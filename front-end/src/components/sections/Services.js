import { FiCode, FiServer, FiDatabase, FiLayers, FiSmartphone } from "react-icons/fi";

export default function Services() {
  return (
    <section id="services" className="portfolio-section services-section">
          <div className="section-shell">
            <div className="section-heading section-heading-wide" data-aos="fade-up">
              <span className="section-kicker">WHAT I CAN BUILD</span>
              <h2>Services</h2>
              <p>Areas I focus on when building thoughtful, reliable web experiences.</p>
            </div>
            <div className="services-grid">
              <article className="service-card" data-aos="fade-up"><FiCode aria-hidden="true" /><h3>Frontend Development</h3><p>Responsive, user-friendly interfaces built with React.js, JavaScript, HTML and CSS.</p></article>
              <article className="service-card" data-aos="fade-up"><FiServer aria-hidden="true" /><h3>Backend Development</h3><p>Server-side functionality and REST APIs using Node.js and Express.js.</p></article>
              <article className="service-card" data-aos="fade-up"><FiDatabase aria-hidden="true" /><h3>Database Integration</h3><p>Relational data modeling and application integration with PostgreSQL.</p></article>
              <article className="service-card" data-aos="fade-up"><FiLayers aria-hidden="true" /><h3>Full-Stack Web Development</h3><p>End-to-end web applications connecting interfaces, APIs and databases.</p></article>
              <article className="service-card" data-aos="fade-up"><FiSmartphone aria-hidden="true" /><h3>Responsive Web Design</h3><p>Layouts and interactions tailored to desktop, tablet and mobile screens.</p></article>
            </div>
          </div>
        </section>
  );
}
