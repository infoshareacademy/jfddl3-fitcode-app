import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import {List, ListItem} from 'material-ui/List';
import moment from 'moment'

import {connect} from 'react-redux'
import {database} from "../firebase";

const styles = {
    removeButt: {
        display: "block",
        position: "absolute",
        right: 20,
        top: 12,
        height: 24,
        width: 24
    }
}

class MealRemove extends React.Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSubmit = (foodId) => {

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
                onClick={() => this.handleSubmit(this.props.foodId)}
            />,
        ];


        return (
            <div>
                <IconButton
                    tooltip="Remove from meal"
                    style={styles.removeButt}
                    onClick={this.handleOpen}>
                    <ActionDelete color={"#757575"}/>
                </IconButton>

                <Dialog
                    title="Czy napewno chcesz usunac z posilku?"
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
                                .map(([key, product]) =>
                                    <ListItem
                                        key={key}
                                        primaryText={product.name}
                                        secondaryText={`Kcal: ${product.energy} | ${product.category}`}
                                        leftAvatar={<Avatar src={`${process.env.PUBLIC_URL}/img/${product.photo}`}/>}
                                        style={{backgroundColor: '#eee'}}
                                    />
                                )
                        }
                    </List>
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


const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MealRemove)
