import React from "react";
import "./Box.css";
import deleteIcon from "../img/delete.png";
import editIcon from '../img/edit.png'
import { format } from "date-fns";
import Input from "./Input";

/**
 * OUTLINE FOR THIS COMPONENT
 *
 * Props:
 * 1. responses: a list of responses with information
 * 2. updateSection: updates the state of the parent Section
 * 3. index: indicates the index of the box in the parent Section's boxes array
 * 4. sectionBoxes: a copy of the parent section's Boxes
 * 5. isFixed: determines whether this particular box is fixed
 *
 * State:
 * 1. IsStaged: determines presentation
 * 2. responses: contains the responses to the responses
 *
 * Main functions:
 *
 * IsStaged = true
 * 1. Main box: displays a list of paragraphs for each
 * 2. Delete button: if isFixed, updates the secton
 * 3. Edit button: changes the isStaged to "false"
 *
 * IsStaged = false
 * 1. Main box: displays a list of responses inside the box.
 * 2. Delete button: if isFixed, updates the section's state by removing the box from its state array
 * 3. Confirm button: changes isStaged to "true"
 */

export default class Box extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isStaged: false,
      responses: this.props.responses,
    };
  }

  deleteBox(i) {
      
    let boxes = JSON.parse(JSON.stringify(this.props.sectionBoxes));
    
    
    this.props.updateSection({
      boxes: [...boxes.slice(0, i), ...boxes.slice(i + 1)],
    });
    
    
  }

  confirmResponses() {
    let curInputs = document.querySelectorAll(`.mini-form[index="${this.props.index}"] input`)

    let sectionBoxes = JSON.parse(JSON.stringify(this.props.sectionBoxes))
    let curResponses = JSON.parse(JSON.stringify(this.state.responses))
    
    for (let i = 0; i < curInputs.length; i++) {
      sectionBoxes[this.props.index].inputs[i].value = curInputs[i].value
      curResponses[i].value = curInputs[i].value
    }

    console.log(sectionBoxes)
    

    this.setState({
      isStaged: true,
      responses: curResponses
    })
    

    
    this.props.updateSection({
      boxes: sectionBoxes
    })
    
    
    

  }

  render() {
    if (this.state.isStaged) {
      return (
        <div index={this.props.index} className="mini-form">
          {!this.props.isFixed ? <img
            src={deleteIcon}
            className="delete"
            alt="delete"
            onClick={(e) => this.deleteBox(this.props.index)}
          /> : null}
          <img 
            src={editIcon}
            className='edit'
            alt='edit'
            onClick={(e) => this.setState({isStaged: false})}
          />
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
            }
          })}
        </div>
      );
    } else {
      console.log(this.state.responses)
      return (
        <div index={this.props.index} className="mini-form">
          <div className='delete-box'>
          {!this.props.isFixed ? <img
            src={deleteIcon}
            className="delete"
            alt="delete"
            onClick={(e) => this.deleteBox(this.props.index)}
          /> : null}
          </div>
          {this.state.responses.map((response, i) => {
            return (
              <Input
                key={i}
                title={response.title}
                type={response.type}
                className={response.class}
                name={response.id}
                htmlFor={response.id}
                id={response.id}
                index={i}
                value={response.value}
                required={response.required}
              />
            );
          })}

                  <button type='button' onClick={(e) => this.confirmResponses()}>Confirm</button>
        </div>
      );
    }
  }
}
