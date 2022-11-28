import jsPDF from 'jspdf'
import React from 'react'

export default class PDF extends React.Component {
    constructor(props) {
        super(props)
    }

    generatePDF() {
        let doc = new jsPDF()
        doc.text('hello world!', 10, 10)
        //doc.save('test.pdf')
        doc.save(`${this.props.firstName}${this.props.lastName}Resume.pdf`)
        return doc 
    }

    render() {
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