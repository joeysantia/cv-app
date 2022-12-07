import React from 'react'
import Input from './Input'
import deleteIcon from '../img/delete.png'
import './FixedFields.css'
export default class FixedFields extends React.Component {
    constructor(props) {
        super(props)
    }

    generateDeleteButton() {
      return (
        <img src={deleteIcon} alt='Delete' onClick={(e) => this.props.updateSummary()}/>
      )
    }

    render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <div className='input-box'>{this.props.inputs.map((input, i) => {
                  if (input.type === 'states') {
                    console.log(input.value)
                  }
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
              value={input.value}
            />
          );
        })}</div>
            </div>
        )
    
  }
}