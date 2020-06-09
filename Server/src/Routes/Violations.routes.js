const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const ViolationsController = require('../Controllers').ViolationsController;

// checking if it works
router.get('/test', ViolationsController.test);

router.post('/newViolation',upload.fields([{
    name: 'video', maxCount: 1
  }, {
    name: 'image', maxCount: 1
  }]), ViolationsController.newViolation);

router.get('/violationFile/:url/:contentType', ViolationsController.getViolationFile);

router.get('/allViolations', ViolationsController.allViolations);

router.get('/violationById/:id', ViolationsController.getViolationById);

module.exports = router;
