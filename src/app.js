/**
 * Created by bikramkawan on 8/9/17.
 */
import React, {Component} from 'react';
import InputBox from './components/InputBox/InputBox';

const data = [{
    "id": 1,
    "first_name": "Lilia",
    "last_name": "Quittonden",
    "email": "lquittonden0@marriott.com",
    "gender": "Female",
    "ip_address": "253.47.78.184"
}, {
    "id": 2,
    "first_name": "Keenan",
    "last_name": "Heyfield",
    "email": "kheyfield1@paypal.com",
    "gender": "Male",
    "ip_address": "199.192.191.180"
}, {
    "id": 3,
    "first_name": "Valina",
    "last_name": "Graves",
    "email": "vgraves2@godaddy.com",
    "gender": "Female",
    "ip_address": "128.190.154.37"
}, {
    "id": 4,
    "first_name": "Karla",
    "last_name": "Deeble",
    "email": "kdeeble3@columbia.edu",
    "gender": "Female",
    "ip_address": "209.156.86.197"
}, {
    "id": 5,
    "first_name": "Viola",
    "last_name": "Dendle",
    "email": "vdendle4@bbc.co.uk",
    "gender": "Female",
    "ip_address": "241.213.125.36"
}];


class App extends Component {

    renderRow() {
        const rows = data.map(d=><div className="row">
            <div className="col-md-1 items">{d.id}</div>
            <div className="col-md-2 items">{d.first_name}</div>
            <div className="col-md-3 items">{d.last_name}</div>
            <div className="col-md-2 items">{d.email}</div>
            <div className="col-md-2 items">{d.gender}</div>
            <div className="col-md-2 items">{d.ip_address}</div>

        </div>)

        return rows;

    }


    render() {
        return (<div className="app">
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-md-1 heading">#</div>
                    <div className="col-md-2 heading">Date</div>
                    <div className="col-md-3 heading">Payment Description</div>
                    <div className="col-md-2 heading">Category</div>
                    <div className="col-md-2 heading">Debit</div>
                    <div className="col-md-2 heading">Credit</div>
                </div>
                {this.renderRow()}

                <div className="row">
                    <div className="col-md-1 "><InputBox placeholder="Enter #.."/></div>
                    <div className="col-md-2"><InputBox placeholder="Enter date.."/></div>
                    <div className="col-md-3"><InputBox placeholder="Enter description.."/></div>
                    <div className="col-md-2"><InputBox placeholder="Enter cateogry.."/></div>
                    <div className="col-md-2"><InputBox placeholder="Enter debit.."/></div>
                    <div className="col-md-2"><InputBox placeholder="Enter credit.."/></div>
                </div>


                <div className="row saveRow">
                    <div className="col-md-2 saveCol">
                        <button type="button" className="btn btn-primary saveButton">Save</button>
                    </div>

                </div>
            </div>


        </div>)
    }

}

export default App