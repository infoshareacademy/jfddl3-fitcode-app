import React, {Component} from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import textCategories from './text-categories'

class FoodAdd extends Component {

    state = {
        data: null,
        value: ''
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

        // const obj = {'name': }
        //
        // console.log(obj)
        // onChange na textField -> state, value w TextField-> state

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
                            value={}
                        />
                    ))
                }

                <RaisedButton label="Dodaj" primary={true} type="submit" />
                </form>
            </div>
        )
    }
}

export default FoodAdd;