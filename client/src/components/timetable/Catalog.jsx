import React, { Component } from "react";

class CourseTile extends Component {
  render() {
    return (
      <li key={this.props.code}>
        <ul className='course-tile'>
          <li>{this.props.code}</li>
          <li>{this.props.name}</li>
          <li>{this.props.midsem}</li>
          <li>{this.props.compre}</li>
        </ul>
      </li>
    );
  }
}

class Catalog extends Component {
  render() {
    return (
      <div className='catalog'>
        <ul className='top-bar'>
          <li>Code</li>
          <li>Name</li>
          <li>Mid Sem</li>
          <li>Compre</li>
        </ul>
        <ul className='catalog-courses'>
          {this.props.courses.map(course => new CourseTile(course).render())}
        </ul>
      </div>
    );
  }
}

export default Catalog;
