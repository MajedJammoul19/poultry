const mongoose = require('mongoose');

const fuelOrderSchema = new mongoose.Schema({
  facilityName: {
    type: String,
    required: [true, 'اسم المنشأة مطلوب'],
    trim: true,
    maxlength: [150, 'لا يمكن أن يتجاوز اسم المنشأة 150 حرف']
  },
  ownerName: {
    type: String,
    required: [true, 'اسم المالك مطلوب'],
    trim: true,
    maxlength: [100, 'لا يمكن أن يتجاوز اسم المالك 100 حرف']
  },
  contactNumber: {
    type: String,
    required: [true, 'رقم الاتصال مطلوب'],
    trim: true,
    match: [/^[0-9]{8,15}$/, 'الرجاء إدخال رقم هاتف صحيح']
  },
  fuelType: {
    type: String,
    required: [true, 'نوع الوقود مطلوب'],
    enum: {
      values: ['ديزل', 'غاز طبيعي' ],
      message: 'نوع الوقود يجب أن يكون واحدًا من: ديزل، غاز طبيعي، '
    }
  },
  quantity: {
    type: Number,
    required: [true, 'الكمية المطلوبة مطلوبة'],
    min: [1, 'الكمية يجب أن تكون على الأقل 1 لتر'],
    max: [100000, 'الكمية القصوى المسموح بها هي 100,000 لتر']
  },
  deliveryDate: {
    type: Date,
    required: [true, 'تاريخ التوصيل مطلوب'],
    min: [Date.now, 'لا يمكن اختيار تاريخ قديم']
  },
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// إضافة فهارس لتحسين الأداء

// Middleware للتحقق قبل الحفظ
fuelOrderSchema.pre('save', function(next) {
  console.log(`تم إنشاء طلب وقود جديد للمنشأة: ${this.facilityName}`);
  next();
});

const FuelOrder = mongoose.model('FuelOrder', fuelOrderSchema);

module.exports = FuelOrder;