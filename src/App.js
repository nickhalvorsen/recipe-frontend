import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import List from "./List.js";
import Recipe from "./Recipe.js";
import EditRecipe from './EditRecipe.js';
import Header from "./Header.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Site.css";


const App = () => (
    <Router>
        <div>
            <Header/>
            <Route exact path="/" component={List}/>
            <Route exact path="/recipe/:id" component={Recipe}/>
            <Route exact path="/editRecipe/:id" component={EditRecipe}/>
        </div>
    </Router>
);

export default App;
