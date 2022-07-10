'use strict';
var mongoose = require('mongoose'),
    commonQuery = require("../lib/commonQuery");

//All models schema test
require("../modules/options/model/optionsSchema");


if (!process.env.NODE_ENV || process.env.NODE_ENV == undefined) {
    process.env.NODE_ENV = 'local';
}

var OPTIONS = mongoose.model("option");

const config = require('./config.js').get(process.env.NODE_ENV);

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE.host + config.DATABASE.port + "/" + config.DATABASE.dbname);
let setOptionsData = async() => {
    let totalCount = await commonQuery.countData(OPTIONS, {});
    if(totalCount == 0) {
        let mockData = [
            { id: 1, name: "Apple" },
            { id: 2, name: "Orange" },
            { id: 3, name: "Papaya" },
            { id: 4, name: "Mango" },
            { id: 5, name: "Banana" },
            { id: 6, name: "Pomengranate" },
            { id: 7, name: "Pineapple" },
        ];
        commonQuery.InsertManyIntoCollection(OPTIONS, mockData)
    }
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection failed"));
db.once('open', function() {
    console.log("Database connected successfully!")
    setOptionsData()
});
module.exports = db;