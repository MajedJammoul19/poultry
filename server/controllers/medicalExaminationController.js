const MedicalExamination = require('../models/MedicalExamination');

// Create new medical examination
exports.createExamination = async (req, res) => {
  try {
    const { date, vetName, location, chickenCount, healthStatus, notes } = req.body;

    // Basic validation
    if (!date  || !vetName || !location || !chickenCount || !healthStatus ||  !notes) {
      return res.status(400).json({
        success: false,
        error: 'البيانات الأساسية ناقصة'
      });
    }

    const examination = await MedicalExamination.create({
      date: date || Date.now(),
      vetName,
      location,
      chickenCount,
      healthStatus,
      notes
     
    });

    res.status(201).json({
      success: true,
      data: examination
    });

  } catch (error) {
    console.error('Error creating medical examination:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'حدث خطأ في الخادم'
    });
  }
};

// Get all medical examinations
exports.getExaminations = async (req, res) => {
  try {
    const examinations = await MedicalExamination.find()
      .sort('-date');

    res.status(200).json({
      success: true,
      count: examinations.length,
      data: examinations
    });
  } catch (error) {
    console.error('Error getting medical examinations:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


// Get single examination
exports.getExamination = async (req, res) => {
  try {
    const examination = await MedicalExamination.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!examination) {
      return res.status(404).json({
        success: false,
        error: 'تقرير الفحص الطبي غير موجود'
      });
    }

    res.status(200).json({
      success: true,
      data: examination
    });
  } catch (error) {
    console.error('Error getting medical examination:', error);
    res.status(500).json({
      success: false,
      error: 'حدث خطأ في الخادم'
    });
  }
};

// Update examination
exports.updateExamination = async (req, res) => {
  try {
    const { date, vetName, location, chickenCount, healthStatus, notes } = req.body;

    const examination = await MedicalExamination.findByIdAndUpdate(
      req.params.id,
      {
        date,
        vetName,
        location,
        chickenCount,
        healthStatus,
        notes
      },
      { new: true, runValidators: true }
    );

    if (!examination) {
      return res.status(404).json({
        success: false,
        error: 'تقرير الفحص الطبي غير موجود'
      });
    }

    res.status(200).json({
      success: true,
      data: examination
    });
  } catch (error) {
    console.error('Error updating medical examination:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'حدث خطأ في الخادم'
    });
  }
};

// Delete examination
exports.deleteExamination = async (req, res) => {
  try {
    const examination = await MedicalExamination.findByIdAndDelete(req.params.id);

    if (!examination) {
      return res.status(404).json({
        success: false,
        error: 'تقرير الفحص الطبي غير موجود'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting medical examination:', error);
    res.status(500).json({
      success: false,
      error: 'حدث خطأ في الخادم'
    });
  }
};