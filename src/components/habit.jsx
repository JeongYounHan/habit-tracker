import React, { Component } from "react";

class Habit extends Component {
  state = {
    count: 0,
  };
  handleIncrement = () => {
    // setState 사용해야 리액트가 데이터 변화 인지
    this.setState({ count: this.state.count + 1 });
  };
  handleDecrement = () => {
    // setState 사용해야 리액트가 데이터 변화 인지
    const count = this.state.count - 1;
    this.setState({ count: count < 0 ? 0 : count });
  };
  render() {
    return (
      <li className="habit">
        <span className="habit-name">Reading</span>
        <span className="habit-count">{this.state.count}</span>
        <button className="habit-button" onClick={this.handleIncrement}>
          <i className="fas fa-plus-square habit-increase"></i>
        </button>
        <button className="habit-button habit-decrease" onClick={this.handleDecrement}>
          <i className="fas fa-minus-square"></i>
        </button>
        <button className="habit-button habit-delete">
          <i className="fas fa-trash"></i>
        </button>
      </li>
    );
  }
}

export default Habit;
