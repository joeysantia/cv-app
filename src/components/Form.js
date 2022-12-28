import React, { useState } from "react";
import Section from "./Section";
import "./Form.css";

export default function Form(props) {
  const [formResponses, setFormResponses] = useState([
    { title: "Contact", boxes: [] },
    { title: "Education", boxes: [] },
    { title: "Experience", boxes: [] },
    { title: "Skills", boxes: [] },
  ]);

  function submitForm(e) {
    e.preventDefault();
    let inputs = document.querySelectorAll("input");

    if (!inputs.length) {
      props.setAppResponses(formResponses);
      props.setInputsConfirmed(true);
    } else {
      alert("Please confirm all information before generating a PDF.");
    }
  }

  let contactButton = {
    id: "website",
    text: "+ Add Website",
    inputsRendered: false,
  };
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
  let websiteInputs = [
    {
      title: "Website Label",
      class: "website-label",
      type: "text",
      required: true,
    },
    {
      title: "Website URL",
      class: "website-url",
      type: "text",
      required: true,
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
      {formResponses.map((data, i) => {
        return (
          <Section
            title={data.title}
            responses={data.responses}
            index={i}
            key={i}
            formResponses={formResponses}
            fixedInputs={data.title === "Contact" ? contactInputs : []}
            boxInputs={inputDict[i]}
            addButton={buttonDict[i]}
            setFormResponses={setFormResponses}
            set
          />
        );
      })}
      <button type="button" id="pdf" onClick={(e) => submitForm(e)}>
        Generate PDF
      </button>
    </div>
  );
}
