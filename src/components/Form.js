import React from "react";
import Section from "./Section";
import "./Form.css";

export default class Form extends React.Component {

  /**
   * 
   * Props:
   * 1. updateForm: function that allows responses to be sent to App
   * (currently I have responses inherited as props from the App - but I think these can be removed!)
   * 
   * State:
   * 1. responses: array with responses passed up from each section
   * 
   * Functions
   * 1. updateForm - allows the sections to send responses to the form
   * 2. render - creates one Section for each section in the sectionDict.
   * 
   */
  constructor(props) {
    super(props);

    this.state = {
      responses: [
        {
          title: "Contact",
          responses: [/*
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
            },*/
          ],
        },
        { title: "Education", responses: [] },
        { title: "Experience", responses: [] },
        { title: "Skills", responses: [] },
      ],
    };
    this.updateForm = this.setState.bind(this);
  }

  render() {
    let contactInputs = [
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
    ]
    let contactButton = {
      id: "website",
      text: "+ Add Website",
      inputsRendered: false,
    };
    let websiteInputs = [
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
    ];

    let educationButton = {
      id: "education",
      text: "+ Add Education",
    };
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
    ];

    let experienceButton = {
      id: "experience",
      text: "+ Add Experience",
    };
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
        value: "Present",
        required: false,
      },
      {
        title: "Description",
        id: "description",
        type: "textarea",
        required: true,
      },
    ];
    let skillsButton = {
      id: "skills",
      text: "+ Add Skill",
    };
    let skillsInputs = [
      {
        title: "Skill",
        id: "skill",
        type: "text",
        required: true,
      },
    ];

    let buttonDict = [
      contactButton,
      educationButton,
      experienceButton,
      skillsButton,
    ];
    let inputDict = [
      websiteInputs,
      educationInputs,
      experienceInputs,
      skillsInputs,
    ];
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
              //inputs={data.title === "Contact" ? contactInputs : []}
              fixedInputs={data.title === "Contact" ? contactInputs : []}
              //fixedBoxInputs={data.title === "Contact" ? contactInputs : []}
              boxInputs={inputDict[i]}
              addButton={buttonDict[i]}
              updateForm={this.updateForm}
            />
          );
        })}
        <button
          type="button"
          id="pdf"
          onClick={(e) =>
            this.props.updateApp({
              inputsConfirmed: true,
              responses: this.state.responses,
            })
          }
        >
          Generate PDF
        </button>
      </div>
    );
  }
}
