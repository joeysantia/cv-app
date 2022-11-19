import React from "react";
import FixedFields from "./FixedFields";
import ButtonFields from "./ButtonFields";
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

  inputIsValid() {
    console.log(this);
    this.setState({
      canAddInput: true,
    });
  }

  changeForm(e, sectionTitle, sectionButtons) {
    e.preventDefault();
    console.log("wait, what?");

    let data = document.getElementById(sectionTitle);
    let curResponses = {
      title: sectionTitle,
      addButton: sectionButtons,
      responses: [],
    };
    for (const element of data.elements) {
      if (element.name !== "" && element.value !== "") {
        curResponses.responses.push({
          title: element.name,
          value: element.value,
          id: element.id,
          name: element.name,
          placeholder: element.value, 
          type: element.type,
          required: element.required,
        })
      }
    }

    let titleMap = {
      Contact: "contactsSubmitted",
      Education: "educationSubmitted",
      "Employment History": "employmentSubmitted",
      Skills: "skillsSubmitted",
    };

    this.setState({
      responses: [...this.state.responses, curResponses],
      [titleMap[sectionTitle]]: true,
    });
  }

  render() {
    console.log(this.state);
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
        inputs: [
          {
            title: "Website Label",
            id: "website-label",
            type: "text",
            class: "website-label",
            required: false,
            //onInput: this.inputIsValid,
          },
          {
            title: "Website URL",
            id: "website-url",
            type: "text",
            class: "website-url",
            required: false,
            //onInput: this.inputIsValid,
          },
        ],
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
            return (
              <Summary
                title={data.title}
                responses={data.responses}
                index={index}
                formResponses={this.state.responses}
                addButton={data.addButton}
                updateForm={this.setFormState}
              />
            );
          })}
          <button type='button'>Generate PDF</button>
        </div>
      );
    } else if (this.state.employmentSubmitted) {
      return (
        <form
          id="Skills"
          onSubmit={(e) => this.changeForm(e, "Skills", skillsButtons)}
        >
          <ButtonFields
            title="Skills"
            inputs={skillsInputs}
            buttons={skillsButtons}
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
          id="Employment History"
          onSubmit={(e) =>
            this.changeForm(e, "Employment History", employmentButtons)
          }
        >
          <ButtonFields
            title="Employment History"
            inputs={employmentInputs}
            buttons={employmentButtons}
            name="Education"
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
          onSubmit={(e) => this.changeForm(e, "Education", educationButtons)}
        >
          <ButtonFields
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
        </form>
      );
    } else {
      return (
        <form
          id="Contact"
          onSubmit={(e) => this.changeForm(e, "Contact", contactButtons)}
        >
          <FixedFields inputs={contactInputs} />
          <ButtonFields
            inputs={[]}
            buttons={contactButtons}
            name="Contact"
            nextSectionText="Move on to Education"
            addResponses={this.setFormState}
            nextSection={this.nextSection}
            sendResponses={this.setFormState}
            prevResponses={this.state.responses}
          />
        </form>
      );
    }
  }
}
