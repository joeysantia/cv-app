import React, { Component } from 'react'
import Input from './Input'

export default class Education extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return ( 
            <div>
                <h2>Education</h2>
                <Input title='High School' type='text' />
                <Input title='College' type='text' />
                <Input title='Graduate School' type='text' />
            </div>
        )
    }
}