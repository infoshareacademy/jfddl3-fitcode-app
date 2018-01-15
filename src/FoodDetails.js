import React from 'react';
import foodBase from './database'

const id = '7de10565-8826-40b8-9da0-adbf044b49af' //tutaj beda przekazane dane poprzez URL

class FoodDetails extends React.Component {
    state = {
        data: null
    }


    componentWillMount() {
        fetch(
            `${process.env.PUBLIC_URL}/database.json`
        )
            .then(response => response.json())
            .then(parsedJSONData => {
                this.setState({
                    data: parsedJSONData
                })
            })
    }

    render() {
        return (
            <div>
                {
                    this.state.data && this.state.data
                        .filter(product => id === product.uid)
                        .map(
                            product =>
                                <div>
                                    <p>Nazwa : {product.name}</p>
                                    <p>Kategoria: {product.category}</p>
                                    <p>Kalorie: {product.energy}</p>
                                    <p>Proteiny: {product.protein}</p>
                                    <p>Tluszcz: {product.fat}</p>
                                    <p>Weglowodany: {product.carbohydrate}</p>
                                    <p>Cukry: {product.sugars}</p>
                                    <p>Foto: {product.photo}</p>
                                </div>
                        )
                }
            </div>
        )
    }
}

export default FoodDetails