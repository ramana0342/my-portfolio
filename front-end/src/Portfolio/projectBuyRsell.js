import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProjectBuyRsell() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div class="card">
      <div class="card-header text-center">
        <h1>buyRsell</h1>
      </div>
      <div class="card-body">
        <h4>Overview:</h4>
        <p><span style={{ padding: "60px" }}></span>buyRsell is a personal full-stack marketplace project designed to connect customers and sellers. Sellers can list and manage products, while customers can browse available products. The project demonstrates full-stack development and API integration.</p>

        <h4 class="card-title">Technologies Used:</h4>
        <ul>
          <li><b>Front-End:</b> React.js</li>
          <li><b>Back-End:</b> Node.js and Express.js</li>
          <li><b>Database:</b> PostgreSQL</li>
        </ul>

        <div class="accordion accordion-flush" id="buyRsellAccordion">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#buyRsellWorkflows" aria-expanded="true" aria-controls="buyRsellWorkflows">
                <h4>Marketplace Workflows</h4>
              </button>
            </h2>
            <div id="buyRsellWorkflows" class="accordion-collapse collapse show" data-bs-parent="#buyRsellAccordion">
              <div class="accordion-body">
                <h6><b>Seller workflow</b></h6>
                <ul>
                  <li>Sellers can list and manage products in the marketplace.</li>
                </ul>
                <h6><b>Customer workflow</b></h6>
                <ul>
                  <li>Customers can browse available products.</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#buyRsellFrontend" aria-expanded="false" aria-controls="buyRsellFrontend">
                <h4>Frontend</h4>
              </button>
            </h2>
            <div id="buyRsellFrontend" class="accordion-collapse collapse" data-bs-parent="#buyRsellAccordion">
              <div class="accordion-body">
                <p>The user interface is built with React.js and presents the customer product browsing and seller product listing and management workflows.</p>
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#buyRsellBackend" aria-expanded="false" aria-controls="buyRsellBackend">
                <h4>Backend APIs and Database</h4>
              </button>
            </h2>
            <div id="buyRsellBackend" class="accordion-collapse collapse" data-bs-parent="#buyRsellAccordion">
              <div class="accordion-body">
                <p>Node.js and Express.js provide the backend APIs, with PostgreSQL used for database management. The frontend integrates with these APIs to support the marketplace workflows.</p>
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#buyRsellConclusion" aria-expanded="false" aria-controls="buyRsellConclusion">
                <h4>My Contribution and Project Summary</h4>
              </button>
            </h2>
            <div id="buyRsellConclusion" class="accordion-collapse collapse" data-bs-parent="#buyRsellAccordion">
              <div class="accordion-body">
                <p>I implemented the React.js frontend, connected it to backend APIs built with Node.js and Express.js, and integrated PostgreSQL for data management. The work brings together seller product listing and management with customer product browsing in a personal portfolio project.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center">
          <a href="https://buyrsell.vercel.app" target="_blank" rel="noreferrer">Live Demo</a>
        </div>
        <div class="text-center">
          <button style={{ margin: "5px" }} onClick={() => navigate(-1)} class="btn btn-primary">Go Back</button>
        </div>
      </div>
    </div>
  );
}

export default ProjectBuyRsell;
