const LopHoc = require('../model/LopHoc');
const { mutipleMongooseToObject } = require('../../until/mongoose');

class SiteController {

    // [GET] /
    index(req, res, next) {
        LopHoc.find({})
            .then(lopHoc => {
                res.render('home', {
                    lopHoc: mutipleMongooseToObject(lopHoc),
                });
                
            })
            .catch(next);
    }

    //[GET] /news/search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController;