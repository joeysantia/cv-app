import React from "react";
import Input from "./Input";
import "./ButtonFields.css";

export default class ButtonFields extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boxes: [],
    };
  }

  generateBoxes(boxes) {
    return (
      <div>
        {boxes.map((box, i) => {
          return (
            <div key={i} index={i} className="mini-form">
              <button
                className="delete"
                type="button"
                onClick={(e) => this.deleteBox(i)}
              >
                Delete
              </button>
              {this.generateInputs(box.inputs)}
            </div>
          );
        })}
      </div>
    );
  }

  deleteBox(i) {
    let boxes = this.state.boxes;
    let curButtons = document.querySelectorAll(".mini-form input");
    console.log("current values:", curButtons);
    console.log("state:", boxes);
    console.log("index:", i);
    
    let curIndex = 0

    for (const button of boxes) {
      for (const input of button.inputs) {
        console.log(input.value, curButtons[curIndex].value)
        input.value = curButtons[curIndex++].value
        console.log(input.value)
      }
    }
    
    this.setState({
      boxes: [...boxes.slice(0, i), ...boxes.slice(i + 1)],
    });
    
    //console.log("updated state:", this.state.boxes);
  }

  generateInputs(inputs) {
    console.log(inputs)
    return (
      <div>
        {inputs.map((input, i) => {
          return (
            <Input
              key={i}
              title={input.title}
              type={input.type}
              className={input.class}
              name={input.id}
              htmlFor={input.id}
              id={input.id}
              value={input.value}
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
        {buttons.map((button, i) => {
          let text = button.primaryText;
          return (
            <button
              key={i}
              id={button.id}
              type="button"
              onClick={(e) => this.addBox(e, this.props.buttons[0])}
            >
              {text}
            </button>
          );
        })}
      </div>
    );
  }

  addBox(e, inputs) {
    e.preventDefault();

    let boxes = document.querySelectorAll(".mini-form input");

    if (boxes.length) {
      console.log("theres a box");
      let lastInput = [...boxes].slice(-2);

      for (const input of lastInput) {
        if (!input.value) {
          return;
        }
      }
    }
    this.setState({
      boxes: [...this.state.boxes, {inputs: [...inputs]}],
    });
  }

  componentDidUpdate() {
    console.log('just received some props!')
  }

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        {this.generateBoxes(this.state.boxes)}
        <div className="button-box">
          <button type='button' onClick={(e) => this.addBox(e, this.props.inputs)}>{this.props.button.text}</button>
          <button className="next-section" type="submit">
            {this.props.nextSectionText}
          </button>
          <button type='button' onClick={(e) => console.log(this.state.boxes)}>Check Boxes</button>
          <button type='button' onClick={(e) => console.log(this.props)}>Check props</button>
        </div>
      </div>
    );
  }
}
