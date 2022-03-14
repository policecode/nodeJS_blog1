const LopHoc = require('../model/LopHoc');
const Student = require('../model/Student');

const { mutipleMongooseToObject, mongooseToOject } = require('../../until/mongoose');

class StudentController {

    // [POST] /student/addStudent
    addStudent(req, res, next) {
        const student = new Student(req.body);
        
            student.save()
                .then(() => {
                    res.redirect('back');
                })
                .catch(err => {
                    res.redirect('/');
                })
    }

    // [POST] /student/addStudent
    optionStudent(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Student.delete({_id: { $in: req.body.students }})
                .then(() => {
                    res.redirect('back');
                })
                .catch(next);
                break;
        
            default:
                res.json('action invalid!!!')
                break;
        }
    }
    
    
    // [PUT] /student/restoreStudent/:id
    restoreStudent(req, res, next) {
        Student.restore({_id: req.params.id})
                .then(() => {
                    res.redirect('back');
                })
                .catch(next);
    }
    
    // [PUT] /student/changeStudent/:id
    changeStudent(req, res, next) {
    Student.updateOne({_id: req.params.id}, req.body)
            .then(() => {
                const url = '/students/groups/' + req.body.keyClass;
                res.redirect(url);
            })
            .catch(next);
    }

    // [Delete] /student/deleteStudent/:id
    deleteStudent(req, res, next) {
        Student.delete({_id: req.params.id})
                .then(() => {
                    res.redirect('back');
                })
                .catch(next);
    }
    
    // [Delete] /student/deleteStudent/:id
    destroy(req, res, next) {
        Student.deleteOne({_id: req.params.id})
                .then(() => {
                    res.redirect('back');
                })
                .catch(next);
    }
    //[GET] /student/create/:id
    create(req, res, next) {
        let classQuerry = LopHoc.findById(req.params.id);
        
        Promise.all([classQuerry])
        .then(([lopHoc]) => {
            res.render('student/createStudent', {
                lopHoc:mongooseToOject(lopHoc),
            });

        })
        .catch(next)
    }

      //[GET] /student/:id
    showStudent(req, res, next) {
        let studentQuerry = Student.findById(req.params.id);

        Promise.all([studentQuerry])
            .then(([student]) => {
                LopHoc.findById({_id: student.keyClass})
                    .then(lopHoc => {
                        res.render('student/showStudent', {
                            lopHoc:mongooseToOject(lopHoc),
                            student: mongooseToOject(student),
                        });
                    })
                    .catch(next);
            })
            .catch(next)
    }

          //[GET] /groups/:id
        classroomManagement(req, res, next) {
            let studentQuerry = Student.find({keyClass: req.params.id});
            let classQuerry = LopHoc.findById(req.params.id);
            let countDel = Student.countDocumentsDeleted();
            let coutStudent = Student.count({ keyClass: req.params.id });

            if (req.query.hasOwnProperty('_sort')) {
                studentQuerry = studentQuerry.sort({
                    [req.query.column]: req.query.type
                });
            } else {
                studentQuerry = studentQuerry.sort({
                    fullName: 'desc',
                });
            }
            Promise.all([studentQuerry, classQuerry, countDel, coutStudent])
                .then(([student, lopHoc, count, countStudent]) => {
                    let page = req.query.page || 1;
                    let perPage = 10;
                    let start = (page - 1)*perPage;
                    let end = page * perPage;
                    student = student.slice(start, end);
                    res.render('student/classroomManagement', {
                        lopHoc:mongooseToOject(lopHoc),
                        student: mutipleMongooseToObject(student),
                        count: count,
                        countStudent: countStudent,
                    });
                     
                })
                .catch(next)
        }

         //[GET] /restore/:id
         restore(req, res, next) {
            let studentRestore= Student.findDeleted({keyClass: req.params.id});
            let classQuerry = LopHoc.findById(req.params.id);
            Promise.all([studentRestore, classQuerry])
                .then(([student, lopHoc]) => {
                  
                    res.render('student/restore', {
                        lopHoc:mongooseToOject(lopHoc),
                        student: mutipleMongooseToObject(student),
                    });
                     
                })
                .catch(next)
        }

        //[GET] /updateForm/:id
        updateForm(req, res, next) {
            Student.findById(req.params.id)
                .then(student => {
                    res.render('student/updateStudent', {
                        student: mongooseToOject(student),
                    });
                })
                .catch(next);
           
        }
        
}



module.exports = new StudentController;