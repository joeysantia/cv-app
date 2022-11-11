import React, { Component } from "react";

export default class Summary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="staged">
        <h2>{this.props.title}</h2>
        <div>
          {this.props.fields.map((field) => {
            return (
              <div>
                <h3>{field.title}</h3>
                <p>{field.value}</p>
              </div>
            );
          })}
        </div>
        <button class="edit">Edit</button>
      </div>
    );
  }
}
