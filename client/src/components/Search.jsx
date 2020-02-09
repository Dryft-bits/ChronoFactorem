import React, { Component } from "react";
import ListCourse from "./ListCourse";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { initial: this.props.items, current: this.props.items };
  }

  filterItems(input) {
    var updatedlist = this.state.initial;
    updatedlist = updatedlist.filter(item => {
      return item.code.search(input.target.value) !== -1;
    });
    this.setState({ current: updatedlist });
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.filterItems.bind(this)} />
        <ListCourse courses={this.state.current} />
      </div>
    );
  }
}

export default Search;
