import React, {Component} from 'react';
import logo from './logo.svg';
import './App.less'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from './page/Home'

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    你好！To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <Router>
                    <Route path="/" component={Home}/>
                </Router>
            </div>
        );
    }
}

export default App;