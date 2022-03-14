const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const Account = new Schema({
    fullName: {type: String},
    account: {type: String, unique: true},
    password: {type: String},
   
}, {
    timestamps: true,
});

Account.plugin(mongooseDelete, {
    overrideMethods: true,
    deletedAt: true,
});

module.exports = mongoose.model('Account', Account);