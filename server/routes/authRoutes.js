const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const fuelOrderController=  require('../controllers/fuelOrderController');
const foodOrderController=require("../controllers/foodOrderController");
const sanitationReportController= require('../controllers/sanitationReportController');
const preventionPlanController=  require('../controllers/preventionPlanController');
const medicalExaminationController = require('../controllers/medicalExaminationController');
const pricingController = require('../controllers/pricingController');
const managerRecommendationController = require('../controllers/managerRecommendationController');
const feedingPlanController = require('../controllers/feedingPlanController');
const packingOperationController = require('../controllers/packingOperationController');
const foodConsumptionController = require('../controllers/foodConsumptionController');
const FuelConsumptionController= require('../controllers/FuelConsumptionController')
const medicalRequestController = require('../controllers/medicalRequestController');
// تأكد من أن المسارات تبدأ بـ / ولا تنسى module.exports
router.post('/api/auth/signup', authController.signup);
router.post('/api/auth/login', authController.login);

router.post('/api/sanitation-reports', sanitationReportController.createReport);
router.get('/api/sanitation-reports', sanitationReportController.getAllReports);
router.post('/api/orders', foodOrderController.createOrder);
router.get('/api/orders', foodOrderController.getAllOrders);
router.post('/api/fuel-orders',fuelOrderController.createFuelOrder );
router.get('/api/fuel-orders', fuelOrderController.getAllFuelOrders);
router.post('/api/prevention-plans',preventionPlanController.createPreventionPlan)
router.get('/api/prevention-plans',preventionPlanController.getPreventionPlans)
router.post('/api/medical-examinations',medicalExaminationController.createExamination);
router.get('/api/medical-examinations', medicalExaminationController.getExaminations);
router.post('/api/prices', pricingController.createPrice);
router.get('/api/prices', pricingController.getAllPrices);
router.delete('/api/prices/:id', pricingController.deletePrice);
router.put('/api/prices/:id', pricingController.updatePrice);
router.post('/api/manager-recommendations', managerRecommendationController.createRecommendation);
router.post('/api/feeding-plans', feedingPlanController.createFeedingPlan);
router.get('/api/feeding-plans', feedingPlanController.getAllFeedingPlans)
router.post('/api/packing-operations', packingOperationController.createPackingOperation);
router.get('/api/packing-operations', packingOperationController.getAllOperations)
router.post('/api/food-consumption', foodConsumptionController.createConsumption);
router.get('/api/food-consumption', foodConsumptionController.getAllConsumptions);
router.post('/api/fuel-consumption', FuelConsumptionController.createConsumption);
router.get('/api/fuel-consumption', FuelConsumptionController.getAllConsumptions);
router.post('/api/medical-requests', medicalRequestController.createMedicalRequest);
router.get('/api/medical-requests', medicalRequestController.getAllMedicalRequests);
module.exports = router;