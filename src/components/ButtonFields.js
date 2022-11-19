import React from "react";
import Input from "./Input";

export default class ButtonFields extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderedInputs: this.props.inputs,
      //canAddInput: true, 
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
              //onChange={input.onInput}
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
    console.log('phew!')
    e.preventDefault();
    let form = document.getElementById(this.props.title || 'Contact')
    console.log(form)
    for (const element of form.elements) {
      if (element.value === '' && element.placeholder === '') {
        return
      }
    }
      this.setState({
        renderedInputs: [...this.state.renderedInputs, ...inputs],
        canAddInput: false
      });
  }
/*
  nextSection(e) {
    
    e.preventDefault();
    console.log('wait, what?')

    let data = document.getElementById(this.props.title);
    let curResponses = { title: this.props.title, addButton: this.props.buttons, responses: {} };
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
*/
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        {this.generateInputs(this.state.renderedInputs)}
        {this.generateButtons(this.props.buttons)}
        <button className="next-section" type="submit" >
          {this.props.nextSectionText}
        </button>
      </div>
    );
  }
}
