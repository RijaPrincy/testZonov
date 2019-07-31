import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './home'



class navbar extends Component {




    render() {
        return (
            <Router>
                <div>
                   

                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <h1 class="navbar-brand" style={{fontSize:"50px"}} >Mybook</h1>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                                {/* <Link class="nav-item nav-link active" to="/">Home <span class="sr-only">(current)</span></Link> */}
                               
                            </div>
                        </div>
                    </nav>
                    <div class="wrapper">

                        

                    </div>
                    <div >
                   

                </div>
                    <div className="container">
                        <Route path="/"  exact component={Home}></Route>
                    </div>
                    
                   
                </div>
            </Router>

        )
    }
}


export default navbar

