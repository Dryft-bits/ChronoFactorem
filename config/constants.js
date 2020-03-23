const prod = {
  urls: {
    googleAuthCallback:
      "https://chronofactorem.herokuapp.com/api/auth/google/callback",
    homePage: "https://chronofactorem.herokuapp.com/Dashboard"
  }
};

const dev = {
  urls: {
    googleAuthCallback: "http://localhost:5000/api/auth/google/callback",
    homePage: "http://localhost:3000/checkloggedin"
  }
};

const configuration = {
  cookieKey: "ilovemytimetable",
  ...(process.env.NODE_ENV === "development" ? dev : prod)
};

module.exports = configuration;
