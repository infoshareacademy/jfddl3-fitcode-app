import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
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
        kcalSlider: 280,
        catSelect: 'all',
        favUid: null,
    }

    componentWillMount() {
        fetch(
            `https://jfddl3-fitcode.firebaseio.com/products/food.json`
        )
            .then(response => response.json())
            .then(parsedJSONData => {
                    this.setState({data: Object.entries(parsedJSONData || {})});
                    this.getFavFromDb();
                }
            )
    }

    getFavFromDb = () => {
        fetch(
            `https://jfddl3-fitcode.firebaseio.com/products/favourites.json`
        )
            .then(response => response.json())
            .then(parsedJSONData => {
                    this.setState({favUid: Object.values(parsedJSONData || {})});
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

                <Paper style={{margin: 20, padding: 20}} zDepth={2}>
                    <Card>
                        <CardHeader
                            title="Filtry jedzonkowe"
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                            <TextField
                                floatingLabelText="Szukaj jedzonka..."
                                fullWidth={true}
                                onChange={this.handleFoodName}
                            />
                            <Slider
                                style={{marginBottom: 0}}
                                min={0}
                                max={300}
                                step={10}
                                value={this.state.kcalSlider}
                                onChange={this.handleKcalSlider}
                            />
                            <div><span>{this.state.kcalSlider} kcal</span></div>
                            <SelectField
                                floatingLabelText="Kategorie"
                                value={this.state.catSelect}
                                onChange={this.handleCatSelect}
                            >
                                <MenuItem value={'all'} primaryText="Wszystkie" style={{color: "#BDBDBD"}}/>
                                <MenuItem value={'Warzywa'} primaryText="Warzywa"/>
                                <MenuItem value={'Owoce'} primaryText="Owoce"/>
                                <MenuItem value={'Mięso'} primaryText="Mięso"/>
                                <MenuItem value={'Ryby'} primaryText="Ryby"/>
                                <MenuItem value={'Nabiał'} primaryText="Nabiał"/>
                                <MenuItem value={'Vege-Food'} primaryText="Vege Food"/>
                            </SelectField>
                        </CardText>
                    </Card>
                </Paper>

                <Paper style={{margin: 20, padding: 20}} zDepth={2}>
                    <List>
                        <Subheader>Nasze Jedzonka</Subheader>
                        {
                            this.state.data && this.state.data
                                .filter(([key, product]) =>
                                    product.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(this.state.foodName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) !== -1
                                    ).filter(([key, product]) => this.state.catSelect === 'all' ? true : product.category === this.state.catSelect)
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
                                                        leftAvatar={<Avatar
                                                            src={`${process.env.PUBLIC_URL}/img/${product.photo}`}
                                                        />}
                                                        rightIcon={
                                                            this.state.favUid && this.state.favUid.indexOf(key) === -1 ?
                                                                <ActionFavoriteBorder/>
                                                                :
                                                                <ActionFavorite/>
                                                        }
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