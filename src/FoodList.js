import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';

import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';



class FoodList extends Component {
    state = {
        data: null,
        foodName: '',
        kcalSlider: 150,
        catSelect: 'all',
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


    handleFoodName = (event, value) => {
        this.setState({foodName: value});
    };

    handleKcalSlider = (event, value) => {
        this.setState({kcalSlider: value});
    };

    handleCatSelect = (event, index, value) => this.setState({catSelect: value})

    render() {
        return (
            <div>

                <div>
                    <TextField
                        // hintText="Hint Text"
                        floatingLabelText="Search your foodie..."
                        onChange={this.handleFoodName}
                    />
                    <p>
                        <span>{this.state.foodName} , you say</span>
                    </p>
                    <Slider
                        min={0}
                        max={300}
                        step={30}
                        value={this.state.kcalSlider}
                        onChange={this.handleKcalSlider}
                    />
                    <p>
                        <span>{this.state.kcalSlider} Kcal</span>
                    </p>
                    <SelectField
                        floatingLabelText="Categories"
                        value={this.state.catSelect}
                        onChange={this.handleCatSelect}
                    >
                        <MenuItem value={'warzywa'} primaryText="warzywa" />
                        <MenuItem value={'owoce'} primaryText="owoce" />
                        <MenuItem value={3} primaryText="mieso" />
                        <MenuItem value={4} primaryText="ryby" />
                        <MenuItem value={5} primaryText="nabial" />
                    </SelectField>
                </div>


                <List><Subheader>Test Food List</Subheader>
                {
                    this.state.data && this.state.data
                        .filter(product => product.name.indexOf(this.state.foodName) !== -1)
                        .filter(product => this.state.catSelect === 'all' ? true : product.category === this.state.catSelect)
                        .filter(product => product.energy < this.state.kcalSlider )
                        .map(
                            product => (
                                <Link
                                    to={`/food-details/${product.uid}`}
                                    style={{textDecoration: 'none'}}
                                    key={product.uid}
                                >
                                    <ListItem
                                        primaryText={product.name}
                                        secondaryText={`Kcal: ${product.energy} | ${product.category}`}
                                        leftAvatar={<Avatar src={product.photo}/>}
                                        rightIcon={<ActionFavorite/>}
                                    />
                                </Link>
                            ))
                }
            </List>

            </div>
        )
    }
}

export default FoodList