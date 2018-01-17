import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';


const databaseUrl = 'https://ad-snadbox.firebaseio.com/JFDDL3/restToDo/tomek/list/.json'

class FoodDetails extends React.Component {

    state = {
        data: null,
        id: null,
        newTaskName: ''
    }


    componentWillMount() {
        fetch(
            `${process.env.PUBLIC_URL}/database.json`
        )
            .then(response => response.json())
            .then(parsedJSONData => {
                this.setState({
                    data: parsedJSONData,
                    id: this.props.match.params.uid
                })
            })
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
        return (
            <div>
                {
                    this.state.data && this.state.data
                        .filter(product => this.state.id === product.uid)
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