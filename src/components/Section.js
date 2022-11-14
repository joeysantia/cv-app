import React from "react";
import Input from "./Input";

export default class Section extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderedInputs: this.props.inputs,
      canAddInput: true, 
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
              type="button"
              onClick={(e) => this.addInput(e, button.inputs)}
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
    let curResponses = { title: this.props.title, responses: {} };
    for (const element of data.elements) {
      if (element.name !== "" && element.value !== "") {
        curResponses.responses[element.name] = element.value;
      }
    }

    let titleMap = {
      Contact: "contactsSubmitted",
      Education: "educationSubmitted",
      "Employment History": "employmentSubmitted",
      Skills: "skillsSubmitted",
    };

    this.props.sendResponses({
      responses: [...this.props.prevResponses, curResponses],
      [titleMap[this.props.title]]: true,
    });

    this.setState({
      renderedInputs: [],
    });
  }

  render() {
    return (
      <form onSubmit={(e) => this.nextSection(e)} id={this.props.title}>
        <h2>{this.props.title}</h2>
        {this.generateInputs(this.state.renderedInputs)}
        {this.generateButtons(this.props.buttons)}
        <button className="next-section" type="submit">
          {this.props.nextSectionText}
        </button>
      </form>
    );
  }
}
