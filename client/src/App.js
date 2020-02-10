import React from "react";
import "./App.css";
import Search from "./components/Search";
import Catalog from "./components/Catalog";
import "./styles/catalog.css";

function App() {
  const courses = [
    {
      code: "CS F211",
      name: "DSA",
      lecture: [
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" },
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" }
      ],
      tutorial: [
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" },
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" }
      ],
      lab: [
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" },
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" }
      ],
      midsem: "3 Mar",
      compre: "4 May"
    },
    {
      code: "CS F212",
      name: "OOPS",
      lecture: [
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" },
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" }
      ],
      tutorial: [
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" },
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" }
      ],
      lab: [
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" },
        { id: 1, teacher: "abc", hours: " 6 7", room: "ht", days: "hk" }
      ],
      midsem: "3 Mar",
      compre: "4 May"
    }
  ];

  return (
    <div className="App">
      <Search items={courses} />
      <Catalog courses={courses} />
    </div>
  );
}

export default App;
