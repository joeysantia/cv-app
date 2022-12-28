import React, { useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import PDF from "./components/PDF";
import "./App.css";

export default function App(props) {
  const [inputsConfirmed, setInputsConfirmed] = useState(false);
  const [appResponses, setAppResponses] = useState([]);

  if (inputsConfirmed) {
    return (
      <div>
        <Header title="CV Builder" />
        <PDF
          responses={appResponses}
          setInputsConfirmed={setInputsConfirmed}
          setAppResponses={setAppResponses}
        />
      </div>
    );
  } else {
    console.log('functions')
    return (
      <div>
        <Header title="CV Builder" />
        <Form
          responses={appResponses}
          setInputsConfirmed={setInputsConfirmed}
          setAppResponses={setAppResponses}
        />
      </div>
    );
  }
}