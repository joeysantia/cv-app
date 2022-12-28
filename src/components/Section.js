import React, { useState } from "react";
import Box from "./Box";
import "./Section.css";

export default function Section(props) {
  const [boxes, setBoxes] = useState(
    props.fixedInputs.length
      ? [{ isFixed: true, inputs: props.fixedInputs }]
      : []
  );

  function addBox() {
    let boxInputs = JSON.parse(JSON.stringify(props.boxInputs));

    setBoxes([...boxes, { isFixed: false, inputs: boxInputs }]);
  }

  function generateBoxes(boxes) {
    return (
      <div className="box-box">
        {boxes.map((box, i) => {
          return (
            <Box
              key={i}
              index={i}
              id={`${props.title}-${i}`}
              responses={box.inputs}
              formResponses={props.formResponses}
              setBoxes={setBoxes}
              setFormResponses={props.setFormResponses}
              sectionBoxes={boxes}
              sectionIndex={props.index}
              isFixed={box.isFixed}
            />
          );
        })}
      </div>
    );
  }
  return (
    <div id={props.title}>
      <h2>{props.title}</h2>
      {generateBoxes(boxes)}
      <div className="button-box">
        <button type="button" onClick={(e) => addBox(e)}>
          {props.addButton.text}
        </button>
      </div>
    </div>
  );
}
