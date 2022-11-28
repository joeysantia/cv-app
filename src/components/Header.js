import React from "react";
import "./Header.css";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  refreshPage() {
    window.location.reload();
  }

  render() {
    return (
      <div id="header">
        <div id="logo-box" onClick={(e) => this.refreshPage()}>
          <img src="#" alt="logo" id="logo"></img>
          <h1>{this.props.title}</h1>
        </div>
      </div>
    );
  }
}
