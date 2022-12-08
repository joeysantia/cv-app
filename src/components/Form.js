import React from "react";
import Section from "./Section";
import "./Form.css";

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      responses: this.props.responses.length ? this.props.responses : [
        {title: 'Contact', responses: [
     {
            title: "First Name",
            id: "first-name",
            type: "text",
            required: true,
          },
          {
            title: "Last Name",
            id: "last-name",
            type: "text",
            required: true,
          },
          {
            title: "Email Address",
            id: "email",
            type: "email",
            required: true,
          },
          {
            title: "Phone Number",
            id: "phone",
            type: "phone",
            required: true,
          },
          {
            title: "Address Line 1",
            id: "address-1",
            type: "text",
            required: true,
          },
          {
            title: "Address Line 2",
            id: "address-2",
            type: "text",
            required: false,
          },
          {
            title: "City",
            id: "city",
            type: "text",
            required: true,
          },
          {
            title: "State",
            id: "state",
            type: "states",
            required: true,
          },
        ]},
        {title: 'Education', responses: []},
        {title: 'Experience', responses: []},
        {title: 'Skills', responses: []}
      ],
    };
    this.setFormState = this.setState.bind(this);
  }

  render() {
    //a bit of redundancy here - is it possible
    //to declare the input definitions once?
    let contactInputs = this.state.responses[0].responses.slice(0, 7)
    let contactButton = 
      {
        id: "website",
        text: "+ Add Website",
        inputsRendered: false,
      }
    let contactButtonInputs = [
          {
            title: "Website Label",
            class: "website-label",
            type: "text",
            required: false,
          },
          {
            title: "Website URL",
            class: "website-url",
            type: "text",
            required: false,
          },
        ]

    let educationButton = 
      {
        id: "education",
        text: "+ Add Education",
      }
    let educationInputs = [
          {
            title: "School Name",
            id: "school-name",
            type: "text",
            required: true,
          },
          {
            title: "School Location",
            id: "degree-name",
            type: "text",
            required: true,
          },
          {
            title: "Start Month",
            id: "start-month",
            type: "month",
            required: true,
          },
          {
            title: "End Month",
            id: "end-month",
            type: "month",
            required: true,
          },
          {
            title: "Degree",
            id: "degree",
            type: "text",
            required: true,
          },
          {
            title: "Field of Study",
            id: "field",
            type: "text",
            required: true,
          },
          {
            title: "Description",
            id: "description",
            type: "textarea",
            required: true,
          },
        ]

    let experienceButton = 
      {
        id: "experience",
        text: "+ Add Experience",
      }
      let experienceInputs = [
          {
            title: "Position",
            id: "position",
            type: "text",
            required: true,
          },
          {
            title: "Company Name",
            id: "company-name",
            type: "text",
            required: true,
          },
          {
            title: "Start Month",
            id: "start-month",
            type: "month",
            required: true,
          },
          {
            title: "End Month",
            id: "end-month",
            type: "month",
            required: true,
          },
          {
            title: "I currently work here",
            id: "current",
            type: "checkbox",
            value: 'Present',
            required: false,
          },
          {
            title: "Description",
            id: "description",
            type: "textarea",
            required: true,
          },
        ]
    let skillsButton = 
      {
        id: "skills",
        text: "+ Add Skill",
      }
    let skillsInputs = [
          {
            title: "Skill",
            id: "skill",
            type: "text",
            required: true,
          },
    ]

      let buttonDict = [
        contactButton, educationButton, experienceButton, skillsButton
      ]
      let inputDict = [
        contactButtonInputs, educationInputs, experienceInputs, skillsInputs
      ]
      return (
        <div id="form">
          {this.state.responses.map((data, i) => {
            return (
              <Section
                title={data.title}
                responses={data.responses}
                index={i}
                key={i}
                formResponses={this.state.responses}
                inputs={data.title === 'Contact' ? contactInputs : []}
                length={data.title === 'Contact' ? 8 : 1}
                boxInputs={inputDict[i]}
                addButton={buttonDict[i]}
                updateForm={this.setFormState}
              />
            );
          })}
          <button
            type="button"
            id="pdf"
            onClick={(e) => this.props.updateApp({
              inputsConfirmed: true,
              responses: this.state.responses, 
              })}
          >
            Generate PDF
          </button>
        </div>
      );
  }
}
