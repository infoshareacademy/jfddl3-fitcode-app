import React from 'react';
import {Link} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import MealAdd from './MealAdd'
import  {RadialBarChart, RadialBar, Legend} from 'recharts'
import {Grid, Row, Col} from 'react-flexbox-grid'

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
        const style = {
            top: 0,
            left: 350,
            lineHeight: '24px'
        };

        return (
            <Paper style={{margin: 20, padding: 20}} zDepth={2}>
                <Grid >
                    <Row>
                        <Col xs={12} md={12} lg={12}>
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
                                            src={`${product.photo}`}
                                            alt=""
                                            style={{width:'50vw', height:'auto'}}
                                        />
                                    </p>
                                    <div>
                                        <RadialBarChart width={500} height={300} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={20} data={[
                                            {name: 'Sugars', uv: +product.sugars, fill: '#83a6ed'},
                                            {name: 'Proteins', uv: +product.protein, fill: '#8dd1e1'},
                                            {name: 'Fat', uv: +product.fat, fill: '#82ca9d'},
                                            {name: 'Carbo', uv: +product.carbohydrate,  fill: '#a4de6c'},
                                            {name: 'Energy', uv: +product.energy,  fill: '#d0ed57'},
                                        ]} startAngle={180} endAngle={0}>
                                            <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='uv'/>
                                            <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' wrapperStyle={style}/>
                                        </RadialBarChart>
                                    </div>

                                    <RaisedButton
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
                                    <Link to={'/meal-plan'}>
                                    <RaisedButton
                                        label="Zobacz plan posilkow" primary={true}
                                        fullWidth={true}
                                        style={{marginBottom:20}}
                                    />
                                    </Link>
                                </div>
                        )
                }
                        </Col>
                    </Row>
                </Grid>
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