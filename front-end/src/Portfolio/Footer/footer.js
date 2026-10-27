import {
    FaGithub,
    FaLinkedinIn,
    FaEnvelope,
    FaArrowUp,
    FaUserCog
} from "react-icons/fa";

import "./footer.scss";


const Footer = ({
    adminView,
    setAdminView
}) => {


    const handleAdminToggle = () => {

        const newValue = !adminView;

        setAdminView(newValue);

        localStorage.setItem(
            "portfolio_admin_view",
            JSON.stringify(newValue)
        );

    };


    const scrollToTop = () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    return (

        <footer className="portfolio-footer">

            <div className="footer-container">


                {/* =========================
            FOOTER MAIN
        ========================== */}

                <div className="footer-main">


                    {/* =========================
              IDENTITY
          ========================== */}

                    <div className="footer-identity">

                        <h3>
                            Ramana<span>.</span>
                        </h3>

                        <p>
                            Software Developer
                        </p>

                    </div>


                    {/* =========================
              SOCIAL LINKS
          ========================== */}

                    <div className="footer-socials">

                        <a
                            href="https://github.com/ramana0342"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                        >
                            <FaGithub />
                            <span>GitHub</span>
                        </a>


                        <a
                            href="https://linkedin.com/in/ramanareddymaddi"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedinIn />
                            <span>LinkedIn</span>
                        </a>


                        <a
                            href="mailto:ramanareddy.m0342@gmail.com"
                            aria-label="Email"
                        >
                            <FaEnvelope />
                            <span>Email</span>
                        </a>

                    </div>


                    {/* =========================
              ADMIN VIEW
          ========================== */}

                    {/* =========================
    ADMIN VIEW
========================== */}

                    <div className="footer-admin">

                        <div className="admin-card">

                            <div className="admin-card-header">

                                <div className="admin-card-title">

                                    <FaUserCog />

                                    <span>
                                        Admin View
                                    </span>

                                </div>

                                <span className="admin-card-status">
                                    {adminView ? "ON" : "OFF"}
                                </span>

                            </div>


                            <p className="admin-card-description">
                                Show admin navigation
                            </p>


                            <div className="admin-card-action">

                                <span>
                                    Admin menu
                                </span>

                                <button
                                    type="button"
                                    className={`admin-switch ${adminView ? "active" : ""
                                        }`}
                                    onClick={handleAdminToggle}
                                    aria-label="Toggle Admin View"
                                    aria-pressed={adminView}
                                >

                                    <span className="admin-switch-slider"></span>

                                </button>

                            </div>

                        </div>


                        <button
                            type="button"
                            className="footer-top-button"
                            onClick={scrollToTop}
                            aria-label="Back to top"
                        >
                            <FaArrowUp />
                        </button>

                    </div>


                </div>


                {/* =========================
            FOOTER BOTTOM
        ========================== */}

                <div className="footer-bottom">


                    <span>
                        © {new Date().getFullYear()} Ramana Reddy
                    </span>


                    <span className="footer-location">
                        India
                    </span>


                    <span>
                        Built with React.js
                    </span>


                </div>


            </div>

        </footer>

    );

};


export default Footer;
