const mongoose = require('mongoose');

const medicalExaminationSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'التاريخ مطلوب'],
    default: Date.now
  },
  vetName: {
    type: String,
    required: [true, 'اسم الطبيب البيطري مطلوب'],
    trim: true,
    maxlength: [100, 'اسم الطبيب لا يمكن أن يتجاوز 100 حرف']
  },
  location: {
    type: String,
    required: [true, 'الموقع مطلوب'],
    trim: true
  },
  chickenCount: {
    type: Number,
    required: [true, 'عدد الدجاج مطلوب'],
    min: [1, 'يجب أن يكون العدد على الأقل 1']
  },
  healthStatus: {
    type: String,
    required: [true, 'الحالة الصحية مطلوبة'],
    enum: {
      values: ['صحي', 'غير صحي'],
      message: 'الحالة الصحية يجب أن تكون إما "صحي" أو "غير صحي"'
    }
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'لا يمكن أن تتجاوز الملاحظات 1000 حرف']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('MedicalExamination', medicalExaminationSchema);