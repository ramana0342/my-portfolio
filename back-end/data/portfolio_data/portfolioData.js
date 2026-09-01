import about from "./about.js";
import skills from "./skills.js";
import projects from "./projects.js";
import experience from "./experience.js";
import education from "./education.js";
import contact from "./contact.js";

const portfolioData = {
  personal: {
    name: "Ramana Reddy",
    professionalTitle: "Full Stack Developer",
    currentSpecialization: "Frontend Development",
    location: "Hyderabad, Telangana, India",
  },

  about,

  skills,

  experience,

  education,

  projects,

  contact,

  additionalTechnicalKnowledge: {
    frontend: [
      "React.js",
      "JavaScript",
      "HTML",
      "CSS",
      "Bootstrap",
      "SCSS",
    ],

    backend: [
      "Node.js",
      "Express.js",
      "REST APIs",
    ],

    databases: [
      "PostgreSQL",
      "MongoDB",
    ],

    authentication: [
      "JWT",
    ],

    devopsAndCloud: [
      "Docker",
      "Jenkins",
      "AWS EC2",
      "Linux",
      "Git",
      "CI/CD",
    ],

    ai: [
      "Google Gemini",
      "Google GenAI SDK",
    ],

    realtime: [
      "Socket.IO",
    ],
  },

  portfolioFeatures: [
    "AI Portfolio Assistant",
    "Visitor Contact Form",
    "Admin Portal",
    "JWT Authentication",
    "Real-time Visitor-Admin Chat",
    "REST API Integration",
    "PostgreSQL Database",
  ],

  careerInformation: {
    interestedRoles: [
      "Frontend Developer",
      "React Developer",
      "Full Stack Developer",
      "Node.js Developer",
      "Junior DevOps / Cloud Automation Engineer",
    ],

    interests: [
      "React.js",
      "Node.js",
      "Full Stack Development",
      "Cloud Deployment",
      "DevOps",
      "AI-powered applications",
    ],
  },
};

export default portfolioData;