import { format } from 'date-fns'
import jsPDF from 'jspdf'
import React from 'react'

export default class PDF extends React.Component {
    constructor(props) {
        super(props)
    }



    generatePDF() {
        let [
            contacts,
            education, 
            employment,
            skills
        ] = this.props.responses

        let doc = new jsPDF()
        doc.setFontSize(32)
        doc.text(contacts.responses[0].value + ' ' + contacts.responses[1].value, 10, 10)

        let x = 10
        let y = 20

        doc.setFontSize(14)

        for (let i = 2; i < 4; i++) {
            doc.setFont('times', 'bold')
            doc.text(`${contacts.responses[i].title}:`)
            doc.setFont('times', 'normal')
            doc.text(`${contacts.responses[i].value}`, x, y)
            y += 10
        }

        doc.text(`${contacts.responses[4].value}${contacts.responses[5].title === 'Address Line 2' ? ', ' + contacts.responses[5].value : ''}`, x, y)
        y += 10

        for (let i = 6; i < contacts.responses.length; i++) {
            doc.text(contacts.responses[i].value, x, y)
            y += 10
        }

        doc.setFontSize(22)
        doc.text(education.title, x, y)
        y += 10
        doc.setFontSize(14)

        for (const response of education.responses) {
            let value = (response.type === 'month' ? format(new Date(response.value), 'LLLL y') : response.value) 
            doc.text(value, x, y)
            y += 10
        }

        doc.text(employment.title, x, y)
        y += 10

        for (const response of employment.responses) {
            let value = (response.type === 'month' ? format(new Date(response.value), 'LLLL y') : response.value) 
            doc.text(value, x, y)
            y += 10
        }

        doc.text(skills.title, x, y)
        y += 10

        for (const response of skills.responses) {
            doc.text(response.value, x, y)
            y += 10
        }

        //let contactResponses = this.props.responses[0].responses
        doc.save(`${contacts.responses[0].value}${contacts.responses[1].value}Resume.pdf`)
        return doc 
    }

    generateContacts(doc, data, x, y) {
        
    }

    generateExperience(doc, data, x, y) {

    }

    generateEducation(doc, data, x, y) {

    }

    generateSkills() {

    }

    render() {
        console.log(this.props.responses)
        this.generatePDF()
        //console.log(this.props.firstName + this.props.lastName + 'Resume.pdf')
        return (
            <div>
                <h1>Your resume is complete</h1>
                <p>Check your Downloads folder for a copy.</p>
                <button onClick={(e) => this.props.updateApp({inputsConfirmed: false })}>Edit Information</button>
            </div>
        )
    }
}