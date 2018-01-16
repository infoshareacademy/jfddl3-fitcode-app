import React from 'react';
import {Link} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';


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
        const id = this.props.match.params.uid  // <- tutaj dane sie przekazuja
        return (
            <div>
                {
                    this.state.data && this.state.data
                        .filter(product => id === product.uid)
                        .map(
                            product =>
                                <div>
                                    <h2>Nazwa : {product.name.toUpperCase()}</h2>
                                    <p>Kategoria: {product.category}</p>
                                    <p>Kalorie: {product.energy}</p>
                                    <p>Proteiny: {product.protein}</p>
                                    <p>Tluszcz: {product.fat}</p>
                                    <p>Weglowodany: {product.carbohydrate}</p>
                                    <p>Cukry: {product.sugars}</p>
                                    <p>Foto: {product.photo}</p>

                                    <RaisedButton href={`/food-favourites/${product.uid}`}
                                                  label="+ ulubione" primary={true} style={{margin: 12}}
                                    />
                                    <RaisedButton href={`/food-list/${product.uid}`}
                                                  label="powrot do listy" secondary={true} style={{margin: 12}}
                                    />
                                </div>
                        )
                }
            </div>
        )
    }
}

export default FoodDetails