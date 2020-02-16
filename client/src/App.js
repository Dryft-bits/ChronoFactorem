import React, { Component } from "react";
import "./App.css";
import Search from "./components/Search";
import Timetable from "./components/TimeTable";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRoot: true,
      isPreview: false
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

    this.view = { ROOT: 0, PREVIEW: 1 };
  }
  sendTo(view) {
    if (view === this.view.ROOT) {
      this.setState(state => ({
        isPreview: false,
        isRoot: true
      }));
    }
    else if (view === this.view.PREVIEW) {
      this.setState(state => ({
        isPreview: true,
        isRoot: false
      }))
    }
  }
  render() {
    if (this.state.isPreview) {
      return (
        <>
          <div>
            <button type="Button" onClick={this.sendTo.bind(this, this.view.ROOT)}>Back</button>
          </div>
          <div>
            <Timetable />
          </div>
        </>
      );

    }
    else if (this.state.isRoot) {
      return (
        <>
          <div>
            <button type="Button" onClick={this.sendTo.bind(this, this.view.PREVIEW)}>View Preview</button>
          </div>
          <div className="App">
            <Search items={this.courses} />
          </div>
        </>

      );
    }
  }
}

export default App;
