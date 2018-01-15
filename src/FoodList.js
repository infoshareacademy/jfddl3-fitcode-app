import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';

class FoodList extends Component {
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
            </List></div>
        )
    }
}

export default FoodList