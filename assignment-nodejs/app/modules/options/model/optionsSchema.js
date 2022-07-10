'use strict';
var mongoose = require('mongoose');

var optionsSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    id: {
        type: Number,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})
var option = mongoose.model('option', optionsSchema);
module.exports = option;