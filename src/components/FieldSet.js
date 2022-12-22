import React from "react";
import Input from "./Input";
import deleteIcon from "../img/delete.png";
import "./FieldSet.css";
export default class FieldSet extends React.Component {
  constructor(props) {
    super(props);
  }

  generateDeleteButton() {
    return (
      <img
        src={deleteIcon}
        alt="Delete"
        onClick={(e) => this.props.updateSummary()}
      />
    );
  }

  render() {
    return (
      <div className="fieldset">
        <h2>{this.props.title}</h2>
        <div className="input-box">
          {this.props.inputs.map((input, i) => {
            return (
              <Input
                key={i}
                title={input.title}
                type={input.type}
                className={input.class}
                name={input.id}
                htmlFor={input.id}
                id={input.id}
                required={input.required}
                value={input.value}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
