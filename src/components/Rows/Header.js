/**
 * Created by bikramkawan on 8/11/17.
 */

import React, {Component} from 'react'

class Header extends Component {


    render() {

        return (
            <div className="row">
                <div className="col-md-1 heading">#</div>
                <div className="col-md-2 heading">Date</div>
                <div className="col-md-3 heading">Payment Description</div>
                <div className="col-md-2 heading">Category</div>
                <div className="col-md-1 heading">Debit</div>
                <div className="col-md-1 heading">Credit</div>
            </div>
        )

    }

}

export default Header