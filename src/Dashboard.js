import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Label, Legend, PieChart, Pie} from 'recharts';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom'
import Paper from 'material-ui/Paper';
import {Grid, Row, Col} from 'react-flexbox-grid'




const data = [
    {
        value:40,
        name: 'warzywa',
        fill:'lime'
    },
    {
        value: 40,
        name: 'owoce',
        fill:'red'
    },
    {
        value: 20,
        name: 'mięso',
        fill:'yellow'
    }
];
const lineChartData = [
    {name: 'Tydzień:', użytkownicy: 0},
    { name:'1', użytkownicy: 500},
    { name:'2', użytkownicy: 1800},
    { name:'3', użytkownicy: 1000},
    {name:'4', użytkownicy: 2500},
];
const style = {
    margin: 12,
};


const Dashboard = () => (

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
            <h2>W naszej aplikacji możesz sprawdzać produkty, oraz dodawać nowe! Zacznij już dziś.</h2>
            <Link to="/food-list">
                <RaisedButton label="Zobacz produkty!" secondary={true} style={style}/>
            </Link>
            <Link to="/food-add">
                <RaisedButton label="Dodaj produkt!" secondary={true} style={style}/>
            </Link>
        </Paper>



        <Paper
            style={{margin: 20, padding: 20}}
            zDepth={2}
        >
            <Grid fluid>
                <Row>
                    <Col
                        xs={12}
                        sm={12}
                        md={12}
                        lg={6}
                        xl={6}
                    >

                        <h3> Nasi użytkownicy najczęściej spożywają:</h3>
                        <PieChart
                            style={{margin: '0 auto'}}
                            width={window.innerWidth < 500 ? 150 : 400}
                            height={window.innerWidth < 500 ? 150 : 400}

                        >
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                fill="#8884d8"
                                label={({payload}) =>`${payload.name} - ${payload.value} % `}
                                labelLine={true}
                            />

                        </PieChart>

                    </Col>

                    <Col
                        xs={12}
                        sm={12}
                        md={12}
                        lg={6}
                        xl={6}
                    >
                        <h3>Ilość użytkowników korzystających codziennie z naszej aplikacji:</h3>
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
);


export default Dashboard;