import React, { Component } from 'react'
import Input from './Input'

export default class Contact extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h2>Contact Information</h2>
                <div>
                    <Input title='First Name' type='text' />
                    <Input title='Last Name' type='text' />
                    <Input title='Email Address' type='email' />
                    <Input title='Phone Number' type='phone' />
                    <Input title='Website Link' type='text' /> 
                </div>
            </div>
        )
    }
}