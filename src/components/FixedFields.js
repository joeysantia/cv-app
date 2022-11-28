import React from 'react'
import Input from './Input'

export default class FixedFields extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h2>Contact</h2>
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
              //placeholder={input.placeholder}
              value={input.value}
            />
          );
        })}
            </div>
        )
    }
}