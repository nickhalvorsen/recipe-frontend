import React, { Component } from "react";
import "./List.css";

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
        var recipes = new Array();
        recipes.push({"id": 1, "title": "howards cherry pie"})
        this.setState({
            isLoaded: true
            , recipes: recipes
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
               <div classname="List">
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        {recipe.title}
                    </li>
                ))}
                </div>
            )
        }
    }
}

export default List;
