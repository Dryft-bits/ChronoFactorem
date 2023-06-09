const prod = {
  urls: {
    googleAuthCallback:
      "https://chronofactorem.up.railway.app/api/auth/google/callback",
    homePage: "https://chronofactorem.up.railway.app/checkloggedin",
  },
}

const dev = {
  urls: {
    googleAuthCallback: "http://localhost:5000/api/auth/google/callback",
    homePage: "http://localhost:3000/checkloggedin",
  },
}

const configuration = {
  cookieKey: "ilovemytimetable",
  ...(process.env.NODE_ENV === "production" ? prod : dev),
}

module.exports = configuration
