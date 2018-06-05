import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import List from "./List.js";
import Recipe from "./Recipe.js";

const App = () => (
    <Router>
        <div>
            <div>
            header goes here
            <Link to="/recipe">Recipe</Link>
            <Link to="/">back to list</Link>
            </div>
            <Route exact path="/" component={List}/>
            <Route path="/recipe" component={Recipe}/>
        </div>
    </Router>
);

export default App;
