import React from 'react'
import Input from './Input'
import deleteIcon from '../img/delete.png'

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
            <div className={this.props.class}>
                <h2>{this.props.title}</h2>
                {this.props.title === 'Contact' ? null : this.generateDeleteButton()}
                {this.props.inputs.map((input, i) => {
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
        })}
            </div>
        )
    
  }
}