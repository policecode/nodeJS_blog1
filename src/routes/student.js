const express = require('express');
const router = express.Router();

const studentController = require('../app/controllers/studentController');

router.get('/create/:id', studentController.create);
router.get('/groups/:id', studentController.classroomManagement);
router.get('/restore/:id', studentController.restore);
router.get('/:id', studentController.showStudent);
router.get('/updateForm/:id', studentController.updateForm);

router.post('/addStudent', studentController.addStudent);
router.post('/optionStudent', studentController.optionStudent);

router.put('/changeStudent/:id', studentController.changeStudent);
router.put('/restoreStudent/:id', studentController.restoreStudent);

router.delete('/deleteStudent/:id', studentController.deleteStudent);
router.delete('/destroy/:id', studentController.destroy);


module.exports = router;