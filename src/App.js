import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import FoodList from './FoodList'
import AddFood from './AddFood'
import Dashboard from './Dashboard'
import Favourites from './Favourites'
import AppBar from './AppBar'
import SideBar from './SideBar'


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <AppBar/>
                    <SideBar/>

                    <Route path="/" exact={true} component={Dashboard} />
                    <Route path="/items" component={FoodList} />
                    <Route path="/favourites" component={Favourites} />
                    <Route path="/addfood" component={AddFood} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
