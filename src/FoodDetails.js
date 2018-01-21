import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const databaseUrl = 'https://jfddl3-fitcode.firebaseio.com/products/favourites/'

class FoodDetails extends React.Component {
    state = {
        data: null,
        id: null,
        favData: null,
        favUid: null,
    }

    componentWillMount() {
        fetch(`https://jfddl3-fitcode.firebaseio.com/products/food.json`)
            .then(response => response.json())
            .then(parsedJSONData => {
                    this.setState({data: Object.entries(parsedJSONData), id: this.props.match.params.uid});
                    this.getFavFromDb();
                }
            )
    }

    getFavFromDb = () => {
        fetch(`https://jfddl3-fitcode.firebaseio.com/products/favourites.json`)
            .then(response => response.json())
            .then(parsedJSONData => {
                    this.setState({favData: Object.entries(parsedJSONData || {})});
                    this.setState({favUid: Object.values(parsedJSONData || {})});
                }
            )
    }

    addUidToFavList = () => {
        //console.log(this.state.id)
        fetch(
            databaseUrl + '/.json',
            {
                method: 'POST',
                body: JSON.stringify(this.state.id)
            }
        )
            .then(() => {
                console.log('UDALO SIE DODAC');
                this.getFavFromDb();
            })
            .catch((err) => alert('Coś poszło nie tak!'))
    }

    removeUidToFavList = (keyId) => {
        let url = databaseUrl;
        for (let i = 0; i < this.state.favData.length; i++) {
            if (this.state.favData[i][1] === keyId) {
                url += this.state.favData[i][0]
            }
        }
        //console.log(url)
        fetch(
            url + '/.json',
            {
                method: 'DELETE'
            }
        )
            .then(() => {
                console.log('UDALO SIE DELETE');
                this.getFavFromDb();
            })
            .catch((err) => alert(err))
    }


    render() {
        const id = this.props.match.params.uid;
        return (
            <Paper style={{margin: 20, padding: 20}} zDepth={2}>
                {
                    this.state.data && this.state.data
                        .filter(([key, product]) => id === key)
                        .map(
                            ([key, product]) =>
                                <div key={key}>
                                    <h2>Nazwa : {product.name.toUpperCase()}</h2>
                                    <p>Kategoria: {product.category}</p>
                                    <p>Kalorie: {product.energy}</p>
                                    <p>Proteiny: {product.protein}</p>
                                    <p>Tluszcz: {product.fat}</p>
                                    <p>Weglowodany: {product.carbohydrate}</p>
                                    <p>Cukry: {product.sugars}</p>
                                    <p>
                                        <img
                                            src={`${process.env.PUBLIC_URL}/img/${product.photo}`}
                                            alt=""
                                            style={{width:'50vw', height:'auto'}}
                                        />
                                    </p>

                                    {
                                        this.state.favUid && this.state.favUid.indexOf(key) === -1 ?
                                            <RaisedButton label="+ ulubione" primary={true} style={{margin: 12}}
                                                          onClick={this.addUidToFavList}
                                            />
                                            :
                                            <RaisedButton label="- ulubione" default={true} style={{margin: 12}}
                                                          onClick={() => this.removeUidToFavList(key)}
                                            />
                                    }
                                    <RaisedButton //href={`/food-list/${key}`}
                                        onClick={this.props.history.goBack}
                                        label="powrot do listy" secondary={true} style={{margin: 12}}
                                    />
                                </div>
                        )
                }
            </Paper>
        )
    }
}

export default FoodDetails
