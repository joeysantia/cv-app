import React, { useState } from "react";
import "./Box.css";
import deleteIcon from "../img/delete.png";
import editIcon from "../img/edit.png";
import { format } from "date-fns";
import Input from "./Input";

export default function Box(props) {
  const [isStaged, setIsStaged] = useState(false);
  const [responses, setResponses] = useState(props.responses);

  function deleteBox(i) {
    let boxes = JSON.parse(JSON.stringify(props.sectionBoxes));

    props.setBoxes([...boxes.slice(0, i), ...boxes.slice(i + 1)]);
  }

  function confirmResponses(e) {
    e.preventDefault();
    let curInputs = document.querySelectorAll(
      `#${props.id} input, #${props.id} select, #${props.id} textarea`
    );

    let sectionBoxes = JSON.parse(JSON.stringify(props.sectionBoxes));
    let curResponses = JSON.parse(JSON.stringify(responses));

    for (let i = 0; i < curInputs.length; i++) {
      if (curInputs[i].type === "checkbox" && curInputs[i].checked) {
        curResponses[3].value = "Present";
        sectionBoxes[props.index].inputs[3].value = "Present";
        continue;
      }

      sectionBoxes[props.index].inputs[i].value = curInputs[i].value;
      curResponses[i].value = curInputs[i].value;
    }

    setIsStaged(true);
    setResponses(curResponses);

    props.setBoxes(sectionBoxes);

    let formResponses = JSON.parse(JSON.stringify(props.formResponses));
    formResponses[props.sectionIndex].boxes = sectionBoxes;
    props.setFormResponses(formResponses);
  }

  if (isStaged) {
    return (
      <div id={props.id} index={props.index} className="mini-form">
        {!props.isFixed ? (
          <img
            src={deleteIcon}
            className="delete"
            alt="delete"
            onClick={(e) => deleteBox(props.index)}
          />
        ) : null}
        <img
          src={editIcon}
          className="edit"
          alt="edit"
          onClick={(e) => setIsStaged(false)}
        />
        {responses.map((response, i) => {
          if (response.type !== "checkbox" && response.value) {
            let value = response.value;

            if (response.type === "month" && value !== "Present") {
              value = format(new Date(response.value), "LLLL y");
            }

            return (
              <div key={i}>
                <h3>{response.title}</h3>
                <p>{value}</p>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  } else {
    return (
      <form
        id={props.id}
        index={props.index}
        className="mini-form"
        onSubmit={(e) => confirmResponses(e)}
      >
        <div className="delete-box">
          {!props.isFixed ? (
            <img
              src={deleteIcon}
              className="delete"
              alt="delete"
              onClick={(e) => deleteBox(props.index)}
            />
          ) : null}
        </div>
        {responses.map((response, i) => {
          return (
            <Input
              key={i}
              title={response.title}
              type={response.type}
              className={response.class}
              name={response.id}
              htmlFor={response.id}
              id={response.id}
              index={i}
              value={response.value}
              required={response.required}
            />
          );
        })}

        <button type="submit">Confirm</button>
      </form>
    );
  }
}
