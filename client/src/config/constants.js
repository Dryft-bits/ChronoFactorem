const prod = {
  urls: {
    googleAuth: "https://chronofactorem.herokuapp.com/api/auth/google"
  }
};

const dev = {
  //   cookieKey: "ilovemytimetable",
  urls: {
    googleAuth: "http://localhost:5000/api/auth/google"
  }
};

const configuration = {
  ...(process.env.NODE_ENV === "development" ? dev : prod)
};

export default configuration;
