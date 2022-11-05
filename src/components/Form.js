import React, { Component } from "react";
import Section from "./Section";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let contactInputs = [
      { title: "First Name", type: "text", class: 'set' },
      { title: "Last Name", type: "text", class: 'set' },
      { title: "Email Address", type: "email", class: 'set' },
      { title: "Phone Number", type: "phone", class: 'set' },
    ];

    let contactButtons = [
      {
        id: 'address',
        primaryText: "Add Address?",
        secondaryText: "Remove Address Inputs",
        inputsRendered: false,
        inputs: [
          { title: "Address Line 1", type: "text", class: "address" },
          { title: "Address Line 2", type: "text", class: "address" },
          { title: "City", type: "text", class: "address" },
          { title: "State", type: "states", class: "address" },
        ],
      },
      {
        id: 'website',
        primaryText: "Add Website?",
        secondaryText: "Remove Website Inputs",
        inputsRendered: false,
        inputs: [{ title: "Website Title", type: "text", class: "website" }],
      },
    ];

    let educationInputs = []
    let educationButtons = [
    {
        id: 'education',
        primaryText: 'Add Education',
        secondaryText: 'Remove Education fields',
        inputsRendered: false, 
        inputs: [
            {title: 'Name of Institution', type: 'text', class: 'education'},
            {title: 'Degree Earned', type: 'text', class: 'education'},
            {title: 'GPA', type: 'text', class: 'education'},
            {title: 'Description', type: 'textarea', class: 'education'}
        ]
    }
]
    return (
      <div>
        <Section
          title="Contact"
          inputs={contactInputs}
          buttons={contactButtons}
        />
        <Section
            title='Education'
            inputs={educationInputs}
            buttons={educationButtons}
        />
      </div>
    );
  }
}
