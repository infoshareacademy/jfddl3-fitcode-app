import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
// import foodBase from './database'
//
// const id = '7de10565-8826-40b8-9da0-adbf044b49af' //tutaj beda przekazane dane poprzez URL

const databaseUrl = 'https://jfddl3-fitcode.firebaseio.com/products/favourites.json'

class FoodDetails extends React.Component {
    state = {
        data: null,
        id: null,
        newTaskName: ''
    }


    componentWillMount() {
        fetch(
            `https://jfddl3-fitcode.firebaseio.com/products/food.json`
        )
            .then(response => response.json())
            .then(parsedJSONData => {
                    this.setState({data: Object.entries(parsedJSONData), id :this.props.match.params.uid});
                    //console.log(this.state.data);
                }
            )
    }

    addUidToFavList = () => {
        console.log(this.state.id)
        fetch(
            databaseUrl,
            {
                method: 'POST',
                body: JSON.stringify(this.state.id)
            }
        )
            .then(() => console.log('UDALO SIE'))
            .catch((err) => alert('Coś poszło nie tak!'))
    }

    render() {
        const id = this.props.match.params.uid; //linie added
        return (
            <div>
                {
                    this.state.data && this.state.data
                        .filter(([key,product]) => id === key)
                        .map(
                            ([key,product]) =>     //index added
                                <div key={key}>
                                    <p>Nazwa : {product.name}</p>
                                    <p>Kategoria: {product.category}</p>
                                    <p>Kalorie: {product.energy}</p>
                                    <p>Proteiny: {product.protein}</p>
                                    <p>Tluszcz: {product.fat}</p>
                                    <p>Weglowodany: {product.carbohydrate}</p>
                                    <p>Cukry: {product.sugars}</p>
                                    <p>Foto: {product.photo}</p>

                                    <RaisedButton label="+ ulubione" primary={true} style={{margin: 12}}
                                                  onClick={this.addUidToFavList}
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