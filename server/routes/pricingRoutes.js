const express = require('express');
const router = express.Router();
const controller = require('../controller/pricingController');

router.get('/api/prices', controller.getAllPrices);
router.post('/api/prices', controller.createPrice);
router.delete('/api/prices/:id', controller.deletePrice);
router.put('/api/prices/:id', controller.updatePrice);
module.exports = router;
