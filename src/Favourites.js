import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';

import Paper from 'material-ui/Paper';


class Favourites extends Component {
    state = {
        data: null,
        favUid: null
    }


    componentWillMount() {
        fetch(
            `https://jfddl3-fitcode.firebaseio.com/products/food.json`
        )
            .then(response => response.json())
            .then(parsedJSONData => {
                    this.setState({data: Object.entries(parsedJSONData || {})});
                    fetch(
                        `https://jfddl3-fitcode.firebaseio.com/products/favourites.json`
                    )
                        .then(response => response.json())
                        .then(parsedJSONData => {
                                this.setState({favUid: Object.values(parsedJSONData || {})});
                            }
                        )
                }
            )
    }

    render() {
        console.log(this.state.favUid)
        return (
            <div>

                <Paper
                    style={{margin: 20, padding: 20}}
                    zDepth={2}
                >
                    <List><Subheader>Test Food List</Subheader>
                        {
                            this.state.data &&
                            this.state.favUid &&
                            this.state.data
                                .filter(([key, product]) => this.state.favUid.indexOf(key) !== -1)
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
                                                rightIcon={<ActionFavorite/>}
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

export default Favourites