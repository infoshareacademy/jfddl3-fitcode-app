import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import FoodList from './components/FoodList'
import FoodAdd from './components/FoodAdd'
import Dashboard from './components/Dashboard'
import Favourites from './components/Favourites'
import AppBar from './components/AppBar'
import SideBar from './components/SideBar'

import './index.css'
import FoodDetails from "./components/FoodDetails";
import ShareButton from './components/ShareButton'


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
                        <Route path="/food-add" component={FoodAdd}/>
                        <Route path="/food-details/:uid/" component={FoodDetails}/>

                        <ShareButton />
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>

        );
    }
}

export default App;
