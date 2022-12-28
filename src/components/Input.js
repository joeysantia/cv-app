import React, { useState } from "react";
import "./Input.css";

export default function Input(props) {
  const [value, setValue] = useState(props.value ? props.value : "");

  function onInput(e) {
    setValue(e.target.value);
  }
  if (props.type === "states") {
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
        <label htmlFor={props.id}>{props.title}</label>
        <select
          id={props.id}
          name={props.title}
          required={props.required}
          value={props.value}
          onChange={(e) => onInput(e)}
        >
          {states.map((state, i) => {
            return (
              <option key={i} value={state}>
                {state}
              </option>
            );
          })}
        </select>
      </div>
    );
  } else if (props.type === "textarea") {
    return (
      <div className="input">
        <label htmlFor={props.id}>{props.title}</label>
        <textarea
          id={props.id}
          name={props.title}
          required={props.required}
          onChange={(e) => onInput(e)}
          value={props.value}
        ></textarea>
      </div>
    );
  }

  let onClick = () => {};

  if (props.type === "checkbox") {
    onClick = () => {
      let endMonth = document.querySelector("#end-month");
      endMonth.required = !endMonth.required;
    };
  }

  return (
    <div className="input">
      <label htmlFor={props.id}>{props.title}</label>
      <input
        className={props.class}
        contentEditable={true}
        id={props.id}
        name={props.id}
        type={props.type}
        required={props.required}
        onChange={(e) => onInput(e)}
        value={value}
        onClick={(e) => onClick()}
      ></input>
    </div>
  );
}
