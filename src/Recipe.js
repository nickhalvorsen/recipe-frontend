import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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

        fetch(process.env.API_HOST + '/recipes/' + params.id, { mode: 'cors', method: 'GET'}  )
            .then(res => res.json())
            .then((result) => {
                console.log("ajax result:");
                console.log(result);

                var recipe = {
                    id: result._id
                    , title: this.isNullOrWhitespace(result.name) ? "untitled" : result.name
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

    isNullOrWhitespace(str) {
        return !str || !str.trim()
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
                <div>
                    <Link to='/'>&lt; view list</Link>
                </div>
                <h1 className="recipe-title">{recipe.title}</h1>
                <h3 className="recipe-author"> by {recipe.author}</h3>
                <p className="recipe-description">"{recipe.description}"</p>
                <h2> ingredients </h2>
                <ul>
                    {recipe.ingredients.map((ingredient, i) => 
                        <li key={i}>{ingredient}</li>   
                    )}
                </ul>
                <h2> directions </h2>
                <ul>
                    {recipe.steps.map((step, i) => 
                        <li key={i}>{step}</li>
                    )}
                </ul>
                <div>
                    <Link to={'/editrecipe/' + this.state.recipe.id}>edit recipe</Link>
                </div>
            </div>
        )
    }
}

export default Recipe
