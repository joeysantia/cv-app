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

        console.log(contacts)

        let doc = new jsPDF()
        let x = 10
        let y = 20
        let [newX, newY] = this.generateContacts(contacts.responses, doc, x, y)
        let [newerX, newerY] = this.generateEducation(education.responses, doc, newX, newY)       
        //doc.save(`${contacts.responses[0].value}${contacts.responses[1].value}Resume.pdf`)*/
        doc.autoPrint()
        doc.output('dataurlnewwindow')
        return doc 
    }

    generateContacts(responses, doc, x, y) {
        let i = 0
        doc.setFontSize(32)
        doc.setFont('Courier', 'bold')
        doc.text(responses[i++].value + ' ' + responses[i++].value, 10, 10)

        doc.setFontSize(14)
        doc.setFont('Courier', 'normal')

        while (i < 4) {
            doc.setFont('Courier', 'bold')
            doc.text(`${responses[i].title.slice(0, 5)}:`, x, y)
            doc.setFont('Courier', 'normal')
            doc.text(`${responses[i++].value}`, x + 20, y)
            y += 10
        }

        console.log(responses[i].value)
        doc.text(`${responses[i++].value}${responses[i].title === 'Address Line 2' ? ', ' + responses[i++].value : ''}`, x + 100, y - 20)
        doc.text(responses[i++].value + ', ' + responses[i++].value, x + 100, y - 10)
        
        if (i < responses.length) {
            while (i < responses.length){
                doc.setFont('Courier', 'bold')
            doc.text(`${responses[i++].value}:`, x, y)
            doc.setFont('Courier', 'normal')
            doc.text(`${responses[i].value}`, x + 25, y)
            y += 10
            }
        }
        

        return [x, y]
    }

    generateEducation(responses, doc, x, y) {
        doc.setFont('Courier', 'bold')
        doc.setFontSize(24)
        y += 10
        doc.text('Education', x, y)
        y += 10
        doc.setFont('Courier', 'normal')
        doc.setFontSize(14)

        let i = 0
        while (i < responses.length) {
            doc.setFont('Courier', 'bold')
            doc.text(format(new Date(responses[i + 2].value), 'LLL y'), x, y)
            doc.text(' - ' + format(new Date(responses[i + 3].value), 'LLL y'), x + 23, y)
            doc.text(responses[i + 4].value + ' ' + responses[i + 5].value + ', ' + responses[i].value, x + 70, y)
            doc.setFont('Courier', 'normal')

            doc.text(responses[i + 1].value, x + 70, y + 10)
            doc.text(responses[i + 6].value, x + 70, y + 20)
            
            i += 8
        }
        

        

        return [x, y]
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