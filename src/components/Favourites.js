import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Paper from 'material-ui/Paper';

import {connect} from 'react-redux'
import {database} from "../firebase";


const styles = {
    favButt: {
        display: "block",
        position: "absolute",
        right: 20,
        top: 24,
        height: 24,
        width: 24,
        fill:'#777'
    }
}

class Favourites extends Component {

    addUidToFavList = () => {
        const favArr = this.props.favData.concat(this.state.id)
        database.ref(`/users/${this.props.uuid}/favourites`)
            .set(favArr)
    }

    removeUidFromFavList = (keyId) => {
        const favArr = this.props.favData.filter((el)=> {
            if (el !== keyId){
                return el
            }
        })
        database.ref(`/users/${this.props.uuid}/favourites`)
            .set(favArr)
    }


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

                                            <ListItem
                                                key={key}
                                                onClick={() => {this.props.history.push(`/food-details/${key}`)}}
                                                primaryText={product.name}
                                                secondaryText={`Kcal: ${product.energy} | ${product.category}`}
                                                leftAvatar={<Avatar src={product.photo === undefined ? `https://jfddl3-fitcode.firebaseapp.com/img/noimage.png` : `${product.photo}`}/>}
                                                rightIconButton={
                                                    this.props.favData && this.props.favData.indexOf(key) === -1 ?
                                                        <ActionFavoriteBorder onClick={() => this.addUidToFavList(key)} style={styles.favButt}/>
                                                        :
                                                        <ActionFavorite onClick={() => this.removeUidFromFavList(key)} style={styles.favButt}/>
                                                }
                                            />

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
    favData: state.fav.favData,
    uuid: state.auth.user.uid
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Favourites)