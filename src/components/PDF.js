import { format } from "date-fns";
import jsPDF from "jspdf";
import React from "react";
import './PDF.css'

export default function PDF(props){
  

  function generatePDF() {
    let [contacts, education, experience, skills] = props.responses;

    let doc = new jsPDF();
    let x = 10;
    let y = 20;
    let [newX, newY] = generateContacts(contacts.boxes, doc, x, y);
   
    let [newerX, newerY] = generateEducation(
      education.boxes,
      doc,
      newX,
      newY
    );
    
    let [newestX, newestY] = generateExperience(experience.boxes, doc, newerX, newerY)
    generateSkills(skills.boxes, doc, newestX, newestY)
    doc.save(`${contacts.boxes[0].inputs[0].value}${contacts.boxes[0].inputs[1].value}Resume.pdf`)
    doc.autoPrint();
    doc.output('dataurlnewwindow')
    return doc;
  }

  function generateContacts(boxes, doc, x, y) {
    
    let contactInfo = boxes[0].inputs
    let i = 0;
    doc.setFontSize(32);
    doc.setFont("Courier", "bold");
    doc.text(contactInfo[i++].value + " " + contactInfo[i++].value, 10, 10);

    doc.setFontSize(14);
    doc.setFont("Courier", "normal");

    while (i < 4) {
      doc.setFont("Courier", "bold");
      doc.text(`${contactInfo[i].title.slice(0, 5)}:`, x, y);
      doc.setFont("Courier", "normal");
      doc.text(`${contactInfo[i++].value}`, x + 20, y);
      y += 10;
    }

    doc.text(
      `${contactInfo[i++].value}${
        contactInfo[i].title === "Address Line 2"
          ? ", " + contactInfo[i++].value
          : ""
      }`,
      x + 100,
      y - 20
    );
    doc.text(
      contactInfo[i++].value + ", " + contactInfo[i++].value,
      x + 100,
      y - 10
    );

    for (let i = 1; i < boxes.length; i++) {
      let website = boxes[i].inputs
      console.log('website:', website)
      doc.setFont("Courier", "bold");
        doc.text(`${website[0].value}:`, x, y);
        doc.setFont("Courier", "normal");
        doc.text(`${website[1].value}`, x + 35, y);
        y += 10;
    }

    return [x, y];
  }

  function generateEducation(boxes, doc, x, y) {
   if (boxes.length === 0) {
    return [x, y]
   } 
    doc.setFont("Courier", "bold");
    doc.setFontSize(24);
    y += 10;
    doc.text("Education", x, y);
    y += 10;
    doc.setFont("Courier", "normal");
    doc.setFontSize(14);

    for (let i = 0; i < boxes.length; i++) {
      let entry = boxes[i].inputs

      doc.setFont("Courier", "bold");
      doc.text(format( new Date(entry[2].value), "LLL y"), x, y);
      doc.text(
        " - " + format(new Date(entry[3].value), "LLL y"),
        x + 23,
        y
      );
      doc.text(
        entry[4].value +
          " " +
          entry[5].value +
          ", " +
          entry[0].value,
        x + 70,
        y
      );
      doc.setFont("Courier", "normal");

      doc.text(entry[1].value, x + 70, y + 10);
      doc.text(entry[6].value, x + 70, y + 20);
      
      y += 30
    }

    return [x, y];
  }

  function generateExperience(boxes, doc, x, y) {
    if (boxes.length === 0) {
      return [x, y]
    }
    doc.setFont("Courier", "bold");
    doc.setFontSize(24);
    y += 10;
    doc.text("Experience", x, y);
    y += 10;
    doc.setFont("Courier", "normal");
    doc.setFontSize(14);

    for (let i = 0; i < boxes.length; i++) {
      let job = boxes[i].inputs

      doc.setFont("Courier", "bold");
      doc.text(format( new Date(job[2].value), "LLL y"), x, y);
      doc.text(
        " - " + (job[3].value === 'Present' ? 'Present' : format( new Date(job[3].value), "LLL y")),
        x + 23,
        y
      );
      doc.text(job[0].value, x + 70, y)
      doc.setFont('Courier', 'normal')
      doc.text(job[1].value, x + 70, y + 10)
      doc.text(job[5].value, x + 70, y + 20)

      y += 30

    }
  
    return [x, y]
  }
  

  function generateSkills(boxes, doc, x, y) {
    if (boxes.length === 0) {
      return [x, y]
    }
    doc.setFont("Courier", "bold");
    doc.setFontSize(24);
    y += 10;
    doc.text("Skills", x, y);
    y += 10;
    doc.setFont("Courier", "normal");
    doc.setFontSize(14);
    for (let i = 0; i < boxes.length; i++) {
        if (i % 2 === 0) {
            doc.text(boxes[i].inputs[0].value, x, y)
        } else {
            doc.text(boxes[i].inputs[0].value, x + 70, y)
            y += 10
        }
    }
  }

  function printPDF(doc) {
    doc.autoPrint();
    doc.output('dataurlnewwindow')
  }
  

  let doc = generatePDF();
    return (
      <div id='pdf-page'>
        <h1>Your resume is complete.</h1>
        <p>Check your Downloads folder for a copy. You may also print it by clicking<button onClick={(e) => printPDF(doc)}>here.</button></p>
        <button
          onClick={(e) => props.setInputsConfirmed(false)}
        >
          Edit Information
        </button>
      </div>
    );
  
}
 