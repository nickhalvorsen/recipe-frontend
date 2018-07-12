import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            recipes: []
        }
    }

    componentDidMount() {
        var url = process.env.API_HOST + '/recipes'
        fetch(url, { mode: 'cors', method: 'GET'}  )
            .then(res => res.json())
            .then((result) => {
                var recipes = []

               result.forEach(recipe => {
                    recipes.push({"id": recipe._id, "title": recipe.name})
                })

                this.setState({
                    isLoaded: true
                    , recipes: recipes
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

    createNewRecipe() {
        var url = process.env.API_HOST + '/recipes'
        var emptyRecipe = { name: 'untitled', author: '', description: '' }
        fetch(url, { mode: 'cors', method: 'POST', body: JSON.stringify(emptyRecipe), headers: new Headers({'Content-Type': 'application/json'}) })
            .then(res => res.json())
            .then((result) => {
                var newUrl = '/editRecipe/' + result._id
                window.location.replace(newUrl)
            }
            , (error) => {
                alert("error creating new recipe.")
            })
    }

    render() {
        const {error, isLoaded, recipes} = this.state;

        if (error) {
            return <div>Error loading recipes: {error.message}</div>
        }
        else if (!isLoaded) {
            return <div>Loading...</div>
        }
        else {
            return (
                <div className="List">
                    <div className="intro">
                        hello! my name is mary anne and I am a real person. here are all my recipes.  
                        <div>&nbsp;</div>
                    </div>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <Link to={"/recipe/" + recipe.id}>{recipe.title}</Link>
                    </li>
                ))}
                    <div className="new-recipe-link">
                        <a className="action-link" onClick={this.createNewRecipe}>new recipe</a>
                    </div>
                </div>
            )
        }
    }
}

export default List;
