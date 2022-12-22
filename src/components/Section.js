import React from "react";
import Box from './Box'
import Input from "./Input";
import FieldSet from "./FieldSet";
import { format } from "date-fns";
import deleteIcon from "../img/delete.png";
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
   */
  constructor(props) {
    super(props);

    this.state = {
      responses: [], //this.props.responses.slice(0, this.props.fixedInputs),
      boxes: this.props.fixedInputs.length ? [{isFixed: true, inputs: this.props.fixedInputs}] : [],
      isStaged: true,
    };

    this.updateSection = this.setState.bind(this)
  }

  addBox() {
    let boxInputs = JSON.parse(JSON.stringify(this.props.boxInputs))

    this.setState({
      boxes: [...this.state.boxes, {isFixed: false, inputs: boxInputs}]
    })
  }

  generateBoxes(boxes) {
    //console.log(boxes)
    return (
      <div className="box-box">
        {boxes.map((box, i) => {
          //console.log(box.inputs)
          return (
            <Box 
            key={i}
            index={i}
            responses={box.inputs}
            updateSection={this.updateSection}
            sectionBoxes={this.state.boxes}
            isFixed={box.isFixed ? true : false}
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

  /*
  addInputs() {
      this.setState({
      responses: [...this.state.responses, ...this.props.boxInputs],
    });
  }
  */

 updateInputs(e) {
    //console.log('just updated the form!')
    e.preventDefault();
    let data = document.getElementById(this.props.title);
    let newResponses = this.props.formResponses;

    let curResponses = this.state.responses;

    for (let i = 0; i < curResponses.length; i++) {
      if (data.elements[i].type === "checkbox" && data.elements[i].checked) {
        curResponses[3].value = "Present";
        continue;
      }

      curResponses[i].value = data.elements[i].value;
    }
    newResponses[this.props.index].responses = curResponses;
    this.props.updateForm({
      responses: newResponses,
    });
     this.setState({ isStaged: true });
    
  }

  render() {
    console.log(this.props.title, !!this.props.fixedInputs)
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
            {
            this.state.responses.map((response, i) => {
              if (response.type !== "checkbox" && response.value) {
                let value = response.value 
                
                if (response.type === 'month' && value !== "Present") {
                  value = format(new Date(response.value), "LLLL y")
                }
                
                return (
                  <div key={i}>
                    <h3>{response.title}</h3>
                    <p>{value}</p>
                  </div>
                );
              } else {
                return null
              }
            })}
          </div>
        </div>
      );
    } else {
      return (
        <form id={this.props.title} onSubmit={(e) => this.updateInputs(e)}>
          {/*<FieldSet
            title={this.props.title}
            inputs={this.props.responses.slice(0, this.props.fixedInputs)}
      />*/}
          <h2>{this.props.title}</h2>
          {this.generateBoxes(this.state.boxes)}
          <div className="button-box">
            <button type="button" onClick={(e) => this.addBox(e)}>
              {this.props.addButton.text}
            </button>

            <button type="submit">Confirm</button>
          </div>
        </form>
      );
    }
  }
}
