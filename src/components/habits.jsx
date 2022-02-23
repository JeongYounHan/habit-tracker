import React, { Component } from "react";
import Habit from "./habit";

class Habits extends Component {
  state = {
    habits: [
      { id: 1, name: "Reading", count: 0 },
      { id: 2, name: "Running", count: 0 },
      { id: 3, name: "Coding", count: 0 },
    ],
    inputValue: "",
  };

  handleIncrement = (habit) => {
    const habits = [...this.state.habits];
    const index = habits.indexOf(habit);
    habits[index].count++;
    this.setState({ habits: habits, inputValue: this.state.inputValue }, () => {
      this.handleChange();
    });
  };
  handleDecrement = (habit) => {
    const habits = [...this.state.habits];
    const index = habits.indexOf(habit);
    habits[index].count--;
    this.setState({ habits: habits, inputValue: this.state.inputValue }, () => {
      this.handleChange();
    });
  };
  handleDelete = (habit) => {
    const habits = this.state.habits.filter((item) => item.id !== habit.id);
    this.setState({ habits: habits, inputValue: this.state.inputValue }, () => {
      this.handleChange();
    });
  };

  handleChange = () => {
    const counts = this.state.habits.reduce((acc, cur, index) => {
      return acc + this.state.habits[index].count;
    }, 0);
    this.props.onChange(counts);
  };

  handleInput = (event) => {
    this.setState({ habits: this.state.habits, inputValue: event.target.value });
  };

  habitAdd = () => {
    const habits = [...this.state.habits];
    const result = habits.concat({ id: habits.length + 1, name: this.state.inputValue, count: 0 });
    this.setState({ habits: result, inputValue: "" });
  };

  render() {
    return (
      <main>
        <div>
          <input placeholder="Habit" onChange={this.handleInput} value={this.state.inputValue}></input>
          <button onClick={this.habitAdd}>Add</button>
        </div>

        <ul>
          {this.state.habits.map((habit) => (
            <Habit key={habit.id} habit={habit} onIncrement={this.handleIncrement} onDecrement={this.handleDecrement} onDelete={this.handleDelete} />
          ))}
        </ul>
      </main>
    );
  }
}

export default Habits;
