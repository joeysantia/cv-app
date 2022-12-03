import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import PDF from "./components/PDF";
import "./App.css";

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
          <Form updateApp={this.updateApp}/>
        </div>
      );
    }
    
  }
}
