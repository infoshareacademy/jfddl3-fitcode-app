import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment'
import MealRemove from './MealRemove'
import  {RadialBarChart, RadialBar, Legend} from 'recharts'

import {connect} from 'react-redux'




class MealPlanList extends Component {

    calcMealSummary = (dataMeal, dataFood, date, mealType) => {
        const mealSum = {
            energy:0,
            protein:0,
            fat: 0,
            carbohydrate: 0,
            sugars: 0
        }

        dataMeal
        &&
        dataMeal[date][mealType]
        &&
        dataMeal[date][mealType]
            .map((el) => {
                return (
                    dataFood && dataFood
                        .filter(([key, product]) => el === key)
                        .map(([key, product]) => {
                                mealSum.energy += +product.energy
                                mealSum.protein+= +product.protein
                                mealSum.fat+= +product.fat
                                mealSum.carbohydrate+= +product.carbohydrate
                                mealSum.sugars+= +product.sugars
                            }
                        )
                )
            })
        return mealSum
    }

    render() {

        const sumEner = this.calcMealSummary(this.props.mealsData, this.props.foodData, this.props.mealDate, this.props.mealType)
        const data = [
            {name: 'Sugars', uv: sumEner.sugars, fill: '#83a6ed'},
            {name: 'Proteins', uv: sumEner.protein, fill: '#8dd1e1'},
            {name: 'Fat', uv: sumEner.fat, fill: '#82ca9d'},
            {name: 'Carbo', uv: sumEner.carbohydrate,  fill: '#a4de6c'},
            {name: 'Energy', uv: sumEner.energy,  fill: '#d0ed57'},
        ];
        const style = {
            top: 0,
            left: 350,
            lineHeight: '24px'
        };

        return (
            <Paper style={{margin: 20, padding: 20}} zDepth={2}>
                <Subheader>{this.props.mealType} sums:
                    {sumEner.energy},
                    {sumEner.protein},
                    {sumEner.fat},
                    {sumEner.carbohydrate},
                    {sumEner.sugars},
                    </Subheader>
                {
                    this.props.mealsData
                    &&
                    this.props.mealsData[this.props.mealDate][this.props.mealType]
                    &&
                    this.props.mealsData[this.props.mealDate][this.props.mealType]
                        .map((el) => {
                            return (
                                <div key={el}>
                                    {
                                        this.props.foodData && this.props.foodData
                                            .filter(([key, product]) => el === key)
                                            .map(([key, product]) =>
                                                <ListItem
                                                    key={el}
                                                    primaryText={product.name}
                                                    secondaryText={`Kcal: ${product.energy} | ${product.category}`}
                                                    leftAvatar={<Avatar
                                                        src={`${process.env.PUBLIC_URL}/img/${product.photo}`}/>}
                                                    rightIcon={<MealRemove foodId={el} mealType={this.props.mealType} mealDate={this.props.mealDate}/>}
                                                />
                                            )
                                    }
                                </div>
                            )
                        })
                }
                <div>
                    <RadialBarChart width={500} height={300} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={20} data={data} startAngle={180} endAngle={0}>
                        <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='uv'/>
                        <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' wrapperStyle={style}/>
                    </RadialBarChart>
                </div>
            </Paper>
        )
    }
}


class MealPlan extends Component {
    state = {
        mealDate: null
    };

    handleMealDate = (n, date) => this.setState({mealDate: moment(date).format("YYYYMMDD")})

    render() {
        return (
            <div>
                <Paper style={{margin: 20, padding: 20}} zDepth={2}>
                    <DatePicker
                        hintText="Wybierz dzien"
                        onChange={this.handleMealDate}
                    />
                    <Link to={'/food-list'}>
                    <RaisedButton
                        label="Dodaj do posilku" primary={true}
                        fullWidth={false}
                        style={{marginBottom:20}}
                    />
                    </Link>
                </Paper>

                <div>
                    {
                        this.state.mealDate && this.props.mealsData[this.state.mealDate] ?
                            <div>
                                <List>
                                    <MealPlanList
                                        mealType={"sniadanie"}
                                        mealDate={this.state.mealDate}
                                        mealsData={this.props.mealsData}
                                        foodData={this.props.foodData}
                                    />
                                </List>
                                <List>
                                    <MealPlanList
                                        mealType={"sniadanie2"}
                                        mealDate={this.state.mealDate}
                                        mealsData={this.props.mealsData}
                                        foodData={this.props.foodData}
                                    />
                                </List>
                                <List>
                                    <MealPlanList
                                        mealType={"obiad"}
                                        mealDate={this.state.mealDate}
                                        mealsData={this.props.mealsData}
                                        foodData={this.props.foodData}
                                    />
                                </List>
                                <List>
                                    <MealPlanList
                                        mealType={"podwieczorek"}
                                        mealDate={this.state.mealDate}
                                        mealsData={this.props.mealsData}
                                        foodData={this.props.foodData}
                                    />
                                </List>
                                <List>
                                    <MealPlanList
                                        mealType={"kolacja"}
                                        mealDate={this.state.mealDate}
                                        mealsData={this.props.mealsData}
                                        foodData={this.props.foodData}
                                    />
                                </List>
                            </div>
                            :
                            <Paper style={{margin: 20, padding: 20}} zDepth={2}>
                                <h1 style={{textAlign: 'center'}}>Brak posilkow<br/>:(</h1>
                            </Paper>
                    }
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    foodData: state.products.productsData,
    mealsData: state.meals.mealsData
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MealPlan)