import React, {Component} from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import textCategories from './text-categories'

class FoodAdd extends Component {

    state = {
        data: null,
        name: null,
        category: null,
        energy: null,
        protein: null,
        fats: null,
        carbo: null,
        sug: null,
        photo: null
    }

    componentWillMount() {
        fetch(
            `${process.env.PUBLIC_URL}/database.json`
        )
            .then(response => response.json())
            .then(parsedJSONData => {
                this.setState({
                    data: parsedJSONData
                })
            })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const newFood = {
            uid: Date.now(),
            name: this.state.name,
            category: this.state.category,
            energy: this.state.energy,
            protein: this.state.protein,
            fat: this.state.fats,
            carbohydrate: this.state.carbo,
            sugars: this.state.sug,
            photo: this.state.photo
        }

        console.log(newFood)

        fetch(
            `${process.env.PUBLIC_URL}/database.json`,
            {
                method: 'PATCH',
                body: JSON.stringify(newFood)
            }
        )
            .then(() => {
                    alert('Dodano task!')
                    this.componentWillMount()
                }
            )
            .catch((error) => alert('Cos poszlo nie tak'))
    }

    handleTextChange = (event, name) => {
        const newState = {}
        newState[name] = event.target.value
        this.setState(newState)
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {
                        textCategories.map(cat => (
                            <TextField
                                hintText={cat.hintText}
                                floatingLabelText={cat.floatingLabelText}
                                style={{display: 'block'}}
                                key={cat.floatingLabelText}
                                name={cat.name}
                                onChange={(e) => this.handleTextChange(e,cat.name )}
                            />
                        ))
                    }

                    <RaisedButton label="Dodaj" primary={true} type="submit"/>
                </form>
            </div>
        )
    }

}

export default FoodAdd;