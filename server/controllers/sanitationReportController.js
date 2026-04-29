const SanitationReport = require('../models/sanitationReportModel');
exports.createReport = async (req, res) => {
  try {
    // إنشاء البلاغ بدون ربطه بأي مستخدم
    const report = await SanitationReport.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'تم تقديم بلاغ النظافة بنجاح',
      data: report
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'فشل في تقديم البلاغ',
      error: error.message,
      validationErrors: error.errors || null
    });
  }
};
// جلب جميع تقارير النظافة
exports.getAllReports = async (req, res) => {
  try {
    const reports = await SanitationReport.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
  } catch (error) {
    console.error('Error getting sanitation reports:', error);
    res.status(500).json({
      success: false,
      message: 'فشل في جلب تقارير النظافة',
      error: error.message
    });
  }
};
