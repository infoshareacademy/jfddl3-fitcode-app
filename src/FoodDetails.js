import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
<<<<<<< HEAD
import Paper from 'material-ui/Paper';
=======
// import foodBase from './database'
//
// const id = '7de10565-8826-40b8-9da0-adbf044b49af' //tutaj beda przekazane dane poprzez URL
>>>>>>> d5853c36bd770709b4a4dbe28c8d0c290347a172

const databaseUrl = 'https://jfddl3-fitcode.firebaseio.com/products/favourites/'

class FoodDetails extends React.Component {
    state = {
        data: null,
        id: null,
<<<<<<< HEAD
        favData: null,
        favUid: null,
=======
        newTaskName: '',
        favData: null,
>>>>>>> d5853c36bd770709b4a4dbe28c8d0c290347a172
    }

    componentWillMount() {
<<<<<<< HEAD
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
=======
        fetch(
            `https://jfddl3-fitcode.firebaseio.com/products/food.json`
        )
            .then(response => response.json())
            .then(parsedJSONData => {
                    this.setState({data: Object.entries(parsedJSONData), id: this.props.match.params.uid});
                    //console.log(this.state.data);
                }
            )

        fetch(
            `https://jfddl3-fitcode.firebaseio.com/products/favourites.json`
        )
            .then(response => response.json())
            .then(parsedJSONData => {
                    this.setState({favData: Object.values(parsedJSONData), favDataById: Object.keys(parsedJSONData)});
>>>>>>> d5853c36bd770709b4a4dbe28c8d0c290347a172
                }
            )
    }

    addUidToFavList = () => {
        //console.log(this.state.id)
        fetch(
<<<<<<< HEAD
            databaseUrl + '/.json',
=======
            databaseUrl+'.json',
>>>>>>> d5853c36bd770709b4a4dbe28c8d0c290347a172
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
<<<<<<< HEAD
        let url = databaseUrl;
        for (let i = 0; i < this.state.favData.length; i++) {
            if (this.state.favData[i][1] === keyId) {
                url += this.state.favData[i][0]
            }
        }
        //console.log(url)
        fetch(
            url + '/.json',
=======
        fetch(
            databaseUrl+'/' + keyId+'.json',
>>>>>>> d5853c36bd770709b4a4dbe28c8d0c290347a172
            {
                method: 'DELETE'
            }
        )
<<<<<<< HEAD
            .then(() => {
                console.log('UDALO SIE DELETE');
                this.getFavFromDb();
            })
            .catch((err) => alert(err))
=======
            .then(() => console.log('UDALO SIE'))
            .catch((err) => alert('Coś poszło nie tak!'))
>>>>>>> d5853c36bd770709b4a4dbe28c8d0c290347a172
    }


    render() {
<<<<<<< HEAD
        const id = this.props.match.params.uid;
=======
        const id = this.props.match.params.uid; //linie added
>>>>>>> d5853c36bd770709b4a4dbe28c8d0c290347a172
        return (
            <Paper style={{margin: 20, padding: 20}} zDepth={2}>
                {
                    this.state.data && this.state.data
                        .filter(([key, product]) => id === key)
                        .map(
<<<<<<< HEAD
                            ([key, product]) =>
=======
                            ([key, product]) =>     //index added
>>>>>>> d5853c36bd770709b4a4dbe28c8d0c290347a172
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
<<<<<<< HEAD
                                        this.state.favUid && this.state.favUid.indexOf(key) === -1 ?
=======
                                        this.state.favData && this.state.favData.indexOf(key) === -1 ?
>>>>>>> d5853c36bd770709b4a4dbe28c8d0c290347a172
                                            <RaisedButton label="+ ulubione" primary={true} style={{margin: 12}}
                                                          onClick={this.addUidToFavList}
                                            />
                                            :
<<<<<<< HEAD
                                            <RaisedButton label="- ulubione" default={true} style={{margin: 12}}
                                                          onClick={() => this.removeUidToFavList(key)}
                                            />
                                    }
                                    <RaisedButton //href={`/food-list/${key}`}
                                        onClick={this.props.history.goBack}
                                        label="powrot do listy" secondary={true} style={{margin: 12}}
=======
                                            <RaisedButton label="- ulubione" primary={true} style={{margin: 12}}
                                                          onClick={() => this.removeUidToFavList(key)}
                                            />
                                    }
                                    <RaisedButton href={`/food-list/${product.uid}`}
                                                  label="powrot do listy" secondary={true} style={{margin: 12}}
>>>>>>> d5853c36bd770709b4a4dbe28c8d0c290347a172
                                    />
                                </div>
                        )
                }
            </Paper>
        )
    }
}

<<<<<<< HEAD
export default FoodDetails
=======
export default FoodDetails
>>>>>>> d5853c36bd770709b4a4dbe28c8d0c290347a172
