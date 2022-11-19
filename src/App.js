import React from 'react'
import Header from './components/Header'
import Form from './components/Form'
import './App.css'

export default class App extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      inReview: false 
    }

  }

  render() {
    if (this.state.inReview) {
      return <div></div>
    } else {
      return (
        <div>
        <Header title='CV Builder' />
        <Form />
      </div>
      )
    }
  }
}
