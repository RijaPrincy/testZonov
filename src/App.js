import React, { Component } from 'react'



import Nav from './Component/navbar'



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: ""
    }
  }


  render() {
    return (
      <div className="app">
            <center>
              <Nav />
            </center>


      </div>
    )
  }
}
export default App;

