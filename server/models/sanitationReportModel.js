const mongoose = require('mongoose');

const sanitationReportSchema = new mongoose.Schema({
  facilityName: {
    type: String,
    required: [true, 'اسم المنشأة مطلوب'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'الموقع مطلوب'],
    trim: true
  },
  cleanlinessRating: {
    type: Number,
    required: [true, 'تقييم النظافة مطلوب'],
    min: 1,
    max: 5
  },
  notes: {
    type: String,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('SanitationReportModel', sanitationReportSchema);