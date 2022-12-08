import React from "react";
import Input from "./Input";
import FieldSet from "./FieldSet";
import { format } from "date-fns";
import deleteIcon from "../img/delete.png";
import editIcon from "../img/edit.png";
import "./Section.css";

export default class Section extends React.Component {
  constructor(props) {
    super(props);

    //this may be the cause of my woes right here
    //the state of the Section is determined by the state
    //of the form, which may be updating in a way that
    //causes headaches
    this.state = {
      responses: this.props.responses.slice(0, this.props.length),
      boxes: [],
      isStaged: true,
    };
  }

  addBox() {
    let boxes = document.querySelectorAll(".mini-form input");

    if (boxes.length) {
      let lastInput = [...boxes].slice(-2);

      for (const input of lastInput) {
        if (!input.value) {
          return;
        }
      }
    }
    this.setState({
      /**
       * differentiation may be necessary here.
       * instead of lumping all responses together,
       * there should be fixedResponses and 
       * boxResponses 
       */
      responses: [...this.state.responses, ...this.props.boxInputs],
      boxes: [...this.state.boxes, { inputs: [...this.props.boxInputs] }],
    });
  }

  generateBoxes(boxes) {
    return (
      <div className="box-box">
        {boxes.map((box, i) => {
          return (
            <div key={i} index={i} className="mini-form">
              <img
                src={deleteIcon}
                className="delete"
                alt="delete"
                onClick={(e) => this.deleteBox(i)}
              />
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
    let curIndex = 0;

    for (const button of boxes) {
      for (const input of button.inputs) {
        input.value = curButtons[curIndex++].value;
      }
    }

    this.setState({
      boxes: [
        ...this.state.boxes.slice(0, i),
        ...this.state.boxes.slice(i + 1),
      ],
      responses: [
        ...this.state.responses.slice(0, this.props.length + 2 * i),
        ...this.state.responses.slice(this.props.length + 2 * 1),
      ],
    });
  }

  generateInputs(inputs) {
    console.log(inputs);
    let onClick;
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
              onClick={(e) => onClick}
            />
          );
        })}
      </div>
    );
  }

  addInputs() {
    console.log(this.props);
    this.setState({
      responses: [...this.state.responses, ...this.props.boxInputs],
    });
    console.log(this.state.responses);
  }

  updateInputs(e) {
    e.preventDefault();
    let data = document.getElementById(this.props.title);
    let newResponses = this.props.formResponses;

    let curResponses = this.state.responses;
    console.log(data.elements);
    //HANG ON A SECOND
    //the values are already updated here???
    console.log(curResponses);

    for (let i = 0; i < curResponses.length; i++) {
      if (data.elements[i].type === "checkbox" && data.elements[i].checked) {
        curResponses[3].value = "Present";
        continue;
      }

      curResponses[i].value = data.elements[i].value;
      if (i > 7) {
        console.log(i, data.elements[i].value, curResponses[i].value);
        console.log(curResponses);
      }
    }
    console.log(curResponses);
    
    newResponses[this.props.index].responses = curResponses;
    console.log(newResponses);
    //CRAP. when the form updates, so do props,
    //which causes the box inputs to appear as fixed inputs.
    this.props.updateForm({
      responses: newResponses,
    });
    console.log(this.state)
    this.setState({ isStaged: true });
    
  }

  deleteSection() {}

  render() {
    if (this.state.isStaged) {
      return (
        <div className="section-box">
          <div className="top-row">
            <h2>{this.props.title}</h2>
            <div className="top-row-buttons">
              <img
                src={editIcon}
                alt="edit"
                onClick={(e) => this.setState({ isStaged: false })}
              />
            </div>
          </div>
          <div className="summary-grid">
            {this.props.responses.map((response, i) => {
              if (response.type !== "checkbox" && response.value) {
                let value = 
                  response.type === "month"
                    ? response.value === "Present"
                      ? "Present"
                      : format(new Date(response.value), "LLLL y")
                    : response.value;
                return (
                  <div key={i}>
                    <h3>{response.title}</h3>
                    <p>{value}</p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      );
    } else {
      return (
        <form id={this.props.title} onSubmit={(e) => this.updateInputs(e)}>
          <FieldSet
            title={this.props.title}
            inputs={this.props.responses.slice(0, this.props.length)}
          />
          {this.generateBoxes(this.state.boxes)}
          <div className="button-box">
            <button type="button" onClick={(e) => this.addBox()}>
              {this.props.addButton.text}
            </button>

            <button type="submit">Confirm</button>
          </div>
        </form>
      );
    }
  }
}
