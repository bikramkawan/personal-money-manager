/**
 * Created by bikramkawan on 8/16/17.
 */
import React, {Component} from 'react';

import {DropdownButton, MenuItem} from 'react-bootstrap'


export default class SelectBox extends Component {

    renderMenuItems = () => {

        const items = this.props.menuItems.map(itemName=>
            <MenuItem eventKey={itemName} key={itemName}><span
                className="text-capitalize">{itemName}</span></MenuItem>)

        return items;


    }

    handleSelect = (catName) => {
        this.props.onSelect(catName);

    }

    render() {

        return (
            <DropdownButton bsStyle={'default'} title={'Select Category'} id="1" onSelect={this.handleSelect}>
                {this.renderMenuItems()}
            </DropdownButton>)

    }


}
