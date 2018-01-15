import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';

class FoodList extends React.Component {
    state = {
        data: null
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

    render() {
        return (
            <div><List> <Subheader>Test Food List</Subheader>
                {
                    this.state.data && this.state.data
                        .map(
                            product => (
                                <ListItem
                                    primaryText={product.name}
                                    secondaryText={product.energy}
                                    leftAvatar={<Avatar src={product.photo}/>}
                                    rightIcon={<ActionFavorite/>}
                                />
                            ))
                }
            </List></div>
        )
    }
}

export default FoodList