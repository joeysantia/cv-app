import jsPDF from 'jspdf'
import React from 'react'

export default class PDF extends React.Component {
    constructor(props) {
        super(props)
    }

    generatePDF() {
        let doc = new jsPDF()
        let contactResponses = this.props.responses[0].responses

        doc.text(this.props.firstName + ' ' + this.props.lastName, 10, 10)
        doc.text(contactResponses[3].value, 10, 20)
        doc.text(contactResponses[4].value, 10, 30)
        doc.text(contactResponses[5].value, 10, 40)
        doc.text(contactResponses[6].value, 10, 50)
        doc.text(contactResponses[7].value, 10, 60)
        
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