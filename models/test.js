/**
 * Created by cui on 16/9/5.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const TestSchema = new Schema({
    name:{},
    age:{}
});

module.exports = mongoose.model("Test",TestSchema);