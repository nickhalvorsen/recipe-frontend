import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "./Header.css";

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <Link to="/"> 
                    <h1> welcome to mary annes recipes website! </h1>
                </Link>
            </div>
        );
    }
}

export default Header;
