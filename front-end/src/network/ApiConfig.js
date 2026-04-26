const portfolioBaseURL = 'my-portfolio/api'

const getBaseURL = () => {
  const host = window.location.hostname;

  if (host === "localhost" || host === "127.0.0.1") {
    return `http://localhost:5000/${portfolioBaseURL}`;
  }

  return `https://ramana-portfolio-api.onrender.com/${portfolioBaseURL}`;

};

export default getBaseURL;

export const getSocketURL = () => {
  const host = window.location.hostname;

  if (host === "localhost" || host === "127.0.0.1") {
    return "http://localhost:5000";
  }

  return "https://ramana-portfolio-api.onrender.com";
};