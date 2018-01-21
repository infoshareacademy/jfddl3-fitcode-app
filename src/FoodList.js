import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
//import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardText} from 'material-ui/Card';


class FoodList extends Component {
    state = {
        data: null,
        foodName: '',
        kcalSlider: 150,
        catSelect: 'all',
    }


    componentWillMount() {
        fetch(
            `https://jfddl3-fitcode.firebaseio.com/products/food.json`
        )
            .then(response => response.json())
            .then(parsedJSONData => {
                    this.setState({data: Object.entries(parsedJSONData)});
                    console.log(Object.entries(parsedJSONData))
                }
            )
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

                <Paper
                    style={{margin: 20, padding: 20}}
                    zDepth={2}
                >
                    <Card>
                        <CardHeader
                            title="Search your foodies"
                            //subtitle="If you have any haha"
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                            <TextField
                                // hintText="Hint Text"
                                floatingLabelText="Search your foodie..."
                                fullWidth={true}
                                onChange={this.handleFoodName}
                            />
                            <Slider
                                min={0}
                                max={300}
                                step={30}
                                value={this.state.kcalSlider}
                                onChange={this.handleKcalSlider}
                            />
                            <p><span>{this.state.kcalSlider} Kcal</span></p>
                            <SelectField
                                floatingLabelText="Categories"
                                value={this.state.catSelect}
                                onChange={this.handleCatSelect}
                            >
                                <MenuItem value={'all'} primaryText="Wszystkie" style={{color: "#BDBDBD"}}/>
                                <MenuItem value={'Warzywa'} primaryText="Warzywa"/>
                                <MenuItem value={'Owoce'} primaryText="Owoce"/>
                                <MenuItem value={'Mięso'} primaryText="Mięso"/>
                                <MenuItem value={'Ryby'} primaryText="Ryby"/>
                                <MenuItem value={'Nabiał'} primaryText="Nabiał"/>
                            </SelectField>
                        </CardText>
                    </Card>
                </Paper>

                <Paper
                    style={{margin: 20, padding: 20}}
                    zDepth={2}
                >
                    <List><Subheader>Test Food List</Subheader>
                        {
                            this.state.data && this.state.data
                                .filter(([key, product]) => product.name.indexOf(this.state.foodName) !== -1)
                                .filter(([key, product]) => this.state.catSelect === 'all' ? true : product.category === this.state.catSelect)
                                .filter(([key, product]) => product.energy < this.state.kcalSlider)
                                .map(
                                    ([key, product]) => (
                                        <Link
                                            to={`/food-details/${key}`}
                                            style={{textDecoration: 'none'}}
                                            key={key}
                                        >
                                            <ListItem
                                                primaryText={product.name}
                                                secondaryText={`Kcal: ${product.energy} | ${product.category}`}
                                                leftAvatar={<Avatar src={product.photo}/>}
                                                rightIcon={<ActionFavoriteBorder/>}
                                            />
                                        </Link>
                                    ))
                        }
                    </List>
                </Paper>

            </div>
        )
    }
}

export default FoodList