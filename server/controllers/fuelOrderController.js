const FuelOrder = require('../models/FuelOrder');

// إنشاء طلب وقود جديد
exports.createFuelOrder = async (req, res) => {
  try {
    const fuelOrder = await FuelOrder.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'تم إنشاء طلب الوقود بنجاح',
      data: fuelOrder
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'فشل في إنشاء طلب الوقود',
      error: error.message,
      validationErrors: error.errors || null
    });
  }
};

// الحصول على جميع طلبات الوقود
exports.getAllFuelOrders = async (req, res) => {
  try {
    const fuelOrders = await FuelOrder.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: fuelOrders.length,
      data: fuelOrders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'فشل في جلب طلبات الوقود',
      error: error.message
    });
  }
};

// الحصول على طلب وقود بواسطة ID
exports.getFuelOrderById = async (req, res) => {
  try {
    const fuelOrder = await FuelOrder.findById(req.params.id);
    
    if (!fuelOrder) {
      return res.status(404).json({
        success: false,
        message: 'لم يتم العثور على طلب الوقود'
      });
    }
    
    res.status(200).json({
      success: true,
      data: fuelOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'فشل في جلب طلب الوقود',
      error: error.message
    });
  }
};

// تحديث حالة طلب الوقود
exports.updateFuelOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const fuelOrder = await FuelOrder.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!fuelOrder) {
      return res.status(404).json({
        success: false,
        message: 'لم يتم العثور على طلب الوقود'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'تم تحديث حالة طلب الوقود',
      data: fuelOrder
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'فشل في تحديث حالة طلب الوقود',
      error: error.message
    });
  }
};

// حذف طلب وقود
exports.deleteFuelOrder = async (req, res) => {
  try {
    const fuelOrder = await FuelOrder.findByIdAndDelete(req.params.id);
    
    if (!fuelOrder) {
      return res.status(404).json({
        success: false,
        message: 'لم يتم العثور على طلب الوقود'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'تم حذف طلب الوقود بنجاح'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'فشل في حذف طلب الوقود',
      error: error.message
    });
  }
};