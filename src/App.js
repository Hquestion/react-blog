import React, {Component} from 'react';
import avatar from './static/img/avatar.jpg';
import './App.less'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './page/Home/Home'
import ArticleDetail from "./page/ArticleDetail/ArticleDetail";

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
                <div className="App-main">
                    <Router>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route path="/article-detail/:id" component={ArticleDetail}/>
                        </Switch>
                    </Router>
                </div>
                <footer>
                    <div>The fool says drame will never come true.&nbsp;&nbsp;---Allen Iverson</div>
                </footer>
            </div>
        );
    }
}

export default App;
