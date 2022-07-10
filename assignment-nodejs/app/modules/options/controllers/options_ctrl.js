'use strict';

var mongoose = require('mongoose'),
    OPTIONS = mongoose.model('option'),
    response = require('../../../lib/response_handler.js'),
    commonQuery = require('../../../lib/commonQuery.js'),
    config = require("../../../config/config").get(process.env.NODE_ENV);


module.exports = {
    getOptions: getOptions
};

function getOptions(req, res) {
    async function asy_init() {
        try {
            let condition = {
                isDeleted: false
            }
            let totalCount = await commonQuery.countData(OPTIONS, condition);
            let query = OPTIONS.find(condition)
            query.lean().exec(function(err, optionsList) {
                if (err) {
                    return response(res, 400, "Something went wrong");
                }
                return response(res, 200, "Data fetched successfully", optionsList, totalCount);

            })
        } catch (e) {
            return response(res, 400, "Something went wrong", e);
        }

    }
    asy_init();
}
