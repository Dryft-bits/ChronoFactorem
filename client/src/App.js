import React, {Component} from "react";
import "./App.css";
import Search from "./components/Search";
import Timetable from "./components/TimeTable";


class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
<<<<<<< HEAD
      isRoot: 1,
      isPreview: 0
=======
      isRoot: true,
      isPreview: false
>>>>>>> feature

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
<<<<<<< HEAD
      this.sendPrevOrBack = this.sendPrevOrBack.bind(this);

  }
  sendPrevOrBack()
  {
    this.setState(state => ({
      isPreview: !state.isPreview
    }));
    this.setState(state =>({
      isRoot: !state.isRoot
    }));
=======
      
      this.view = {ROOT: 0, PREVIEW: 1};
  }
  sendTo(view)
  {
    if(view === this.view.ROOT){
    this.setState(state => ({
      isPreview: false,
      isRoot: true
    }));
   }
   else if(view === this.view.PREVIEW)
   {
     this.setState(state => ({
       isPreview: true,
       isRoot: false
     }))
   }
>>>>>>> feature
  }
  render()
  {
    if(this.state.isPreview){
      return(
        <>
        <div>
<<<<<<< HEAD
          <button type="Button" onClick = {this.sendPrevOrBack}>Back</button>
=======
          <button type="Button" onClick = {this.sendTo.bind(this,this.view.ROOT)}>Back</button>
>>>>>>> feature
        </div>
        <div>
          <Timetable />
        </div>
        </>
      );

    }
    else if(this.state.isRoot)
    {
      return (
        <>
        <div>
<<<<<<< HEAD
          <button type="Button" onClick = {this.sendPrevOrBack}>View Preview</button>
=======
          <button type="Button" onClick = {this.sendTo.bind(this,this.view.PREVIEW)}>View Preview</button>
>>>>>>> feature
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
