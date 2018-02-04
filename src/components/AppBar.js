import React, {Component} from 'react';
import MuiAppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton';

import {connect} from 'react-redux'
import {logOut} from '../state/auth'

class AppBar extends Component {
    render() {
        return (
            <MuiAppBar
                style={{position:'fixed', opacity:0.8}}
                title={`FitCode App`}
                onLeftIconButtonClick={this.props.butt}
                iconElementRight={
                    <FlatButton
                        label="LogOut"
                        onClick={() => this.props.onLogOutClick()}
                    />
                }
            />
        )
    }
}

const mapStateToProps = state => ({
    //userEmail: state.auth.user.email
})

const mapDispatchToProps = dispatch => ({
    onLogOutClick: ()=> dispatch(logOut()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppBar)