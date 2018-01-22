import React, {Component} from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

import textCategories from './categories'

class FoodAdd extends Component {

    state = {
        data: null,
        catSelect: "Warzywa",
        name: null,
        category: null,
        energy: null,
        protein: null,
        fats: null,
        carbo: null,
        sug: null,
        photo: null
    }

    getData = () => {
        fetch(
            'https://jfddl3-fitcode.firebaseio.com/products/food/.json',
        )
            .then(response => response.json())
            .then(parsedJSONData => {
                this.setState({
                    data: parsedJSONData
                })
            })
    }

    componentWillMount() {
        this.getData()
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const newFood = {
            name: this.state.name,
            category: this.state.catSelect,
            energy: this.state.energy,
            protein: this.state.protein,
            fat: this.state.fats,
            carbohydrate: this.state.carbo,
            sugars: this.state.sug,
            photo: this.state.photo
        }

        if (!/([A-Za-z0-9])\w+/.test(newFood.name)
            ||
            !/^([0-9])+$/.test(newFood.energy)
            ||
            !/[^\s]|([0-9])+$/.test(newFood.protein)
            ||
            !/[^\s]|([0-9])+$/.test(newFood.fat)
            ||
            !/[^\s]|([0-9])+$/.test(newFood.carbohydrate)
            ||
            !/[^\s]|([0-9])+$/.test(newFood.sugars)
        ) {
            alert('Błędne dane!')
            return
        }

        console.log(newFood)

        fetch(
            'https://jfddl3-fitcode.firebaseio.com/products/food/.json',
            {
                method: 'POST',
                body: JSON.stringify(newFood)
            }
        )
            .then(() => {
                    alert('Jedzonko dodane')
                    this.getData()
                }
            )
            .catch((error) => alert('Ups'))
    }

    handleTextChange = (event, name) => {
        const newState = {}
        newState[name] = event.target.value
        this.setState(newState)
    }

    handleCatSelect = (event, index, value) => this.setState({catSelect: value})


    render() {
        return (
            <Paper
                style={{margin: 20, padding: 20}}
                zDepth={2}
            >
                <form onSubmit={this.handleSubmit}>
                    {
                        textCategories.map(cat => (
                            <TextField
                                hintText={cat.hintText}
                                floatingLabelText={cat.floatingLabelText}
                                style={{display: 'block'}}
                                key={cat.floatingLabelText}
                                name={cat.name}
                                onChange={(e) => this.handleTextChange(e, cat.name)}
                                fullWidth={true}
                            />
                        ))
                    }

                    <SelectField
                        floatingLabelText="Categories"
                        value={this.state.catSelect}
                        onChange={this.handleCatSelect}
                        fullWidth={true}
                    >
                        <MenuItem value={'Warzywa'} primaryText="Warzywa"/>
                        <MenuItem value={'Owoce'} primaryText="Owoce"/>
                        <MenuItem value={'Mięso'} primaryText="Mięso"/>
                        <MenuItem value={'Ryby'} primaryText="Ryby"/>
                        <MenuItem value={'Nabiał'} primaryText="Nabiał"/>
                        <MenuItem value={'Vege-Food'} primaryText="Vege-Food"/>
                    </SelectField>

                    <RaisedButton label="Dodaj" primary={true} type="submit" style={{display: 'block'}}/>
                </form>
            </Paper>
        )
    }

}

export default FoodAdd;