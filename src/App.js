import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import List from "./List.js";
import Recipe from "./Recipe.js";
import Header from "./Header.js";

const App = () => (
    <Router>
        <div>
            <Header/>
            <Route exact path="/" component={List}/>
            <Route path="/recipe/:id" component={Recipe}/>
        </div>
    </Router>
);

export default App;
