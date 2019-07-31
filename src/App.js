import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Store from './Store/store'


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
        <Provider store={Store}>
          <div >
            <center>
              <Nav />
            </center>
          </div>


        </Provider>


      </div>
    )
  }
}
export default App;

