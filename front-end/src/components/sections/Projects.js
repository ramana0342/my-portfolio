import { useNavigate } from "react-router-dom";
import projects from "../../data/projects";
import ProjectCard from "../projects/ProjectCard";

export default function Projects() {
  const navigate = useNavigate();

  return (
    <section id="projects" className="portfolio-section projects-section">
      <div className="section-shell">
        <div className="section-heading section-heading-wide" data-aos="fade-up">
          <span className="section-kicker">SELECTED WORK</span>
          <h2>Projects</h2>
          <p>Real applications where I combined interface development, APIs, authentication and data management.</p>
        </div>
        <div className="project-showcase">
          {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onViewProject={navigate} />)}
        </div>
      </div>
    </section>
  );
}
