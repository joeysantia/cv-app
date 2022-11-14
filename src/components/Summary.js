import React from "react";
import Input from "./Input"

export default class Summary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isStaged: true,
    };
  }

  renderInputs(responses) {
    return responses.map(response => {
      return <Input 
              />
    })
  }

  editSection() {}

  deleteSection() {}

  /**
   *
   * simple conditional:
   * 1. if the responses are staged, then
   *    return a summary box
   * 2. if the responses are NOT staged,
   *    then return a series of inputs
   */

  render() {
    if (this.state.isStaged) {
      return (
        <div className="summary-box">
          <h2>{this.props.title}</h2>
          <button onClick={(e) => console.log('hello!')}>Edit</button>
          {Object.keys(this.props.responses).map((key) => {
            return (
              <div>
                <h3>{key}</h3>
                <p>{this.props.responses[key]}</p>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div>
          {Object.keys(this.props.responses.map).map((key) => {
            let value = this.props.responses[key]
            return (
              <Input
                value={value}
                 />
            )
          })}
        </div>
      )
    }
  }
}
