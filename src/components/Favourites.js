import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import Paper from 'material-ui/Paper';

import {connect} from 'react-redux'


class Favourites extends Component {

    render() {

        return (
            <div>
                <Paper
                    style={{margin: 20, padding: 20}}
                    zDepth={2}
                >
                    <List><Subheader>Moje Ulubione Produkty</Subheader>
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
                                                leftAvatar={<Avatar src={product.photo === undefined ? `https://jfddl3-fitcode.firebaseapp.com/img/noimage.png` : `${product.photo}`}/>}
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

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Favourites)