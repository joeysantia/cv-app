import React, { Component } from "react";
import Section from "./Section";

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      responses: {},
      contactsSubmitted: false,
      educationSubmitted: false,
      experienceSubmitted: false,
      skillsSubmitted: false
    }
    
  }

  addResponses() {
    this.setState.bind(this)
  }

  nextSection() {

  }

  render() {

    let contactInputs = [
      { title: "First Name", type: "text", required: true, class: 'set' },
      { title: "Last Name", type: "text", required: true, class: 'set' },
      { title: "Email Address", type: "email", required: true, class: 'set' },
      { title: "Phone Number", type: "phone", required: true, class: 'set' },
      { title: "Address Line 1 (optional)", type: "text", required: false, class: "address" },
          { title: "Address Line 2 (optional)", type: "text", class: "address" },
          { title: "City (optional)", type: "text", class: "address" },
          { title: "State (optional)", type: "states", class: "address" },
    ];

    let contactButtons = [
      {
        id: 'website',
        primaryText: "Add Website",
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

  //this quasi-switch statement can probably be 
  //solved with a dict, but not sure how yet.
    if (this.state.skillsSubmitted) {
      return <Section title="Review" />
      
    } else if (this.state.experienceSubmitted) {
      return <Section title="Skills" />
    } else if (this.state.educationSubmitted) {
      return <Section title='Experience' />
    } else if (this.state.contactsSubmitted) {
      return <Section title='Education' />
    } else {
      return ( <Section
          title="Contact"
          inputs={contactInputs}
          buttons={contactButtons}
          nextSectionText="Move on to Education"
          addResponses={this.addResponses}
          nextSection={this.nextSection}
        />)
    };
  }
}
