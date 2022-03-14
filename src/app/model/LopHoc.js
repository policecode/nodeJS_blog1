const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');


const LopHoc = new Schema({
    nameClass: {type: String},
    studyTime: {type: String},
    imgClass: {type: String},
    keyClass: {type: String, unique: true},
}, {
    timestamps: true,
});

LopHoc.plugin(mongooseDelete, {
    overrideMethods: true,
    deletedAt: true,
});
module.exports = mongoose.model('Classe', LopHoc);