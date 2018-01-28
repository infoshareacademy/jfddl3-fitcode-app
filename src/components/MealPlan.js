import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment'

import {connect} from 'react-redux'


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
                            <List>
                                <Paper style={{margin: 20, padding: 20}} zDepth={2}>
                                    <Subheader>Sniadanie</Subheader>
                                    {
                                        this.props.mealsData[this.state.mealDate]["sniadanie"]
                                        &&
                                        this.props.mealsData[this.state.mealDate]["sniadanie"]
                                            .map((el) => {
                                                return (
                                                    <Link
                                                        to={`/food-details/${el}`}
                                                        style={{textDecoration: 'none'}}
                                                        key={el}
                                                    >
                                                        <ListItem
                                                            primaryText={el}
                                                            leftAvatar={<Avatar color="#fff" icon={<ActionAndroid/>}/>}
                                                        />
                                                    </Link>
                                                )
                                            })
                                    }
                                </Paper>
                                <Paper style={{margin: 20, padding: 20}} zDepth={2}>
                                    <Subheader>Drugie Sniadanie</Subheader>
                                    {
                                        this.props.mealsData[this.state.mealDate]["sniadenie2"]
                                        &&
                                        this.props.mealsData[this.state.mealDate]["sniadenie2"]
                                            .map((el) => {
                                                return (
                                                    <Link
                                                        to={`/food-details/${el}`}
                                                        style={{textDecoration: 'none'}}
                                                        key={el}
                                                    >
                                                        <ListItem
                                                            primaryText={el}
                                                            leftAvatar={<Avatar color="#fff" icon={<ActionAndroid/>}/>}
                                                        />
                                                    </Link>
                                                )
                                            })
                                    }
                                </Paper>
                                <Paper style={{margin: 20, padding: 20}} zDepth={2}>
                                    <Subheader>Obiad</Subheader>
                                    {
                                        this.props.mealsData[this.state.mealDate]["obiad"]
                                        &&
                                        this.props.mealsData[this.state.mealDate]["obiad"]
                                            .map((el) => {
                                                return (
                                                    <Link
                                                        to={`/food-details/${el}`}
                                                        style={{textDecoration: 'none'}}
                                                        key={el}
                                                    >
                                                        <ListItem
                                                            primaryText={el}
                                                            leftAvatar={<Avatar color="#fff" icon={<ActionAndroid/>}/>}
                                                        />
                                                    </Link>
                                                )
                                            })
                                    }
                                </Paper>
                                <Paper style={{margin: 20, padding: 20}} zDepth={2}>
                                    <Subheader>Podwieczorek</Subheader>
                                    {
                                        this.props.mealsData[this.state.mealDate]["podwieczorek"]
                                        &&
                                        this.props.mealsData[this.state.mealDate]["podwieczorek"]
                                            .map((el) => {
                                                return (
                                                    <Link
                                                        to={`/food-details/${el}`}
                                                        style={{textDecoration: 'none'}}
                                                        key={el}
                                                    >
                                                        <ListItem
                                                            primaryText={el}
                                                            leftAvatar={<Avatar color="#fff" icon={<ActionAndroid/>}/>}
                                                        />
                                                    </Link>
                                                )
                                            })
                                    }
                                </Paper>
                                <Paper style={{margin: 20, padding: 20}} zDepth={2}>
                                    <Subheader>Kolacja</Subheader>
                                    {
                                        this.props.mealsData[this.state.mealDate]["kolacja"]
                                        &&
                                        this.props.mealsData[this.state.mealDate]["kolacja"]
                                            .map((el) => {
                                                return (
                                                    <Link
                                                        to={`/food-details/${el}`}
                                                        style={{textDecoration: 'none'}}
                                                        key={el}
                                                    >
                                                        <ListItem
                                                            primaryText={el}
                                                            leftAvatar={<Avatar color="#fff" icon={<ActionAndroid/>}/>}
                                                        />
                                                    </Link>
                                                )
                                            })
                                    }
                                </Paper>
                            </List>
                            :
                            <Paper style={{margin: 20, padding: 20}} zDepth={2}>
                                <h1 style={{textAlign: 'center'}}>Wybierz Dzien</h1>
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