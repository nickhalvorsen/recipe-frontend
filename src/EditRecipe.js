import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class EditRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            recipe: {},
            changeStatus: ChangeStatusNoChanges
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleIngredientChange = this.handleIngredientChange.bind(this)
        this.handleStepChange = this.handleStepChange.bind(this)
        this.addIngredient = this.addIngredient.bind(this)
        this.addStep = this.addStep.bind(this)
        this.saveChanges = this.saveChanges.bind(this)
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
                    , title: result.name
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

    handleInputChange(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        var recipe = this.state.recipe
        recipe[name] = value

        this.setState({
            recipe
            , changeStatus: ChangeStatusChanges
        })
    }

    handleIngredientChange(event, i) {
        var recipe = this.state.recipe
        recipe.ingredients[i] = event.target.value
        this.setState({
            recipe
            , changeStatus: ChangeStatusChanges
        })
    }

    handleStepChange(event, i) {
        var recipe = this.state.recipe
        recipe.steps[i] = event.target.value
        this.setState({
            recipe
            , changeStatus: ChangeStatusChanges
        })
    }

    addIngredient() {
        var recipe = this.state.recipe
        recipe.ingredients.push('')
        this.setState({ recipe })
    }

    addStep() {
        var recipe = this.state.recipe
        recipe.steps.push('')
        this.setState({ recipe })
    }

    saveChanges() {
        this.setState({ changeStatus: ChangeStatusSaving })

        var recipe = this.state.recipe

        var body = {
            name: recipe.title
            , description: recipe.description
            , author: recipe.author
            , ingredients: recipe.ingredients
            , steps: recipe.steps
        }

        try {
            var url = process.env.API_HOST + '/recipes/' + recipe.id
            fetch(url, { mode: 'cors', method: 'PUT', body: JSON.stringify(body), headers: new Headers({'Content-Type': 'application/json'}) }  )
                .then((res) => {
                    console.log(res)
                    this.setState({ changeStatus: ChangeStatusSaved })
                }
                , (error) => {
                    throw(error)
                })
        }
        catch (e) {
            console.log(e)
            this.setState({ changeStatus: ChangeStatusSaveFailed })
        }
    }

    render() {
        const { error, isLoaded, recipe } = this.state

        if (error) {
            return <div>Error loading recipe: {error.message}</div>
        }
        else if (!isLoaded) {
            return <div>Loading...</div>
        }

        var saveButtonText = 'Save'                      
        if (this.state.changeStatus == ChangeStatusSaving) {
            saveButtonText = 'Saving...'
        }
        if (this.state.changeStatus == ChangeStatusSaved) {
            saveButtonText = 'Saved!'
        }
        if (this.state.changeStatus == ChangeStatusSaveFailed) {
            saveButtonText = 'Save failed.'
        }

        return (
            <div className="App">
                <Link to={'/recipe/' + recipe.id}>&lt; view recipe</Link>
                <h1>
                    <input name="title" value={recipe.title} placeholder="title" onChange={this.handleInputChange}/>
                </h1>
                <h3> by:&nbsp; 
                    <input name="author" value={recipe.author} placeholder="author" onChange={this.handleInputChange}/>
                </h3>
                <p>
                    description:<br/>
                        <textarea name="description" value={recipe.description} placeholder="description" onChange={this.handleInputChange}/>
                </p>
                <h2> ingredients </h2>
                <ul id="ingredients">
                    <input type="hidden" name="ingredients"/>
                    {recipe.ingredients.map((ingredient, i) => 
                        <li key={i}>
                            <input className="ingredient" value={ingredient} onChange={(e) => this.handleIngredientChange(e, i)}/>
                        </li>   
                    )}
                    <li>
                        <a className="action-link" onClick={this.addIngredient}> add ingredient </a>
                    </li>
                </ul>
                <h2> directions </h2>
                <ul id="steps">
                    <input type="hidden" name="steps"/>
                    {recipe.steps.map((step, i) => 
                        <li key={i}>
                            <input className="step" value={step} onChange={(e) => this.handleStepChange(e, i)}/>
                        </li>
                    )}
                    <li>
                        <a className="action-link" onClick={this.addStep}> add step </a>
                    </li>
                </ul>
                <input type="submit" value={saveButtonText} disabled={this.state.changeStatus == ChangeStatusNoChanges || this.state.changeStatus == ChangeStatusSaved} onClick={this.saveChanges}/>
            </div>
        )
    }
}

const ChangeStatusNoChanges = 0
const ChangeStatusChanges = 1
const ChangeStatusSaving = 2
const ChangeStatusSaveFailed = 3
const ChangeStatusSaved = 4

export default EditRecipe
