function ProjectVisual({ visual, label, showGrid }) {
  return (
    <div className={`project-visual${visual === "commerce" ? " project-visual-commerce" : ""}${visual === "food" ? " project-visual-food" : ""}`}>
      {(visual === "window" || showGrid) && <div className="project-visual-grid"></div>}
      {visual === "window" && <div className="project-visual-window"><span></span><span></span><span></span></div>}
      {visual === "commerce" && <div className="commerce-lines"><i></i><i></i><i></i></div>}
      {visual === "food" && <div className="food-orbit"></div>}
      <strong>{label}</strong>
    </div>
  );
}

export default function ProjectCard({ project, index, onViewProject }) {
  const isReversed = index % 2 === 1;
  const details = (
    <div className="project-details">
      <span className="project-type">{project.type}</span>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-tags">
        {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
      </div>
      <button className="project-link" onClick={() => onViewProject(project.route)}>
        View Project <span aria-hidden="true">&#8599;</span>
      </button>
    </div>
  );

  return (
    <article className={`project-feature${isReversed ? " project-feature--reversed" : ""}`} data-aos="fade-up">
      <ProjectVisual visual={project.visual} label={project.visualLabel} showGrid={project.visualGrid} />
      {details}
    </article>
  );
}
