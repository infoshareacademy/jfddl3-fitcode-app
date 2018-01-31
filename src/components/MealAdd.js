import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment'

import {connect} from 'react-redux'
import {database} from "../firebase";


class MealAdd extends React.Component {
    state = {
        open: false,
        mealSelect:'sniadanie',
        mealDate: null
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleMealSelect = (event, index, value) => this.setState({mealSelect: value})

    handleMealDate = (n, date) => this.setState({mealDate: moment(date).format("YYYYMMDD")})

    handleSubmit = (foodId) => {
        if (this.state.mealDate) {
            let mealArr = []
            if (this.props.meals[this.state.mealDate]
                &&
                this.props.meals[this.state.mealDate][this.state.mealSelect]
            ) {
                mealArr = this.props.meals[this.state.mealDate][this.state.mealSelect].concat(foodId)
            } else {
                mealArr = [foodId]
            }


            database.ref(`/users/${this.props.uuid}/meals/${this.state.mealDate}/${this.state.mealSelect}`)
                .set(mealArr)
            //TODO prevent same food add to same meal at the same date

            this.setState({open: false, mealDate:null});
        }
    }

    render() {
        console.log(this.props.meals[this.state.mealDate])
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={()=>this.handleSubmit(this.props.foodId)}
            />,
        ];


        return (
            <div>
                <RaisedButton
                    label="Dodaj do posilku"
                    primary={true}
                    onClick={this.handleOpen}
                    fullWidth={true}
                    style={{marginBottom:20}}
                />
                <Dialog
                    title="Dodaj jedzonko do posilku"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <List>
                        {
                            this.props.food && this.props.food
                                .filter(([key, product]) => this.props.foodId === key)
                                .map(([key, product])=>
                                        <ListItem
                                            key={key}
                                            primaryText={product.name}
                                            secondaryText={`Kcal: ${product.energy} | ${product.category}`}
                                            leftAvatar={<Avatar src={`${process.env.PUBLIC_URL}/img/${product.photo}`}/>}
                                            style={{backgroundColor:'#eee'}}
                                        />
                                )
                        }
                    </List>
                    <div>
                        <DatePicker
                            hintText="Wybierz dzien"
                            onChange={this.handleMealDate}
                        />
                        <SelectField
                            floatingLabelText="Twoj posilek"
                            value={this.state.mealSelect}
                            onChange={this.handleMealSelect}
                        >
                            <MenuItem value={'sniadanie'} primaryText="Sniadanie"/>
                            <MenuItem value={'sniadanie2'} primaryText="Drugie sniadanie"/>
                            <MenuItem value={'obiad'} primaryText="Obiad"/>
                            <MenuItem value={'podwieczorek'} primaryText="Podwieczorek"/>
                            <MenuItem value={'kolacja'} primaryText="Kolacja"/>
                        </SelectField>
                    </div>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    uuid: state.auth.user.uid,
    meals: state.meals.mealsData,
    food: state.products.productsData
})


const mapDispatchToProps = dispatch => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MealAdd)
