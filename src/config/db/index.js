const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/VanNoi_HighSchool');
        console.log('Connect Successfully');
    } catch (error) {
        console.log('failed to connect')
    }

}

module.exports = { connect };
