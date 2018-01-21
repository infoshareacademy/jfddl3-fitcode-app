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


class App extends Component {

    state = {
        isDrawerOpen: false,
        menuElements: [
            ['Home','/'],
            ['Foodies List','/food-list'],
            ['Add New Foodie','/food-add'],
            ['Fav Foodies','/food-favourites'],
            ['Food Details Butt', '/food-details']
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
                        <Route path="/food-add" component={FoodAdd}/>
                        <Route path="/food-details" component={FoodDetails}/>

                        <FoodAdd />
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>

        );
    }
}

export default App;