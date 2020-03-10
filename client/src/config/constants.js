const prod = {
  urls: {
    googleAuth: "https://chronofactorem.herokuapp.com/api/auth/google"
  }
};

const dev = {
  urls: {
    googleAuth: "http://localhost:5000/api/auth/google"
  }
};

const configuration = {
  // Add common constants here
  ...(process.env.NODE_ENV === "development" ? dev : prod)
};

export default configuration;
