import React from 'react';
import { render } from 'react-dom';
import { PieChart, Pie, Tooltip }  from 'recharts'

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
]

const Dashboard = () => (
    <div >
        <PieChart width={500} height={500}>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                fill="#8884d8"
            />
            <Tooltip />
        </PieChart>
    </div>
);


export default Dashboard
