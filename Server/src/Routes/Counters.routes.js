const express = require('express');
const router = express.Router();

const CountersController = require ('../Controllers').CountersController;

router.get('/test', CountersController.test);

router.post('/create', CountersController.create);

router.post('/update', CountersController.update);

router.post('/reset', CountersController.reset);

router.post('/delete', CountersController.delete);

router.get('/getAll', CountersController.getAll);

module.exports = router;