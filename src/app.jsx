import React, { Component } from "react";
import Habits from "./components/habits";
import Navbar from "./components/navbar";

class App extends Component {
  state = {
    totalCounts: 0,
  };
  handleChange = (count) => {
    const totalCounts = count;
    this.setState({ totalCounts });
  };
  render() {
    return (
      <>
        <Navbar totalCounts={this.state.totalCounts} />
        <Habits onChange={this.handleChange} />
      </>
    );
  }
}

export default App;
