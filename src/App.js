import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import PDF from "./components/PDF";
import "./App.css";

/**
 * OVERALL PLAN:
 * 
 * Props: n/a
 * 
 * State: 
 * 1. inputsConfirmed: when "false", displays the Form component. When "true", displays the PDF component
 * 2. responses: contains all of the data sent by the Form.
 * 
 * MAIN FUNCTIONS:
 * 1. Displays the header.
 * 2. updateApp: allows child components to update the app
 * 
 * inputsConfirmed = true
 * 1. Generates the PDF component
 * 
 * inputsConfirmed = false
 * 1. Generates the Form component
 */

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputsConfirmed: false, 
      responses: []
    }

    this.updateApp = this.setState.bind(this)
  }

  render() {
    if (this.state.inputsConfirmed) {
      return <div>
        <Header title="CV Builder" />
        <PDF responses={this.state.responses}
             updateApp={this.updateApp}/> 
      </div>
    } else {
      return (
        <div>
          <Header title="CV Builder" />
          <Form updateApp={this.updateApp}
                responses={this.state.responses}/>
        </div>
      );
    }
    
  }
}
