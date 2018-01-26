import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import {connect} from 'react-redux'
import {fetchProducts} from '../state/products'
import {fetchFav} from '../state/fav'


class Favourites extends Component {

    render() {

        return (
            <div>

                <Paper
                    style={{margin: 20, padding: 20}}
                    zDepth={2}
                >
                    <RaisedButton
                        label="Fetch Food and Fav?"
                        onClick={this.props.getFoodData}
                    />
                    <List><Subheader>Moje Ulubione Jedzonka</Subheader>
                        {
                            this.props.foodData &&
                            this.props.favData &&
                            this.props.foodData
                                .filter(([key, product]) => this.props.favData.indexOf(key) !== -1)
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
                                                leftAvatar={<Avatar src={`${process.env.PUBLIC_URL}/img/${product.photo}`}/>}
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

const mapStateToProps = state => ({
    foodData: state.products.productsData,
    favData: state.fav.favData
})

const mapDispatchToProps = dispatch => ({
    // getFoodData: () => {
    //     dispatch(fetchProducts())
    //     dispatch(fetchFav())
    // }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Favourites)