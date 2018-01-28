import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import FoodList from './FoodList'
import FoodAdd from './FoodAdd'
import Dashboard from './Dashboard'
import Favourites from './Favourites'
import AppBar from './AppBar'
import SideBar from './SideBar'

import './index.css'
import FoodDetails from "./FoodDetails";
import ShareButton from './ShareButton'
import FoodAddRedux from "./FoodAddRedux";


class App extends Component {

    state = {
        isDrawerOpen: false,
        menuElements: [
            ['Home','/'],
            ['Lista Jedzonek','/food-list'],
            ['Dodaj Jedzonko','/food-add'],
            ['Ulubione Jedzonka','/food-favourites']
        ]
    }

    drawerToggle = () => {
        this.setState({
            isDrawerOpen: !this.state.isDrawerOpen
        })
    }

    render() {
        return (
            <MuiThemeProvider>
                <BrowserRouter>
                    <div>
                        <AppBar butt={this.drawerToggle}/>
                        <SideBar
                            isOpen={this.state.isDrawerOpen}
                            butt={this.drawerToggle}
                            menuElements={this.state.menuElements}/>

                        <Route path="/" exact={true} component={Dashboard}/>
                        <Route path="/food-list" component={FoodList}/>
                        <Route path="/food-favourites" component={Favourites}/>
                        <Route path="/food-add" component={FoodAddRedux}/>
                        <Route path="/food-details/:uid/" component={FoodDetails}/>

                        <ShareButton />
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>

        );
    }
}

export default App;
