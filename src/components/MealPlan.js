import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
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
                <Paper
                    style={{margin: 20, padding: 20}}
                    zDepth={2}
                >
                    <DatePicker
                        hintText="Wybierz dzien"
                        onChange={this.handleMealDate}
                    />
                </Paper>

                <Paper
                    style={{margin: 20, padding: 20}}
                    zDepth={2}
                >
                    <List><Subheader>Moje Plany Posilkow</Subheader>
                        {
                            JSON.stringify(this.props.mealsData)

                        }
                    </List>
                </Paper>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    foodData: state.products.productsData,
    mealsData: state.meals.mealsData
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MealPlan)