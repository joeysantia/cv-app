import React from "react";
import "./Input.css"

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    }
  }

  onInput(e) {
    console.log(e.target)
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
          >
          </textarea>
        </div>
      );
    }

    return (
      <div className="input">
        <label htmlFor={this.props.id}>{this.props.title}</label>
        <input
          className={this.props.class}
          contentEditable={true}
          id={this.props.id}
          name={this.props.title}
          type={this.props.type}
          required={this.props.required}
          onChange={(e) => this.onInput(e)}
          value={this.state.value}
        ></input>
      </div>
    );
  }
}
