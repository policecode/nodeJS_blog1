const LopHoc = require('../model/LopHoc');
const Student = require('../model/Student');

const { mutipleMongooseToObject, mongooseToOject } = require('../../until/mongoose');

class NewsController {

    // [POST] /classes/addNew
    addNew(req, res, next) {
        const lopMoi = new LopHoc(req.body);
        lopMoi.keyClass = req.body.studyTime + '-' + req.body.nameClass;
        
            lopMoi.save()
                .then(() => {
                    res.redirect('/classes/create');
                })
                .catch(err => {
                    res.redirect('/');
                })
    }

    //[GET] /classes/create
    create(req, res) {
        res.render('class/newClass');
    }

      //[GET] /classes/:id
    showClass(req, res, next) {
        let studentQuerry = Student.find({ keyClass: req.params.id });
        let classQuerry = LopHoc.findById(req.params.id);
        let coutStudent = Student.count({ keyClass: req.params.id });
        Promise.all([studentQuerry, classQuerry, coutStudent])
            .then(([student, lopHoc, count]) => {
                let page = req.query.page || 1;
                let perPage = 8;
                let start = (page - 1)*perPage;
                let end = page * perPage;
                student = student.slice(start, end);
                res.render('class/showlass', {
                    lopHoc:mongooseToOject(lopHoc),
                    student: mutipleMongooseToObject(student),
                    count: count,
                });

            })
            .catch(next)
    }
}

module.exports = new NewsController;