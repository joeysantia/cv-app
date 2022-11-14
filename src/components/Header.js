import React from "react";
import "./Header.css";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="header">
        <div id="logo-box">
          <img src="#" alt="logo" id="logo"></img>
          <h1>{this.props.title}</h1>
        </div>
      </div>
    );
  }
}
