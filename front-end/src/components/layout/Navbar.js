import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAdminTokenData } from "../../utils/adminToken";

const sections = [
  ["home", "Home"],
  ["about", "About"],
  ["experience", "Experience"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["services", "Services"],
  // ["academics", "Academics"],
  ["contact", "Contact"],
];

export default function Navbar({ adminView, count }) {
  const [activeSection, setActiveSection] = useState("home");
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    const observedSections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver((entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visibleSections.length > 0) setActiveSection(visibleSections[0].target.id);
    }, {
      root: null,
      rootMargin: "-100px 0px -55% 0px",
      threshold: [0.1, 0.25, 0.5],
    });

    observedSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeNavbar = () => setIsNavbarOpen(false);

  return (
    <div className="row user-navbar-container">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#home">
            <span className="brand-monogram" aria-hidden="true">RR</span>
            <span className="brand-name">Ramana<span className="brand-dot">.</span></span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarSupportedContent"
            aria-expanded={isNavbarOpen}
            aria-label={isNavbarOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsNavbarOpen((open) => !open)}
          >
            <span className="navbar-toggler-icon" aria-hidden="true"></span>
          </button>
          <div className={`collapse navbar-collapse${isNavbarOpen ? " show" : ""}`} id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-2">
              {sections.map(([id, label]) => (
                <li className="nav-item" key={id}>
                  <a className={`nav-link ${activeSection === id ? "active" : ""}`} href={`#${id}`} onClick={closeNavbar}>{label}</a>
                </li>
              ))}
              {adminView && (
                <li className="nav-item">
                  <NavLink to={getAdminTokenData() ? "/admin-panel/user-messages" : "/admin-login"} className="nav-link">
                    Admin {getAdminTokenData() && <sup>{count || 0}</sup>}
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
