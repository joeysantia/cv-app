import React from "react";
import Section from "./Section";
import Summary from "./Summary";

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      responses: [],
      contactsSubmitted: false,
      educationSubmitted: false,
      employmentSubmitted: false,
      skillsSubmitted: false,
    };
    this.setFormState = this.setState.bind(this);
  }

  render() {
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
        required: true,
        class: "address",
      },
      {
        title: "Address Line 2 (optional)",
        id: "address-2",
        type: "text",
        required: true,
        class: "address",
      },
      {
        title: "City (optional)",
        id: "city",
        type: "text",
        required: true,
        class: "address",
      },
      {
        title: "State (optional)",
        id: "state",
        type: "states",
        required: true,
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
            title: "School Name",
            id: "school-name",
            type: "text",
            required: true,
            class: "education",
          },
          {
            title: "School Location",
            id: "degree-name",
            type: "text",
            required: true,
            class: "education",
          },
          {
            title: "Start Month",
            id: "start-month",
            type: "month",
            required: true,
            class: "education",
          },
          {
            title: "End Month",
            id: "end-month",
            type: "month",
            required: true,
            class: "education",
          },
          {
            title: "Degree",
            id: "degree",
            type: "text",
            required: true,
            class: "education",
          },
          {
            title: "Field of Study",
            id: "field",
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
    let employmentInputs = [];
    let employmentButtons = [
      {
        id: "employment",
        primaryText: "Add Employment",
        inputsRendered: false,
        inputs: [
          {
            title: "Position",
            id: "position",
            type: "text",
            required: true,
            class: "employment",
          },
          {
            title: "Company Name",
            id: "company-name",
            type: "text",
            required: true,
            class: "education",
          },
          {
            title: "Start Month",
            id: "start-month",
            type: "month",
            required: true,
            class: "employment",
          },
          {
            title: "End Month",
            id: "end-month",
            type: "month",
            required: true,
            class: "employment",
          },
          {
            title: "I currently work here",
            id: "current",
            type: "checkbox",
            required: false,
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
    let skillsInputs = [];
    let skillsButtons = [
      {
        id: "skills",
        primaryText: "Add Skill",
        inputsRendered: false,
        inputs: [
          {
            title: "Skill",
            id: "skill",
            type: "text",
            required: true,
            class: "skill",
          },
        ],
      },
    ];

    //this quasi-switch statement can probably be
    //solved with a dict, but not sure how yet.
    if (this.state.skillsSubmitted) {
      console.log(this.state);
      return (
        <div>
          {this.state.responses.map((data, index) => {
            return <Summary title={data.title} responses={data.responses} index={index} />;
          })}
        </div>
      );
    } else if (this.state.employmentSubmitted) {
      return (
        <Section
          title="Skills"
          inputs={skillsInputs}
          buttons={skillsButtons}
          name="Skills"
          nextSectionText="Review"
          sendResponses={this.setFormState}
          prevResponses={this.state.responses}
        />
      );
    } else if (this.state.educationSubmitted) {
      return (
        <Section
          title="Employment History"
          inputs={employmentInputs}
          buttons={employmentButtons}
          name="Education"
          nextSectionText="Move on to Skills"
          sendResponses={this.setFormState}
          prevResponses={this.state.responses}
        />
      );
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
