import React, {Component} from 'react';
import avatar from './static/img/avatar.jpg';
import './App.less'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from './page/Home/Home'

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="logo-container">
                        <img src={avatar} className="App-logo" alt="logo"/>
                    </div>

                    <h1 className="App-title">Keep Working, Make It Happen</h1>
                </header>
                <Router>
                    <Route path="/" component={Home}/>
                </Router>
            </div>
        );
    }
}

export default App;
