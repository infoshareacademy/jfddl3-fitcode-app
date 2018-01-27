import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import {connect} from 'react-redux'
import {fetchProducts} from '../state/products'
import {fetchFav} from '../state/fav'
import {database} from "../firebase";

const databaseUrl = 'https://jfddl3-fitcode.firebaseio.com/products/favourites/'



class FoodDetails extends React.Component {
    state = {
        data: null,
        id : this.props.match.params.uid,
        favData: null,
        favUid: null,
    }


    addUidToFavList = () => {
        console.log(this.state.id)
        database.ref(`/products/favourites`)
            .push(this.state.id)
    }

    removeUidToFavList = (keyId) => {
        let favToRemoveUrl = '/products/favourites/';
        for (let i = 0; i < this.props.favData.length; i++) {
            if (this.props.favData[i][1] === keyId) {
                favToRemoveUrl += this.props.favData[i][0]
            }
        }
        console.log(this.props.favData)
        // database.ref(favToRemoveUrl)
        //     .remove()
        //     .then(() => {
        //         console.log('Fav Removed from DB');
        //     })
        //     .catch((err) => console.log(err))

    }


    render() {
        return (
            <Paper style={{margin: 20, padding: 20}} zDepth={2}>
                {
                    this.props.foodData && this.props.foodData
                        .filter(([key, product]) => this.state.id === key)
                        .map(
                            ([key, product]) =>
                                <div key={key}>
                                    <h2>Nazwa : {product.name.toUpperCase()}</h2>
                                    <p>Kategoria: {product.category}</p>
                                    <p>Kalorie: {product.energy}</p>
                                    <p>Proteiny: {product.protein}</p>
                                    <p>Tluszcz: {product.fat}</p>
                                    <p>Weglowodany: {product.carbohydrate}</p>
                                    <p>Cukry: {product.sugars}</p>
                                    <p>
                                        <img
                                            src={`${process.env.PUBLIC_URL}/img/${product.photo}`}
                                            alt=""
                                            style={{width:'50vw', height:'auto'}}
                                        />
                                    </p>

                                    {
                                        this.props.favData && this.props.favData.indexOf(key) === -1 ?
                                            <RaisedButton label="+ ulubione" primary={true} style={{margin: 12}}
                                                          onClick={this.addUidToFavList}
                                            />
                                            :
                                            <RaisedButton label="- ulubione" default={true} style={{margin: 12}}
                                                          onClick={() => this.removeUidToFavList(key)}
                                            />
                                    }
                                    <RaisedButton //href={`/food-list/${key}`}
                                        onClick={this.props.history.goBack}
                                        label="powrot do listy" secondary={true} style={{margin: 12}}
                                    />
                                </div>
                        )
                }
            </Paper>
        )
    }
}

const mapStateToProps = state => ({
    foodData: state.products.productsData,
    favData: state.fav.favData
})

const mapDispatchToProps = dispatch => ({
    // getFoodData: () => dispatch(fetchProducts()),
    // getFavData: () => dispatch(fetchFav()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FoodDetails)