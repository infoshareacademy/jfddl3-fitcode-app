import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment'
import MealRemove from './MealRemove'

import {connect} from 'react-redux'

class MealPlanList extends Component {
    render() {
        return (
            <Paper style={{margin: 20, padding: 20}} zDepth={2}>
                <Subheader>{this.props.mealType}</Subheader>
                {
                    this.props.mealsData
                    &&
                    this.props.mealsData[this.props.mealDate][this.props.mealType]
                    &&
                    this.props.mealsData[this.props.mealDate][this.props.mealType]
                        .map((el) => {
                            return (
                                <div key={el}>
                                    {
                                        this.props.foodData && this.props.foodData
                                            .filter(([key, product]) => el === key)
                                            .map(([key, product]) =>
                                                <ListItem
                                                    key={el}
                                                    primaryText={product.name}
                                                    secondaryText={`Kcal: ${product.energy} | ${product.category}`}
                                                    leftAvatar={<Avatar
                                                        src={`${process.env.PUBLIC_URL}/img/${product.photo}`}/>}
                                                    rightIcon={<MealRemove foodId={el}/>}
                                                />
                                            )
                                    }
                                </div>
                            )
                        })
                }
            </Paper>
        )
    }
}


class MealPlan extends Component {
    state = {
        mealDate: null
    };

    handleMealDate = (n, date) => this.setState({mealDate: moment(date).format("YYYYMMDD")})

    render() {
        return (
            <div>
                <Paper style={{margin: 20, padding: 20}} zDepth={2}>
                    <DatePicker
                        hintText="Wybierz dzien"
                        onChange={this.handleMealDate}
                    />
                </Paper>

                <div>
                    {
                        this.state.mealDate && this.props.mealsData[this.state.mealDate] ?
                            <div>
                                <List>
                                    <MealPlanList
                                        mealType={"sniadanie"}
                                        mealDate={this.state.mealDate}
                                        mealsData={this.props.mealsData}
                                        foodData={this.props.foodData}
                                    />
                                </List>
                                <List>
                                    <MealPlanList
                                        mealType={"sniadanie2"}
                                        mealDate={this.state.mealDate}
                                        mealsData={this.props.mealsData}
                                        foodData={this.props.foodData}
                                    />
                                </List>
                                <List>
                                    <MealPlanList
                                        mealType={"obiad"}
                                        mealDate={this.state.mealDate}
                                        mealsData={this.props.mealsData}
                                        foodData={this.props.foodData}
                                    />
                                </List>
                                <List>
                                    <MealPlanList
                                        mealType={"podwieczorek"}
                                        mealDate={this.state.mealDate}
                                        mealsData={this.props.mealsData}
                                        foodData={this.props.foodData}
                                    />
                                </List>
                                <List>
                                    <MealPlanList
                                        mealType={"kolacja"}
                                        mealDate={this.state.mealDate}
                                        mealsData={this.props.mealsData}
                                        foodData={this.props.foodData}
                                    />
                                </List>
                            </div>
                            :
                            <Paper style={{margin: 20, padding: 20}} zDepth={2}>
                                <h1 style={{textAlign: 'center'}}>Brak posilkow<br/>:(</h1>
                            </Paper>
                    }
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    foodData: state.products.productsData,
    mealsData: state.meals.mealsData
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MealPlan)