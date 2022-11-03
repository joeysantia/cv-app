import React, { Component } from 'react'
import Header from './Header'
import Contact from './Contact'
import Section from './Section'

export default class Form extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        let contactInputs = {
            setInputs: [
                    {title: 'First Name', type: 'text'},
                    {title: 'Last Name', type: 'text'},
                    {title: 'Email Address', type: 'email'},
                    {title: 'Phone Number', type: 'phone'},
                ],
            optionalInputs: [
                    [
                        {title: 'Address Line 1', type: 'text'},
                        {title: 'Address Line 2', type: 'text'},
                        {title: 'City', type: 'text'},
                        {title: 'State', type: 'states'}
                    ],
                    [
                        {title: 'Website Title', type: 'text'}
                    ]
                ]

        }
        return (
            <div>
                <Section title='Contact' inputs={contactInputs}/>
            </div>
        )
    }
}