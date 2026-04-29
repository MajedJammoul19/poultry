const express = require('express');
const router = express.Router();
const fuelOrderController=  require('../controllers/fuelOrderController');

router.post('/api/fuel-orders',fuelOrderController.createFuelOrder );
router.get('/api/fuel-orders', fuelOrderController.getAllFuelOrders);


module.exports = router;