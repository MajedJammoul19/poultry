const express = require('express');
const router = express.Router();
const {
  getDashboardData,
  updateDashboardData
} = require('../controllers/dashboardController');

// ✅ هذا الرابط يجب أن يكون: /api/dashboard-data/العنوان
router.put('/:title', updateDashboardData);  // بدون '/api/dashboard-data' في البداية

// ✅ وهذا الرابط: /api/dashboard-data
router.get('/', getDashboardData);

module.exports = router;