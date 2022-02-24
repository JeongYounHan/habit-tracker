import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <header className="header">
        <h1>Habit Tracker</h1>
        <span>{this.props.totalCounts}</span>
      </header>
    );
  }
}

export default Navbar;
