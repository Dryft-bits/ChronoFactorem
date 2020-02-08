import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import Catalog from "./components/Catalog";

function App() {
  const courses = [
    {
      code: "CS F211",
      name: "absdkvndsinvsd",
      days: "M W F",
      hours: "2 3",
      midsem: "3 Mar",
      compre: "4 May"
    },
    {
      code: "CS F213",
      name: "fdsgfdsvdsfvs",
      days: "T Th S",
      hours: "4",
      midsem: "4 Mar",
      compre: "2 May"
    }
  ];
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Catalog courses={courses} />
    </div>
  );
}

export default App;
