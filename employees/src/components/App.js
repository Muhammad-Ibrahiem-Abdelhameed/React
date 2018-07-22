import React, { Component } from 'react';
import Link from 'react-router-link';
import logo from '../logo.svg';
import './App.css';
import Home from './Home/Home';
import CreateEmployee from './CreateEmployee/CreateEmployee';

class App extends Component {

    state = {
        view : 'Home'
    };

    renderCreateEmployee = () =>{
        this.setState({
            view : 'CreateEmployee'
        });
    };

    renderHome = () => {
        this.setState({
            view : 'Home'
        });
    };

  render() {
    return (
      <div className="App">
          <h1>Employees Api</h1>

          {
              this.state.view === 'Home' ?
                  <div>
                      <Home click={this.renderCreateEmployee}/>
                  </div>
              : this.state.view === 'CreateEmployee' ?
                  <div>
                      <div style={{marginBottom:'20px'}}>
                          <button id="btnCreate" className={"btn btn-info"} onClick={this.renderHome}>
                               Home
                          </button>
                      </div>
                      <CreateEmployee/>
                  </div>

              : null
          }
      </div>
    );
  }
}

export default App;
