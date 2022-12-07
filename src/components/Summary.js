import React from "react";
import Input from "./Input";
import FixedFields from "./FixedFields";
import ButtonFields from "./ButtonFields";
import { format } from "date-fns";
import deleteIcon from '../img/delete.png'
import editIcon from '../img/edit.png'
import "./Summary.css";

export default class Summary extends React.Component {
  constructor(props) {
    super(props);

    

    this.state = {
      //this is me trying to use a slice method for differntiating
      //between boxes and fixed inputs. Damn you, Contact section!
      responses: this.props.responses.slice(0, this.props.length),
      boxes: [],
      isStaged: true,
    };
  }

  addBox(/*e,* inputs*/) {
    //e.preventDefault();

    let boxes = document.querySelectorAll(".mini-form input");

    if (boxes.length) {
      //console.log("theres a box");
      let lastInput = [...boxes].slice(-2);

      for (const input of lastInput) {
        if (!input.value) {
          return;
        }
      }
    }
    this.setState({
      //this causes DOUBLE rendering.
      responses: [...this.state.responses, ...this.props.boxInputs],
      boxes: [...this.state.boxes, {inputs: [...this.props.boxInputs]}],
    });
  }

  generateBoxes(boxes) {
    return (
      <div>
        {boxes.map((box, i) => {
          return (
            <div key={i} index={i} className="mini-form">
              <img
                src={deleteIcon}
                className="delete"
                alt='delete'
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
    /*console.log("current values:", curButtons);
    console.log("state:", boxes);
    console.log("index:", i);
    */
    let curIndex = 0

    for (const button of boxes) {
      for (const input of button.inputs) {
        //console.log(input.value, curButtons[curIndex].value)
        input.value = curButtons[curIndex++].value
        //console.log(input.value)
      }
    }

    this.setState({
      //I'm taking out the nth box
      //if 0th box, then taking out inputs 8 and 9 (0 1 2 3 4 5 6 7   10 11 ...)
      //if 1st box, then inputs 10 and 11 (0 1 2 3 4 5 6 7 8 9   12 13...)
      //if 2nd box 
      //[this.state.responses()]
      boxes:[...this.state.boxes.slice(0, i), ...this.state.boxes.slice(i + 1)],
      responses: [...this.state.responses.slice(0, this.props.length + 2 * i), ...this.state.responses.slice(this.props.length + 2 * 1)]
    })
  }

  generateInputs(inputs) {
    console.log(inputs)
    let onClick
      return (
      <div>
        {inputs.map((input, i) => {
          if (input.type === 'states') {
            console.log(input.value)
          }
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
    //add logic to check that previous webiste fields have been filled out
    let curResponses = this.state.responses;
    this.setState({
      responses: [...this.state.responses, ...this.props.boxInputs],
    });
    console.log(this.state.responses);
  }

  updateInputs(e) {
    e.preventDefault();
    //console.log(this.props.formResponses[this.props.index]);
    let data = document.getElementById(this.props.title);
    let newResponses = this.props.formResponses;
    let curResponses = this.state.responses;
    console.log(data.elements)
    console.log(curResponses)

    for (let i = 0; i < data.elements.length - 2; i++) {
      if (data.elements[i].type === 'checkbox' && data.elements[i].checked) {
        console.log('wahoo!')
        curResponses[3].value = 'Present'
        continue;
      }
      curResponses[i].value = data.elements[i].value;
      //this.state.responses[i].placeholder = data.elements[i].value;
    }
    console.log(curResponses);
    //console.log(newResponses);
/*
    for (const element of data.elements) {
      if (element.value || element.placeholder) {
        curResponses.responses[element.name] = (element.value ? element.value : element.placeholder)
      }
    }
    console.log(curResponses)
    */

    
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
          <div className="top-row">
            <h2>{this.props.title}</h2>
            <div className="top-row-buttons">
              <img src={editIcon} alt='edit' onClick={(e) => this.setState({ isStaged: false })}/>
            </div>
          </div>
          <div className='summary-grid'>
          {this.props.responses.map((response, i) => {
            if (response.type !== 'checkbox' && response.value) {
            let value =
              response.type === "month"
                ? (response.value === 'Present' ? 'Present' : format(new Date(response.value), "LLLL y"))
                : response.value;
            return (
              <div key={i}>
                <h3>{response.title}</h3>
                <p>{value}</p>
              </div>
            );}
          })}
        </div>
        </div>
      );
    } else {
      if (true) {
        return (
          <form id={this.props.title} onSubmit={(e) => this.updateInputs(e)}>
            <FixedFields title={this.props.title} inputs={this.props.responses.slice(0, this.props.length)} />
            {this.generateBoxes(this.state.boxes)}
            <div className='button-box'><button type="button" onClick={(e) => this.addBox()}>
              {this.props.addButton.text}
            </button>
            
            <button type="submit">Confirm</button></div>
          </form>
        );
      } else {
        let indexDict = {
          'Education': 7,
          'Employment': 5,
          'Skills': 1
        }
        let index = indexDict[this.props.title]
        for (let i = 0; i < this.state.respnses / index; i++) {

        }
        return (
        <form id={this.props.title} onSubmit={(e) => this.updateInputs(e)}>
          {}
        </form>
        )

      }
     
    }
  }
}
