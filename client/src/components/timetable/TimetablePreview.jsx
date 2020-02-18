import React, { Component } from "react";
import Timetable from "./TimeTable";

class TimetablePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRoot: true,
      isPreview: false
    };
    this.view = { ROOT: 0, PREVIEW: 1 };
  }
  sendTo(view) {
    if (view === this.view.ROOT) {
      this.setState(state => ({
        isPreview: false,
        isRoot: true
      }));
    } else if (view === this.view.PREVIEW) {
      this.setState(state => ({
        isPreview: true,
        isRoot: false
      }));
    }
  }
  render() {
    if (this.state.isPreview) {
      return (
        <>
          <div>
            <button
              type='Button'
              onClick={this.sendTo.bind(this, this.view.ROOT)}
            >
              Back
            </button>
          </div>
          <div>
            <Timetable />
          </div>
        </>
      );
    } else if (this.state.isRoot) {
      return (
        <>
          <div>
            <button
              type='Button'
              onClick={this.sendTo.bind(this, this.view.PREVIEW)}
            >
              View Preview
            </button>
          </div>
        </>
      );
    }
  }
}

export default TimetablePreview;
