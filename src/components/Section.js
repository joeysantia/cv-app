import React from "react";
import Box from "./Box";
import Input from "./Input";
import { format } from "date-fns";
import editIcon from "../img/edit.png";
import "./Section.css";

export default class Section extends React.Component {
  /**
   *
   * PLAN FOR THIS COMPONENT
   *
   * Props:
   * 1. title: title of the section
   * 2. fixedBox: if defined, the information to create a special box (e.g. Contact)
   * 3. updateForm: allows section to send responses up to the form
   * 4. index: indicates the index in the parent Form's Section array
   * 5. boxInputs: inputs for the box that can be added repeatedly
   * 6. fixedBoxInputs: inputs for a fixed box, if any
   *
   * State:
   * 1. boxes: array with information that is used to create Boxes
   * 2. responses: array with responses from the user
   *
   * Functions:
   * 1. Generates a heading based on the title
   * 2. Add button: allows a new box to be added to this.state.boxes
   * 2a. (If this is Contact, then there is a fixed box that is automatically there)
   * 3. Add box: adds a new Box to the this.state.boxes
   * 4. updateSection: passed down to boxes, which allows them to update state
   *
   * Need to do:
   * 1. Create a boolean that indicates all of the boxes
   *    are confirmed.
   * 2.
   */
  constructor(props) {
    super(props);

    this.state = {
      boxes: this.props.fixedInputs.length
        ? [{ isFixed: true, inputs: this.props.fixedInputs }]
        : [],
      isStaged: false,
    };

    this.updateSection = this.setState.bind(this);
  }

  addBox() {
    let boxInputs = JSON.parse(JSON.stringify(this.props.boxInputs));

    this.setState({
      boxes: [...this.state.boxes, { isFixed: false, inputs: boxInputs }],
    });
  }

  generateBoxes(boxes) {
    return (
      <div className="box-box">
        {boxes.map((box, i) => {
          return (
            <Box
              key={i}
              index={i}
              id={`${this.props.title}-${i}`}
              responses={box.inputs}
              //do I need to update the section and
              //form separately?
              formResponses={this.props.formResponses}
              updateSection={this.updateSection}
              updateForm={this.props.updateForm}
              sectionBoxes={this.state.boxes}
              sectionIndex={this.props.index}
              isFixed={box.isFixed}
            />
          );
        })}
      </div>
    );
  }

  generateInputs(inputs, index) {
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
              index={index}
              value={input.value}
              required={input.required}
              onClick={(e) => onClick}
            />
          );
        })}
      </div>
    );
  }

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
            {this.state.responses.map((response, i) => {
              if (response.type !== "checkbox" && response.value) {
                let value = response.value;

                if (response.type === "month" && value !== "Present") {
                  value = format(new Date(response.value), "LLLL y");
                }

                return (
                  <div key={i}>
                    <h3>{response.title}</h3>
                    <p>{value}</p>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div id={this.props.title}>
          <h2>{this.props.title}</h2>
          {this.generateBoxes(this.state.boxes)}
          <div className="button-box">
            <button type="button" onClick={(e) => this.addBox(e)}>
              {this.props.addButton.text}
            </button>
          </div>
        </div>
      );
    }
  }
}
