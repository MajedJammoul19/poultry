require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV
const authRoutes = require("./routes/authRoutes")
const foodOrderRoutes=require("./routes/foodOrderRoutes")
const fuelOrderRoutes=require("./routes/fuelOrderRoutes")
const sanitationRoutes=require("./routes/sanitationRoutes")
const medicalExaminationRoutes = require("./routes/medicalExaminationRoutes")
const preventionPlanRoutes = require("./routes/preventionPlanRoutes")
const dashboardRoutes = require('./routes/dashboardRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// الاتصال بقاعدة البيانات (محدث للإصدارات الحديثة)
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/testDB');
    console.log('✅ Connected to MongoDB successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

app.use(authRoutes)
app.use(medicalExaminationRoutes);
app.use(foodOrderRoutes);
app.use(fuelOrderRoutes);
app.use(sanitationRoutes);
app.use(preventionPlanRoutes);
app.use('/api/dashboard-data', require('./routes/dashboardRoutes'));
// app.use(dashboardRoutes);


// تشغيل السيرفر بعد الاتصال بقاعدة البيانات
const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`\n--- Poultry System Backend ---`);
    console.log(`✅ Server: http://localhost:${PORT}`);
    console.log(`✅ Database: MongoDB (Mongoose v${mongoose.version})`);
    console.log(`✅ Status: Running\n`);
  });
};

startServer();

// معالجة الأخطاء غير المتوقعة
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  process.exit(1);
});

mongoose.connection.on('connected', () => {
  console.log('✅ متصل بقاعدة البيانات:', mongoose.connection.db.databaseName);
});

