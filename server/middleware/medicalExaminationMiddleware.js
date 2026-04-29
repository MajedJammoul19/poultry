const MedicalExamination = require('../models/MedicalExamination');
const asyncHandler = require('express-async-handler');

// التحقق من ملكية التقرير الطبي
exports.checkExaminationOwnership = asyncHandler(async (req, res, next) => {
  const examination = await MedicalExamination.findById(req.params.id);
  
  if (!examination) {
    res.status(404);
    throw new Error('تقرير الفحص الطبي غير موجود');
  }

  // التحقق إذا كان المستخدم هو المنشئ أو مشرف
  if (examination.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('غير مصرح بالتعديل على هذا التقرير');
  }

  req.examination = examination;
  next();
});

// التحقق من صحة بيانات الفحص الطبي
exports.validateExaminationInput = asyncHandler(async (req, res, next) => {
  const { vetName, location, chickenCount, healthStatus } = req.body;

  if (!vetName || !location || !chickenCount || !healthStatus) {
    res.status(400);
    throw new Error('البيانات الأساسية ناقصة (اسم الطبيب، الموقع، عدد الدجاج، الحالة الصحية)');
  }

  if (typeof chickenCount !== 'number' || chickenCount < 1) {
    res.status(400);
    throw new Error('عدد الدجاج يجب أن يكون رقمًا أكبر من الصفر');
  }

  if (!['صحي', 'غير صحي'].includes(healthStatus)) {
    res.status(400);
    throw new Error('الحالة الصحية يجب أن تكون إما "صحي" أو "غير صحي"');
  }

  next();
});

// التحقق من صلاحية الطبيب البيطري
exports.authorizeVet = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'vet' && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('ليست لديك صلاحية طبيب بيطري');
  }
  next();
});

// تسجيل عمليات الفحص الطبي
exports.logExaminationAction = (actionType) => {
  return asyncHandler(async (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${actionType} - User: ${req.user.id}, Examination: ${req.params.id || 'new'}`);
    next();
  });
};