import React, { Component } from "react";
import Input from "./Input";
import Summary from "./Summary"

export default class Section extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderedInputs: this.props.inputs,
      renderedButtons: this.props.buttons,
      isStaged: false
    };
  }

  generateInputs(inputs) {
    return (
      <div>
        {inputs.map((input) => {
          return <Input title={input.title} type={input.type} className={input.class} name={this.props.id} htmlFor={this.props.id} id={this.props.id} required={input.required}/>;
        })}
      </div>
    );
  }

  generateButtons(buttons) {
    return (
      <div>
        {buttons.map((button) => {
          let text = button.inputsRendered
            ? button.secondaryText
            : button.primaryText;
          return (
            <button
              id={button.id}
              onClick={(e) => (button.inputsRendered ? this.removeInput(button.id) : this.addInput(button.inputs, button.id))}
            >
              {text}
            </button>
          );
        })}
      </div>
    );
  }

  addInput(inputs, buttonId) {
    console.log(this.props.buttons[0].inputs)
    console.log(inputs )
    this.setState({
      renderedInputs: [...this.state.renderedInputs, ...inputs],
      //renderedButtons: this.updateButtons(buttonId),
    });
  }


  removeInput(buttonId) {
    let newInputs = this.state.renderedInputs.filter(input => {
        return input.class !== buttonId
    })
    this.setState({
        renderedInputs: newInputs,
        renderedButtons: this.updateButtons(buttonId)
    })
  }
  
  updateButtons(buttonId) {
    let buttonIndex = 0;
    let buttons = [...this.state.renderedButtons];
    let button;

    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].id === buttonId) {
        buttonIndex = i;
        button = buttons[i];
        break;
      }
    }

    let updatedButton = {
      ...buttons[buttonIndex],
      inputsRendered: !button.inputsRendered,
    };

    buttons[buttonIndex] = updatedButton;

    return buttons;
  }

  nextSection(e) {
    e.preventDefault()
    
    let data = document.getElementById(this.props.title)
    console.log(data)
    for (const element of data.elements) {
      console.log(element.id, element.value)
    }

  }

  render() {
    
    if (this.state.isStaged) {
      return (
        <Summary 
          inputs={this.state.renderedInputs}

        />
      ) 
    } else { 
      return (
        <form id={this.props.title}>
          <h2>{this.props.title}</h2>
          {this.generateInputs(this.state.renderedInputs)}
          { /* {this.generateButtons(this.state.renderedButtons)} */}
          <button className='add-inputs' onClick={(e) => this.addInput(this.props.buttons[0].inputs)}>{this.props.buttons[0].primaryText}</button>
          <button className='next-section' type='submit' onClick={(e) => this.nextSection(e)}>{this.props.nextSectionText}</button>
        </form>
      );
    }
    
  }
}
