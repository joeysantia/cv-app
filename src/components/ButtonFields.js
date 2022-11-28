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

    //console.log(boxes)
    return (
      <div>
        {boxes.map((box, i) => {
          //console.log(box)
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
    
    //console.log(this.state.buttonInputs)
    //console.log(this.state.buttonInputs.slice(0, i))
    //console.log([...this.state.buttonInputs.slice(0, i), ...this.state.buttonInputs.slice(i + 1)])
    
    /**
     * UPDATE INPUT VALUES HERE
     * Plan:
     * 1. use querySelector for the index attribute
     */
    /*
    
    */


   let buttonInputs = this.state.buttonInputs
   let curInputs = document.querySelectorAll('div[index="0"] input')
   for (let j = 0; j < buttonInputs[i].inputs.length; j++) {
      buttonInputs[i].inputs[j].value = curInputs[j].value
   }

   this.setState({
    buttonInputs: [...buttonInputs.slice(0, i), ...buttonInputs.slice(i + 1)]
  })
   
   console.log(buttonInputs)
    
    
    
    console.log(this.state.buttonInputs)
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
    /*
    let form = document.getElementById(this.props.title || 'Contact')
    console.log(form)
    for (const element of form.elements) {
      if (element.value === '' && element.placeholder === '') {
        return
      }
    }*/
      //console.log(inputs)
      this.setState({
        buttonInputs: [...this.state.buttonInputs, inputs],
        canAddInput: false
      });
      //console.log(this.state)
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
