import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <Link to="/"> 
                    <div className="header-text"> mary anne's recipes website! </div>
                </Link>
            </div>
        );
    }
}

export default Header;
