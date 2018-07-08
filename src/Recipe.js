import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "./Recipe.css";

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            recipe: {}
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;

        fetch("http://localhost:3001/recipes/" + params.id, { mode: 'cors', method: 'GET'}  )
            .then(res => res.json())
            .then((result) => {
                console.log("ajax result:");
                console.log(result);


                var recipe = {
                    title: result.name
                    , description: result.description
                    , author: result.author
                    , createdAt: result.createdAt
                    , updatedAt: result.updatedAt
                    , ingredients: result.ingredients
                    , steps: result.steps
                }

                this.setState({
                    isLoaded: true
                    , recipe: recipe
                })
            }
            , (error) => {
                console.log(error)
                this.setState({
                    isLoaded:true
                    , error
                })
            })
    }

    render() {
        const { error, isLoaded, recipe } = this.state


        if (error) {
            return <div>Error loading recipe: {error.message}</div>
        }
        else if (!isLoaded) {
            return <div>Loading...</div>
        }

        return (
            <div className="App">
                <h1>{recipe.title}</h1>
                <h3> by {recipe.author}</h3>
                <p>{recipe.description}</p>
                
            </div>
        )
    }
}

export default Recipe
