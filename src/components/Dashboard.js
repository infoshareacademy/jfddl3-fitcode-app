import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie} from 'recharts';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom'
import Paper from 'material-ui/Paper';
import {Grid, Row, Col} from 'react-flexbox-grid'

import LogInLogsList from './LogInLogList'

const data = [
    {
        value: 40,
        name: 'warzywa'
    },
    {
        value: 40,
        name: 'owoce'
    },
    {
        value: 20,
        name: 'produkty mięsne'
    }
];
const lineChartData = [
    {name: 'Ilość użytkowników', pv: 2400, amt: 2100},
    {pv: 1398, amt: 2100},
    {pv: 9800, amt: 2100}

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

           <LogInLogsList/>










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
                            />
                            <Tooltip/>

                        </PieChart>

                    </Col>

                    <Col
                        xs={12}
                        sm={12}
                        md={12}
                        lg={6}
                        xl={6}
                    >
                        <h3>Ilość naszych użytkowników ciągle rośnie!</h3>
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
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d"/>
                        </LineChart>
                    </Col>


                </Row>
            </Grid>

        </Paper>


    </div>
);


export default Dashboard;