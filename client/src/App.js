import React, {Component} from "react";
import "./App.css";
import Search from "./components/Search";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      isRoot: 1,
      isPreview: 0,
    }
    this.courses = [
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

  }
  render()
  {
    if(this.isPreview){

    }
    else if(this.state.isRoot)
    {
      return (
        <div className="App">
          <Search items={this.courses} />
        </div>
      );
    }
  }
}

export default App;
