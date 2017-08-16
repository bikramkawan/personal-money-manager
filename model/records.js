/**
 * Created by bikramkawan on 8/16/17.
 */
//mode/comments.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var recordSchema = new Schema({
    id: Number,
    date: String,
    payment: String,
    category: String,
    debit: Number,
    credit: Number
});

//export our module to use in server.js
module.exports = mongoose.model('records', recordSchema);