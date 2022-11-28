import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import PDF from "./components/PDF";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header title="CV Builder" />
        <Form />
      </div>
    );
  }
}
