import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie} from 'recharts';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom'
import Paper from 'material-ui/Paper';
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
    {name: 'Ilość użytkowników',  pv: 2400, amt: 2100},
    { pv: 1398, amt: 2100},
    {  pv: 9800, amt: 2100}

];
const style = {
    margin: 12,
};



const Dashboard = () => (
    <div
        style={{textAlign: "center"}}
    >
        <h1>
            Witaj w aplikacji FitCode!
            <br/><br/>
            Bądź FIT razem z nami!
        </h1>
        <h2>W naszej aplikacji możesz sprawdzać produkty, oraz dodawać nowe! Zacznij już dziś.</h2>
        <Link to="/food-list">
            <RaisedButton label="Zobacz produkty!" secondary={true} style={style} />
        </Link>
        <Link to="/food-add">
            <RaisedButton label="Dodaj produkt!" secondary={true} style={style} />
        </Link>
        <Paper
            style={{margin: 20, padding: 20}}
            zDepth={2}
        >

            <h3 style={{textAlign: "left"}}> Nasi użytkownicy najczęściej spożywają:</h3>
            <PieChart width={500} height={500}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    fill="#8884d8"
                />
                <Tooltip />
            </PieChart>
            <h3 style={{textAlign: "left"}}>Ilość naszych  użytkowników ciągle rośnie!</h3>
            <LineChart width={600} height={300} data={lineChartData}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
        </Paper>

    </div>
);


export default Dashboard
