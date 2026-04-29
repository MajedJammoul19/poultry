const jwt = require('jsonwebtoken');
const User = require('./models/User');

exports.authMiddleware = async (req, res, next) => {
  try {
    // الحصول على التوكن من الرأس
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'يجب توفير توكن المصادقة'
      });
    }

    // التحقق من التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }

    // إضافة بيانات المستخدم إلى الطلب
    req.userId = user._id;
    req.userRole = user.role;
    next();

  } catch (err) {
    res.status(401).json({
      success: false,
      message: 'جلسة الدخول غير صالحة',
      error: err.message
    });
  }
};

// ميدلوير للتحقق من الصلاحيات
exports.checkPermission = (permission) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      
      if (!user.hasPermission(permission)) {
        return res.status(403).json({
          success: false,
          message: 'غير مسموح لك بالوصول لهذه الصفحة'
        });
      }
      
      next();
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ في التحقق من الصلاحيات'
      });
    }
  };
};