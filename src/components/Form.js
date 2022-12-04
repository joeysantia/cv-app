import React from "react";
import FixedFields from "./FixedFields";
import ButtonFields from "./ButtonFields";
import Summary from "./Summary";
import "./Form.css";

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

  changeForm(e, sectionTitle, sectionButton) {
    e.preventDefault();

    let data = document.getElementById(sectionTitle);
    let curResponses = {
      title: sectionTitle,
      addButton: sectionButton,
      responses: [],
    };
    for (const element of data.elements) {
      if (element.name !== "" && element.value !== "") {
        curResponses.responses.push({
          title: element.name,
          value: element.value,
          id: element.id,
          name: element.name,
          type: element.type,
          required: element.required,
        });
      }
    }

    let titleMap = {
      Contact: "contactsSubmitted",
      Education: "educationSubmitted",
      Experience: "experienceSubmitted",
      Skills: "skillsSubmitted",
    };

    this.setState({
      responses: [...this.state.responses, curResponses],
      [titleMap[sectionTitle]]: true,
    });
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
    ];

    let contactButton = 
      {
        id: "website",
        text: "+ Add Website",
        inputsRendered: false,
      }
    let contactButtonInputs = [
          {
            title: "Website Label",
            id: "website-label",
            type: "text",
            required: false,
          },
          {
            title: "Website URL",
            id: "website-url",
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

    //this quasi-switch statement can probably be
    //solved with a dict, but not sure how yet.
    
    if (this.state.skillsSubmitted) {
      let buttonDict = [
        contactButton, educationButton, experienceButton, skillsButton
      ]
      let inputDict = [
        contactButtonInputs, educationInputs, experienceInputs, skillsInputs
      ]
      return (
        <div>
          {this.state.responses.map((data, i) => {
            return (
              <Summary
                title={data.title}
                responses={data.responses}
                index={i}
                key={i}
                formResponses={this.state.responses}
                inputs={inputDict[i]}
                addButton={buttonDict[i]}
                updateForm={this.setFormState}
              />
            );
          })}
          <button
            type="button"
            onClick={(e) => this.props.updateApp({
               inputsConfirmed: true,
               responses: this.state.responses  
              })}
          >
            Generate PDF
          </button>
        </div>
      );
    } else if (this.state.experienceSubmitted) {
      return (
        <form
          id="Skills"
          onSubmit={(e) => this.changeForm(e, "Skills", skillsButton)}
        >
          
          <ButtonFields
            title="Skills"
            button={skillsButton}
            inputs={skillsInputs}
            name="Skills"
            nextSectionText="Review"
            sendResponses={this.setFormState}
            prevResponses={this.state.responses}
          />
        </form>
      );
    } else if (this.state.educationSubmitted) {
      return (
        <form
          id="Experience"
          onSubmit={(e) =>
            this.changeForm(e, "Experience", experienceButton)
          }
        >
          
          <ButtonFields
            title="Experience"
            button={experienceButton}
            inputs={experienceInputs}
            name="Experience"
            nextSectionText="Move on to Skills"
            sendResponses={this.setFormState}
            prevResponses={this.state.responses}
          />
          
        </form>
      );
    } else if (this.state.contactsSubmitted) {
      return (
        <form
          id="Education"
          onSubmit={(e) => this.changeForm(e, "Education", educationButton)}
        >
          
          <ButtonFields
            title="Education"
            button={educationButton}
            inputs={educationInputs}
            name="Education"
            nextSectionText="Move on to Experience"
            sendResponses={this.setFormState}
            prevResponses={this.state.responses}
          />
          
        </form>
      );
    } else {
      return (
        <form
          id="Contact"
          onSubmit={(e) => this.changeForm(e, "Contact", contactButton)}
        >
          <FixedFields title='Contact' inputs={contactInputs} />
          <ButtonFields
            button={contactButton}
            inputs={contactButtonInputs}
            name="Contact"
            nextSectionText="Move on to Education"
            sendResponses={this.setFormState}
            prevResponses={this.state.responses}
          />
        </form>
      );
    }
  }
}
