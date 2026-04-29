const express = require('express');
const router = express.Router();
const medicalExaminationController = require('../controllers/medicalExaminationController');

router.post('/api/medical-examinations',medicalExaminationController.createExamination);
router.get('/api/medical-examinations', medicalExaminationController.getExaminations);

module.exports = router;