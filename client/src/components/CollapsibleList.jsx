import React, { Component } from "react";
import ListSection from "./ListSection";

class CollapsibleList extends Component {
  constructor(props) {
    super(props);
    if (this.props.title === "Lecture") {
      var show = true;
    } else {
      show = false;
    }
    this.state = { open: show };
    this.togglePanel = this.togglePanel.bind(this);
  }

  togglePanel() {
    this.setState({ open: !this.state.open });
  }

  render() {
    var sections = this.props.getSections(this.props.type);
    return (
      <div>
        <div onClick={this.togglePanel}>{this.props.title}</div>
        {this.state.open ? (
          <div>
            <ListSection action={this.props.action} sections={sections} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default CollapsibleList;
