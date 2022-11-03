import React, { Component } from 'react'
import Input from './Input'

export default class Section extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            renderedInputs: this.props.setInputs
        
    }

    generateInputs(inputs) {
        return ( 
            <div>
                {inputs.map(input => {
                    return (
                        <Input title={input.title} type={input.type}/>
                    )
                })}
            </div>
        )
    }

    addInput(inputs) {

        this.setState()
        
        return (
            <div>
                {inputs.map(input => this.generateInputs(input))}
            </div>
        )
    }

    render() {

        let {setInputs, optionalInputs} = this.props.inputs
        console.log(setInputs)
        console.log(optionalInputs)

        return (
            <div>
                <h2>{this.props.title}</h2>
                {this.generateInputs(setInputs)} 
                <button onClick={this.addInput(optionalInputs)}>Add Address?</button>
            </div>
        )
    }
}