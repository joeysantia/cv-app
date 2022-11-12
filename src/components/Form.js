import React from "react";
import Section from "./Section";

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      responses: [],
      contactsSubmitted: false,
      educationSubmitted: false,
      experienceSubmitted: false,
      skillsSubmitted: false,
    };
    this.setFormState = this.setState.bind(this);
  }

  render() {
    console.log(this.state.responses);

    let contactInputs = [
      {
        title: "First Name",
        id: "first-name",
        type: "text",
        required: true,
        class: "set",
      },
      {
        title: "Last Name",
        id: "last-name",
        type: "text",
        required: true,
        class: "set",
      },
      {
        title: "Email Address",
        id: "email",
        type: "email",
        required: true,
        class: "set",
      },
      {
        title: "Phone Number",
        id: "phone",
        type: "phone",
        required: true,
        class: "set",
      },
      {
        title: "Address Line 1 (optional)",
        id: "address-1",
        type: "text",
        required: false,
        class: "address",
      },
      {
        title: "Address Line 2 (optional)",
        id: "address-2",
        type: "text",
        class: "address",
      },
      { title: "City (optional)", id: "city", type: "text", class: "address" },
      {
        title: "State (optional)",
        id: "state",
        type: "states",
        class: "address",
      },
    ];

    let contactButtons = [
      {
        id: "website",
        primaryText: "Add Website",
        inputsRendered: false,
        inputs: [{ title: "Website Title", type: "text", class: "website" }],
      },
    ];

    let educationInputs = [];
    let educationButtons = [
      {
        id: "education",
        primaryText: "Add Education",
        inputsRendered: false,
        inputs: [
          {
            title: "Name of Institution",
            id: "school-name",
            type: "text",
            required: true,
            class: "education",
          },
          {
            title: "Degree Earned",
            id: "degree-name",
            type: "text",
            required: true,
            class: "education",
          },
          {
            title: "GPA",
            id: "gpa",
            type: "text",
            required: true,
            class: "education",
          },
          {
            title: "Description",
            id: "description",
            type: "textarea",
            required: true,
            class: "education",
          },
        ],
      },
    ];

    //this quasi-switch statement can probably be
    //solved with a dict, but not sure how yet.
    if (this.state.skillsSubmitted) {
      return <Section title="Review" />;
    } else if (this.state.experienceSubmitted) {
      return <Section title="Skills" />;
    } else if (this.state.educationSubmitted) {
      return <Section title="Experience" />;
    } else if (this.state.contactsSubmitted) {
      return (
        <Section
          title="Education"
          inputs={educationInputs}
          buttons={educationButtons}
          name="Education"
          nextSectionText="Move on to Employment"
          addResponses={this.setFormState}
          nextSection={this.nextSection}
          sendResponses={this.setFormState}
          prevResponses={this.state.responses}
        />
      );
    } else {
      return (
        <Section
          title="Contact"
          inputs={contactInputs}
          buttons={contactButtons}
          name="Contact"
          nextSectionText="Move on to Education"
          addResponses={this.setFormState}
          nextSection={this.nextSection}
          sendResponses={this.setFormState}
          prevResponses={this.state.responses}
        />
      );
    }
  }
}
