import React, { Component } from "react";
import Input from "./Input";
import Summary from "./Summary";

export default class Section extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderedInputs: this.props.inputs,
      renderedButtons: this.props.buttons,
    };
  }

  generateInputs(inputs) {
    return (
      <div>
        {inputs.map((input) => {
          return (
            <Input
              title={input.title}
              type={input.type}
              className={input.class}
              name={input.id}
              htmlFor={input.id}
              id={input.id}
              required={input.required}
            />
          );
        })}
      </div>
    );
  }

  generateButtons(buttons) {
    return (
      <div>
        {buttons.map((button) => {
          let text = button.primaryText;
          return (
            <button
              id={button.id}
              type='button'
              onClick={(e) => this.addInput(e, button.inputs)
              }
            >
              {text}
            </button>
          );
        })}
      </div>
    );
  }

  addInput(e, inputs) {
    e.preventDefault();
    this.setState({
      renderedInputs: [...this.state.renderedInputs, ...inputs],
    });
  }

  nextSection(e) {
    e.preventDefault();

    let data = document.getElementById(this.props.title);
    let curResponses = {};
    for (const element of data.elements) {
      if (element.id !== "" && element.value !== "") {
        curResponses[element.id] = element.value;
      }
    }

    let titleMap = {
      'Contact': 'contactsSubmitted',
      'Education': 'educationSubmitted',
      'Employment': 'employmentSubmitted',
      'Skills': 'skillsSubmitted'
    }

    this.props.sendResponses({
      responses: [...this.props.prevResponses, curResponses],
      [titleMap[this.props.title]]: true
    });

    this.setState({
      renderedInputs: [],
      renderedButtons: [],
    });
  }

  render() {
    return (
      <form onSubmit={(e) => this.nextSection(e)} id={this.props.title}>
        <h2>{this.props.title}</h2>
        {this.generateInputs(this.state.renderedInputs)}
        {/**can I just do a map function for the buttons instead? */}
        {this.generateButtons(this.state.renderedButtons)}
        <button className="next-section" type="submit">
          {this.props.nextSectionText}
        </button>
      </form>
    );
  }
}
