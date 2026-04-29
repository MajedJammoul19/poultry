const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // المعلومات الأساسية
  name: {
    type: String,
    required: [true, 'الاسم مطلوب'],
    trim: true,
    maxlength: [50, 'الاسم لا يجب أن يتجاوز 50 حرفاً']
  },
  email: {
    type: String,
    required: [true, 'البريد الإلكتروني مطلوب'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'البريد الإلكتروني غير صالح']
  },
  password: {
    type: String,
    required: [true, 'كلمة المرور مطلوبة'],
    minlength: [8, 'كلمة المرور يجب أن تكون على الأقل 8 أحرف'],
    select: false // إخفاء في الاستعلامات العامة
  },

  // الصلاحيات والأدوار
  role: {
    type: String,
    enum: {
      values: ['admin', 'employee', 'vet', 'food_supplier', 'fuel_supplier'],
      message: 'الدور المحدد غير صالح'
    },
    default: 'employee',
    required: true
  },
  permissions: {
    type: [String],
    default: function() {
      // الصلاحيات الافتراضية لكل دور
      const defaultPermissions = {
        admin: ['all'],
        employee: ['view_reports', 'create_orders'],
        vet: ['view_patients', 'manage_medical_records'],
        food_supplier: ['manage_food', 'update_inventory'],
        fuel_supplier: ['manage_fuel', 'update_deliveries']
      };
      return defaultPermissions[this.role] || [];
    }
  },

  // معلومات إضافية
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// تشفير كلمة المرور قبل الحفظ
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    console.log('🔑 جارٍ تشفير كلمة المرور...');
    this.password = await bcrypt.hash(this.password, 12);
    console.log('✅ تم التشفير بنجاح:', this.email);
    next();
  } catch (err) {
    console.error('❌ خطأ في التشفير:', err);
    next(err);
  }
});

// مقارنة كلمات المرور
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// التحقق من الصلاحية
userSchema.methods.hasPermission = function(permission) {
  return this.permissions.includes('all') || this.permissions.includes(permission);
};

module.exports = mongoose.model('User', userSchema);