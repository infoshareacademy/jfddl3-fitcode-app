import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';


export default class MealAdd extends React.Component {
    state = {
        open: false,
        mealSelect:'sniadanie'
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleMealSelect = (event, index, value) => this.setState({mealSelect: value})

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];


        return (
            <div>
                <RaisedButton label="Dodaj do posilku" primary={true} onClick={this.handleOpen} />
                <Dialog
                    title="Dodaj jedzonko do posilku"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <div>
                        <SelectField
                            floatingLabelText="Twoj posilek"
                            value={this.state.mealSelect}
                            onChange={this.handleMealSelect}
                        >
                            <MenuItem value={'sniadanie'} primaryText="Sniadanie"/>
                            <MenuItem value={'sniadanie2'} primaryText="Drugie sniadanie"/>
                            <MenuItem value={'obiad'} primaryText="Obiad"/>
                            <MenuItem value={'podwieczorek'} primaryText="Podwieczorek"/>
                            <MenuItem value={'kolacja'} primaryText="Kolacja"/>
                        </SelectField>
                        <DatePicker hintText="Wybierz dzien" />
                    </div>
                </Dialog>
            </div>
        );
    }
}