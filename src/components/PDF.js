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
        doc.text(this.props.firstName + ' ' + this.props.lastName, 10, 10)

        let x = 10
        let y = 20

        for (let i = 2; i < contacts.responses.length; i++) {
            doc.text(contacts.responses[i].value, x, y)
            y += 10
        }

        doc.text(education.title, x, y)
        y += 10

        for (const response of education.responses) {
            doc.text(response.value, x, y)
            y += 10
        }

        doc.text(employment.title, x, y)
        y += 10

        for (const response of employment.responses) {
            doc.text(response.value, x, y)
            y += 10
        }

        doc.text(skills.title, x, y)
        y += 10

        for (const response of skills.responses) {
            doc.text(response.value, x, y)
            y += 10
        }

        //let contactResponses = this.props.responses[0].responses
        doc.save(`${this.props.firstName}${this.props.lastName}Resume.pdf`)
        return doc 
    }

    render() {
        console.log(this.props.responses)
        this.generatePDF()
        //console.log(this.props.firstName + this.props.lastName + 'Resume.pdf')
        return (
            <div>
                <h1>Your resume is complete</h1>
                <p>Check your Downloads folder for a copy.</p>
            </div>
        )
    }
}