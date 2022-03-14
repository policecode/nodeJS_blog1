const express = require('express');
const router = express.Router();

const calssesController = require('../app/controllers/ClassesController');

router.get('/create', calssesController.create);
router.get('/:id', calssesController.showClass);
router.post('/addNew', calssesController.addNew);


module.exports = router;