import React from "react";
import "./Input.css"

export default class Input extends React.Component {
  /**
   * 
   * OUTLINE FOR THIS COMPONENT:
   * 
   * Props:
   * 1. Title: label for the input
   * 2. id: id, name, and htmlFor attributes
   * 3. className: className required attribute
   * 4. required: required attribute
   * 5. type: determines which input type (including textarea and select)
   * 6. value: predetermined value, if defined
   * 
   * State:
   * 1. value: current value of the input
   * 
   * Main functions
   * 1. onInput: updates the state's value 
   */
  
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value ? this.props.value : ''
    }
  }

  onInput(e) {
    this.setState({
      value: e.target.value
    })
  }

  render() {
   
    if (this.props.type === "states") {
      let states = [
        "",
        "AL",
        "AK",
        "AS",
        "AZ",
        "AR",
        "CA",
        "CO",
        "CT",
        "DE",
        "DC",
        "FM",
        "FL",
        "GA",
        "GU",
        "HI",
        "ID",
        "IL",
        "IN",
        "IA",
        "KS",
        "KY",
        "LA",
        "ME",
        "MH",
        "MD",
        "MA",
        "MI",
        "MN",
        "MS",
        "MO",
        "MT",
        "NE",
        "NV",
        "NH",
        "NJ",
        "NM",
        "NY",
        "NC",
        "ND",
        "MP",
        "OH",
        "OK",
        "OR",
        "PW",
        "PA",
        "PR",
        "RI",
        "SC",
        "SD",
        "TN",
        "TX",
        "UT",
        "VT",
        "VI",
        "VA",
        "WA",
        "WV",
        "WI",
        "WY",
      ];

      return (
        <div className="input">
          <label htmlFor={this.props.id}>{this.props.title}</label>
          <select
            id={this.props.id}
            name={this.props.title}
            required={this.props.required}
            value={this.props.value}
            onChange={(e) => this.onInput(e)}
          >
            {states.map((state, i) => {
              return <option key={i} value={state}>{state}</option>;
            })}
          </select>
        </div>
      );
    } else if (this.props.type === "textarea") {
      return (
        <div className="input">
          <label htmlFor={this.props.id}>{this.props.title}</label>
          <textarea
            id={this.props.id}
            name={this.props.title}
            required={this.props.required}
            onChange={(e) => this.onInput(e)}
            value={this.props.value}
          >
          </textarea>
        </div>
      );
    }

    let onClick = () => {}
    
    if (this.props.type === 'checkbox') {
      onClick = () => {
        let endMonth = document.querySelector('#end-month')
        endMonth.required = !endMonth.required
      }
    }

    let title = this.props.title + (this.props.id ? '' : ' ' + (this.props.index))
    let className = this.props.class + (this.props.id ? '' : '-' + (this.props.index))
    return (
      <div className="input">
        <label htmlFor={this.props.id}>{this.props.title}</label>
        <input
          className={this.props.class}
          contentEditable={true}
          id={this.props.id}
          name={this.props.id}
          type={this.props.type}
          required={this.props.required}
          onChange={(e) => this.onInput(e)}
          value={this.state.value}
          onClick={(e) => onClick()}
        ></input>
      </div>
    );
  }
}
