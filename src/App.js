import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <AppBar/>
                    <SideBar/>

                    <Route path="/" exact={true} component={Dashboard} />
                    <Route path="/items" component={FoodList} />
                    <Route path="/favourties" component={Favourities} />
                    <Route path="/addnewitem" component={AddNewItem} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
