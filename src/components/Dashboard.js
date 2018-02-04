import React, {Component} from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Label, Legend, PieChart, Pie} from 'recharts';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom'
import Paper from 'material-ui/Paper';
import {Grid, Row, Col} from 'react-flexbox-grid'

import {connect} from "react-redux";


const data = [
    {
        value: 40,
        name: 'warzywa',
        fill: 'lime'
    },
    {
        value: 40,
        name: 'owoce',
        fill: 'red'
    },
    {
        value: 20,
        name: 'mięso',
        fill: 'yellow'
    }
];
const lineChartData = [
    {name: 'Tydzień:', użytkownicy: 0},
    {name: '1', użytkownicy: 500},
    {name: '2', użytkownicy: 1800},
    {name: '3', użytkownicy: 1000},
    {name: '4', użytkownicy: 2500},
];
const style = {
    margin: 12,
};

class Dashboard extends Component {
    render() {
        let foodCount=[0,0,0,0,0,0];

        return (
            <div
                style={{textAlign: "center"}}
            >

                <Paper style={{margin: 20, padding: 20}}
                       zDepth={2}>
                    <h1>
                        Witaj w aplikacji FitCode!
                        <br/><br/>
                        Bądź FIT razem z nami!
                    </h1>
                    <h2>W naszej aplikacji możesz sprawdzać produkty żywieniowe, dodawać nowe oraz tworzyc swoje wlasne
                        posilki!<br/> Zacznij już dziś.</h2>
                    <Link to="/food-list">
                        <RaisedButton label="Zobacz produkty!" primary={true} style={style}/>
                    </Link>
                    <Link to="/food-add">
                        <RaisedButton label="Dodaj produkt!" primary={true} style={style}/>
                    </Link>
                </Paper>


                <Paper
                    style={{margin: 20, padding: 20}}
                    zDepth={2}
                >
                    <Grid>
                        <Row>
                            <Col xs={12} md={6} lg={4}>

                                <h3> Nasi użytkownicy najczęściej spożywają:</h3>

                                <h2> {/* //TODO podpiac liczbe jedzonek do wykresu */}
                                    {
                                        this.props.foodData && this.props.foodData
                                            .forEach(([key,product])=>{
                                                switch (product.category) {
                                                    case 'Warzywa' : foodCount[0] += 1; break;
                                                    case 'Owoce' : foodCount[1] += 1;  break;
                                                    case 'Mięso' : foodCount[2] += 1;  break;
                                                    case 'Ryby' : foodCount[3] += 1;  break;
                                                    case 'Nabiał' : foodCount[4] += 1;  break;
                                                    case 'Vege-Food' : foodCount[5] += 1;  break;
                                                    default : return;
                                                }
                                            })
                                    }
                                    Warzywa: {foodCount[0]},
                                    Owoce: {foodCount[1]},
                                    Mięso: {foodCount[2]},
                                    Ryby: {foodCount[3]},
                                    Nabiał: {foodCount[4]},
                                    Vege-Food: {foodCount[5]}
                                </h2>

                                <PieChart
                                    style={{margin: '0 auto'}}
                                    width={window.innerWidth < 500 ? 150 : 400}
                                    height={window.innerHeight < 500 ? 150 : 400}

                                >
                                    <Pie
                                        data={data}
                                        dataKey="value"
                                        nameKey="name"
                                        fill="#8884d8"
                                        label={({payload}) => `${payload.name} - ${payload.value} % `}
                                        labelLine={true}
                                    />

                                </PieChart>

                            </Col>

                            <Col xs={12} md={6} lg={4}>
                                <h3>Ilość użytkowników korzystających tygodniowo z naszej aplikacji:</h3>

                                <h2> :)  {/* //TODO podpiac liczbe uzytkownikow do wykresu */}
                                    {
                                        this.props.usersCount ?
                                            this.props.usersCount.length
                                            :
                                            null
                                    }
                                </h2>

                                <LineChart
                                    style={{margin: '0 auto'}}
                                    width={window.innerWidth < 500 ? 150 : 400}
                                    height={window.innerWidth < 500 ? 150 : 400}
                                    data={lineChartData}
                                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>

                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Line type="monotone" dataKey="użytkownicy" stroke="#8884d8" activeDot={{r: 8}}/>

                                </LineChart>
                            </Col>


                        </Row>
                    </Grid>

                </Paper>


            </div>
        )
    }
}


const mapStateToProps = state => ({
    foodData: state.products.productsData,
    usersCount: state.dashboard.usersCount
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)