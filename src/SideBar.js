import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

class SideBar extends Component {
    render() {
        return (
            <Drawer
                docked={false}
                width={250}
                open={this.props.isOpen}
                onRequestChange={this.props.butt}
            >
                {
                    this.props.menuElements
                        .map((element, index) => (
                            <MenuItem
                                onClick={this.props.butt}
                                key={index}
                            >
                                <Link to={element[1]}>{element[0]}</Link>
                            </MenuItem>
                        ))
                }
            </Drawer>
        )
    }
}

export default SideBar