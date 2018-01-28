import React from 'react';
import {connect} from 'react-redux'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

import textCategories from './categories'
import {pushToDatabase} from './foodAdd'

class FoodAdd extends React.Component {
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

        render()
        {
            return (
                <Paper
                    style={{margin: 20, padding: 20}}
                    zDepth={2}
                >
                    <form onSubmit={this.handleSubmit && this.props.toDatabaseClick}>
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
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    toDatabaseClick: () => dispatch(pushToDatabase())
})

export const newFood = this.newFood

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FoodAdd)