import React from "react";
import icon from "./../img/resume.png";
import "./Header.css";

export default function Header(props) {
  return (
    <div id="header">
      <div id="logo-box" onClick={(e) => window.location.reload()}>
        <img src={icon} alt="logo" id="logo"></img>
        <h1>{props.title}</h1>
      </div>
    </div>
  );
}
