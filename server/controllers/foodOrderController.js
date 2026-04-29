const FoodOrder=require("../models/FoodOrder")

exports.createOrder = async (req, res) => {
  try {
    console.log('Request body:', req.body); // تأكد من وصول البيانات
    
    const order = new FoodOrder(req.body);
    const savedOrder = await order.save();
    
    console.log('Saved order:', savedOrder); // تأكد من كائن الحفظ
    
    // إضافة هذا السطر للتحقق من وجود الوثيقة فعلاً في DB
    const foundOrder = await FoodOrder.findById(savedOrder._id);
    console.log('Found in DB:', foundOrder);
    
    res.status(201).json({
      success: true,
      data: savedOrder
    });
  } catch (err) {
    console.error('Error saving order:', err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await FoodOrder.find().sort({ date: -1 }); // ترتيب حسب التاريخ
    
    // تحويل البيانات للهيكل المطلوب في الفرونت إند
    const reports = orders.map(order => ({
      date: order.date,
      feedType: order.feedType,
      quantity: `${order.quantity} كجم`
    }));
    
    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};