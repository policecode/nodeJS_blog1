const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const Student = new Schema({
    fullName: {type: String},
    birthday: {type: Date},
    phone: {type: String},
    avatar: {type: String},
    facebook:{type: String},
    homeTown: {type: String},
    keyClass: {type: String},
}, {
    timestamps: true,
});

Student.plugin(mongooseDelete, {
    overrideMethods: true,
    deletedAt: true,
});

module.exports = mongoose.model('Student', Student);