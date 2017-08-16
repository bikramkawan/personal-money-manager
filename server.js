//server.js
'use strict'

//first we import our dependencies...
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Records = require('./model/records');
var fs = require('fs')
var path = require('path')
//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set it up, or 3001
var port = process.env.API_PORT || 3001;

//db config -- REPLACE USERNAME/PASSWORD/DATABASE WITH YOUR OWN FROM MLAB!
var mongoDB = 'mongodb://bikram:bikram@ds023520.mlab.com:23520/personalbudget';
//var mongoDB = 'mongodb://bikram:bikram@ds139470.mlab.com:39470/bikram';
mongoose.connect(mongoDB, {useMongoClient: true})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//now we should configure the APi to use bodyParser and look for JSON data in the body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//now  we can set the route path & initialize the API
router.get('/', function (req, res) {

    // fs.open(path.join(__dirname, './personalSettingData/') + 'personalData.json', 'r', (err, fd) => {
    //     if (err) {
    //         if (err.code === 'ENOENT') {
    //             console.error('myfile does not exist');
    //             return;
    //         }
    //
    //         throw err;
    //     }
    //
    //     console.log(fd,'dd')
    // });
    //
    //
    // const readData = fs.readFile(path.join(__dirname, './personalSettingData/') + 'personalData.json', (err, data)=> {
    //
    //     if (err) {
    //         console.log(err, 'ddfdfd')
    //         throw err;
    //     }
    //     console.log(data, 'ddfasfsad')
    //
    //     return (data);
    // });
    //
    // console.log(readData, 'dfdf')


    res.json({message: 'API Initialized!'});
});

//adding the /comments route to our /api router
router.route('/records')
//retrieve all comments from the database
    .get(function (req, res) {
        //looks at our Records Schema

        Records.find(function (err, records) {
            if (err)
                res.send(err);
            //responds with a json object of our database comments.

            res.json(records)
        });
    })

    .post(function (req, res) {
        var records = new Records();

        (req.body.id) ? records.id = req.body.id : null;
        (req.body.date) ? records.date = req.body.date : null;
        (req.body.payment) ? records.payment = req.body.payment : null;
        (req.body.category) ? records.category = req.body.category : null;
        (req.body.credit) ? records.credit = req.body.credit : null;
        (req.body.debit) ? records.debit = req.body.debit : null;
        console.log(records)
        records.save(function (err) {
            if (err)
                res.send(err);
            res.json({message: 'Records successfully added!'});
        });
    });

//Adding a route to a specific comment based on the database ID
router.route('/records/:records_id')
//The put method gives us the chance to update our comment based on the ID passed to the route
    .put(function (req, res) {

        Records.findById(req.params.records_id, function (err, records) {
            console.log(err, records, req.params.records_id, req.body)
            if (err)
                res.send(err);
            //setting the new author and text to whatever was changed. If nothing was changed
            // we will not alter the field.

            (req.body.id) ? records.id = req.body.id : null;
            (req.body.date) ? records.date = req.body.date : null;
            (req.body.payment) ? records.payment = req.body.payment : null;
            (req.body.category) ? records.category = req.body.category : null;
            (req.body.credit) ? records.credit = req.body.credit : null;
            (req.body.debit) ? records.debit = req.body.debit : null;
            //save comment
            records.save(function (err) {
                if (err)
                    res.send(err);
                res.json({message: 'Records has been updated'});
            });
        });
    })
    //delete method for removing a comment from our database
    .delete(function (req, res) {
        //selects the comment by its ID, then removes it.
        Records.remove({_id: req.params.records_id}, function (err, comment) {
            if (err)
                res.send(err);
            res.json({message: 'Records has been deleted'})
        })
    });
//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function () {
    console.log(`api running on port ${port}`);
});
