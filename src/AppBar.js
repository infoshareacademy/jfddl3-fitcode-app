import React, {Component} from 'react';
import MuiAppBar from 'material-ui/AppBar'

class AppBar extends Component {
    render() {
        return (
            <MuiAppBar
                title="My First App"
                onLeftIconButtonClick={this.props.butt}
            />
        )
    }
}

export default AppBar