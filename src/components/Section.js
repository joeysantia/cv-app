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
          let text = button.inputsRendered
            ? button.secondaryText
            : button.primaryText;
          return (
            <button
              id={button.id}
              onClick={(e) =>
                button.inputsRendered
                  ? this.removeInput(button.id)
                  : this.addInput(button.inputs, button.id)
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

    //use computed names instead!! we figured out
    //what it's useful for! hooray! 
    this.props.sendResponses({
      responses: [...this.props.prevResponses, curResponses],
    });
    if (this.props.title === "Contact") {
      this.props.sendResponses({
        contactsSubmitted: true,
      });
    } else if (this.props.title === "Education") {
      this.props.sendResponses({
        educationSubmitted: true,
      });
    } else if (this.props.title === 'Employment') {
      this.props.sendResponses({
        employmentSubmitted: true,
      })
    }

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
        <button
          className="add-inputs"
          onClick={(e) => this.addInput(e, this.props.buttons[0].inputs)}
        >
          {this.props.buttons[0].primaryText}
        </button>
        <button className="next-section" type="submit">
          {this.props.nextSectionText}
        </button>
      </form>
    );
  }
}
