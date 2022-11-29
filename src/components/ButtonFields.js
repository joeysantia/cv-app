import React from "react";
import Input from "./Input";
import "./ButtonFields.css"

export default class ButtonFields extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderedInputs: [],
      buttonInputs: []
    };
  }

  generateBoxes(boxes) {
    return (
      <div>
        {boxes.map((box, i) => {
          return (<div key={i} index={i} className='mini-form'>
            <button className='delete' type='button' onClick={(e) => this.deleteBox(i)}>Delete</button>
            {this.generateInputs(box.inputs)}
          </div>
          )
        })}
      </div>
    )
  }

  deleteBox(i) {

    let buttonInputs = this.state.buttonInputs
    
  /*
  This whole thing is a big mess
  Go solve other problems first and then come back 

   console.log(this.state.buttonInputs)
   let buttonInputs = this.state.buttonInputs
   //console.log(buttonInputs)
   let curInputs = document.querySelectorAll(`.mini-form input`)
   console.log(curInputs)
   
    * i found it!!! the curInputs counter needs to be different
    * no need for a double loop 
    * 
    * this is killing me 
    * find anoth
    
  
   let index = 0
   for (const button of buttonInputs) {
    for (let j = 0; j < button.inputs.length; j++) {
      console.log(button.inputs[j].value, curInputs[index].value)
      button.inputs[j].value = curInputs[index++].value
    }
   }
   */

   this.setState({
    buttonInputs: [...buttonInputs.slice(0, i), ...buttonInputs.slice(i + 1)]
  })

  }

  generateInputs(inputs) {
    return (
      <div>
        {inputs.map((input, i) => {
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
            />
          );
        })}
      </div>
    );
  }

  generateButtons(buttons) {
    return (
      <div>
        {buttons.map((button, i) => {
          let text = button.primaryText;
          return (
            <button
              key={i}
              id={button.id}
              type="button"
              onClick={(e) => this.addInput(e, button)}
            >
              {text}
            </button>
          );
        })}
      </div>
    );
  }

  addInput(e, inputs) {
    e.preventDefault();

    let boxes = document.querySelectorAll('.mini-form input')

    if (boxes.length) {
      let lastInput = [...boxes].slice(-2)

    for (const input of lastInput) {
      if (!input.value) {
        return 
      }
    }
    }

    this.setState({
      buttonInputs: [...this.state.buttonInputs, inputs],
    });

    
    
      
  }

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        {this.generateInputs(this.state.renderedInputs)}
        {this.generateBoxes(this.state.buttonInputs)}
        <div className="button-box">
        {this.generateButtons(this.props.buttons)}
        <button className="next-section" type="submit" >
          {this.props.nextSectionText}
        </button>
        </div>
      </div>
    );
  }
}
