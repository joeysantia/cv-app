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
      responses: this.props.responses,
      isStaged: true,
    };
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
    console.log(this.props.formResponses[this.props.index]);
    let data = document.getElementById(this.props.title);
    console.log(data.elements);
    console.log(this.state.responses);
    let newResponses = this.props.formResponses;
    let curResponses = this.state.responses;

    for (let i = 0; i < curResponses.length; i++) {
      if (data.elements[i].type === 'checkbox' && data.elements[i].checked) {
        curResponses[3].value = 'Present'
        continue;
      }
      curResponses[i].value = data.elements[i].value;
      //this.state.responses[i].placeholder = data.elements[i].value;
    }
    console.log(curResponses);
    console.log(newResponses);

    /*for (const element of data.elements) {
      if (element.value || element.placeholder) {
        curResponses.responses[element.name] = (element.value ? element.value : element.placeholder)
      }
    }
    console.log(curResponses)
    */
    newResponses[this.props.index].responses = curResponses;
    console.log(newResponses);
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
              <img src={editIcon} onClick={(e) => this.setState({ isStaged: false })}/>
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
            <FixedFields title={this.props.title} inputs={this.state.responses} />
            <div className='button-box'><button type="button" onClick={(e) => this.addInputs()}>
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
