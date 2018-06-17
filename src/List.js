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
        fetch("http://localhost:3001/recipes", { mode: 'cors', method: 'GET'}  )
            .then(res => res.json())
            .then((result) => {
                console.log("ajax result:");
                console.log(result);

                var recipes = new Array();

                result.forEach(recipe => {
                    recipes.push({"id": recipe._id, "title": recipe.name})
                    console.log(recipe)
                })

                this.setState({
                    isLoaded: true
                    , recipes: recipes
                })

            }
            , (error) => {
                console.log(error);
                this.setState({
                    isLoaded:true
                    , error
                });
            });
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
