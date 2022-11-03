import React, { Component } from 'react'

export default class Input extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        
        if (this.props.type === 'states') {

            let states = [ '', 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

            return (
                <div>
                    <label for='states'>State</label>
                    <select name='states'>
                        {states.map(state => {
                            return (
                                <option value={state}>{state}</option>
                            )
                        })}
                    </select>
                </div>
            )
        }

        return (
            <div>
                <label htmlFor='#'>{this.props.title}</label>
                <input id='#' name='#' type={this.props.type} required={this.props.required}></input>
            </div>
        )
    }
}