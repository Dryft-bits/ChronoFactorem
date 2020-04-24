const prod = {
  urls: {
    googleAuth: "https://chronofactorem.herokuapp.com/api/auth/google",
    adminLogin: ""
  }
};

const dev = {
  urls: {
    googleAuth: "http://localhost:5000/api/auth/google",
    adminLogin: "http://localhost:3001"
  }
};

const configuration = {
  // Add common constants here
  ...(process.env.NODE_ENV === "development" ? dev : prod)
};

export default configuration;
