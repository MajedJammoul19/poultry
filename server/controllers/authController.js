const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// تحسين تسجيل المستخدم
exports.signup = async (req, res) => {
  console.log('📤 البيانات الواردة:', req.body); // <<-- أضف هذا السطر
  try {
    const { name, email, password, role } = req.body;
    console.log(name)
    // 1. التحقق من البيانات
    console.log('📩 بيانات الواردة:', { name, email, role });

    // 2. حفظ المستخدم
    const user = new User({ name, email, password, role });
    await user.save();
    console.log('💾 تم الحفظ:', user);

    // 3. إرسال الاستجابة بشكل صحيح
    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error('❌ خطأ:', err);
    res.status(500).json({
      success: false,
      error: err.message,
      fullError: process.env.NODE_ENV === 'development' ? err : undefined
    });
  }
};
// تحسين تسجيل الدخول
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { email, password } = req.body;

    // تحسين البحث مع معالجة الأحرف
    const user = await User.findOne({ 
      email: email.toLowerCase().trim() 
    }).select('+password +lastLogin');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'بيانات الدخول غير صحيحة',
        errorCode: 'INVALID_CREDENTIALS'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'بيانات الدخول غير صحيحة',
        errorCode: 'INVALID_CREDENTIALS'
      });
    }

    // تحديث آخر دخول
    user.lastLogin = Date.now();
    await user.save();

   const token = jwt.sign(
  {
    userId: user._id,
    role: user.role,
    iat: Math.floor(Date.now() / 1000)
  },
  process.env.JWT_SECRET, // استخدم المتغير البيئي هنا
  { 
    expiresIn: '30d',
    algorithm: 'HS256'
  }
);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
        lastLogin: user.lastLogin
      }
    });

  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في السيرفر',
      error: err.message,
      errorDetails: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};