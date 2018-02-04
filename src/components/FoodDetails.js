import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import MealAdd from './MealAdd'

import {connect} from 'react-redux'
import {database} from "../firebase";



class FoodDetails extends React.Component {
    state = {
        id : this.props.match.params.uid,
    }


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
        console.log(this.props.favData)
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

                                    <RaisedButton //href={`/food-list/${key}`}
                                        label="powrot do listy" primary={true}
                                        fullWidth={true}
                                        style={{marginBottom:20}}
                                        onClick={this.props.history.goBack}

                                    />
                                    {
                                        this.props.favData && this.props.favData.indexOf(key) === -1 ?
                                            <RaisedButton label="+ ulubione" primary={true}
                                                          fullWidth={true}
                                                          style={{marginBottom:20}}
                                                          onClick={this.addUidToFavList}
                                            />
                                            :
                                            <RaisedButton label="- ulubione" default={true}
                                                          fullWidth={true}
                                                          style={{marginBottom:20}}
                                                          onClick={() => this.removeUidFromFavList(key)}
                                            />
                                    }
                                    <MealAdd foodId={this.state.id} btnType={"butt"} />
                                </div>
                        )
                }
            </Paper>
        )
    }
}

const mapStateToProps = state => ({
    foodData: state.products.productsData,
    favData: state.fav.favData,
    uuid: state.auth.user.uid
})


const mapDispatchToProps = dispatch => ({
    // getFoodData: () => dispatch(fetchProducts()),
    // getFavData: () => dispatch(fetchFav()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FoodDetails)