import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ActivityRecords = () => {
  // بيانات نموذجية
  const [timeRange, setTimeRange] = useState('week');
  
  const weightData = [
    { name: 'الأسبوع 1', وزن: 0.5, هدف: 0.6 },
    { name: 'الأسبوع 2', وزن: 1.2, هدف: 1.3 },
    { name: 'الأسبوع 3', وزن: 1.8, هدف: 1.9 },
    { name: 'الأسبوع 4', وزن: 2.4, هدف: 2.5 },
    { name: 'الأسبوع 5', وزن: 2.9, هدف: 3.0 },
  ];

  const eggProductionData = [
    { name: 'اليوم 1', إنتاج: 85, سعة: 100 },
    { name: 'اليوم 2', إنتاج: 82, سعة: 100 },
    { name: 'اليوم 3', إنتاج: 88, سعة: 100 },
    { name: 'اليوم 4', إنتاج: 90, سعة: 100 },
    { name: 'اليوم 5', إنتاج: 87, سعة: 100 },
  ];

  const lossData = [
    { name: 'اليوم 1', نافق: 2, ضعيف: 3 },
    { name: 'اليوم 2', نافق: 1, ضعيف: 2 },
    { name: 'اليوم 3', نافق: 0, ضعيف: 1 },
    { name: 'اليوم 4', نافق: 1, ضعيف: 1 },
    { name: 'اليوم 5', نافق: 2, ضعيف: 4 },
  ];

  // حساب المتوسطات والنسب
  const avgWeight = weightData.reduce((sum, item) => sum + item.وزن, 0) / weightData.length;
  const avgEggProduction = eggProductionData.reduce((sum, item) => sum + item.إنتاج, 0) / eggProductionData.length;
  const totalLoss = lossData.reduce((sum, item) => sum + item.نافق + item.ضعيف, 0);
  const lossPercentage = (totalLoss / (100 * lossData.length)) * 100;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-right">سجلات الأنشطة</h1>
      
      {/* فلترة البيانات */}
      <div className="flex justify-end mb-6">
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="day">يومي</option>
          <option value="week">أسبوعي</option>
          <option value="month">شهري</option>
        </select>
      </div>

      {/* بطاقات الإحصائيات السريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="متوسط الوزن الحالي" 
          value={`${avgWeight.toFixed(2)} كجم`} 
          icon="🐔" 
          trend="up" 
          trendValue="2.5%" 
          bgColor="bg-green-100"
        />
        <StatCard 
          title="معدل إنتاج البيض" 
          value={`${avgEggProduction.toFixed(0)}%`} 
          icon="🥚" 
          trend="down" 
          trendValue="1.2%" 
          bgColor="bg-blue-100"
        />
        <StatCard 
          title="نسبة الفاقد" 
          value={`${lossPercentage.toFixed(1)}%`} 
          icon="⚠️" 
          trend="up" 
          trendValue="0.5%" 
          bgColor="bg-yellow-100"
        />
        <StatCard 
          title="إجمالي الطيور" 
          value="1,250" 
          icon="🏭" 
          trend="stable" 
          bgColor="bg-purple-100"
        />
      </div>

      {/* رسوم بيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* وزن الطيور ومعدل النمو */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-right">وزن الطيور ومعدل النمو</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="وزن" stroke="#10B981" strokeWidth={2} name="الوزن الفعلي" />
                <Line type="monotone" dataKey="هدف" stroke="#3B82F6" strokeWidth={2} name="الوزن المستهدف" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-right text-sm text-gray-600">
            <p>آخر تحديث: {new Date().toLocaleDateString('ar-EG')}</p>
          </div>
        </div>

        {/* إنتاج البيض */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-right">إنتاج البيض</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eggProductionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="إنتاج" fill="#8884d8" name="الإنتاج الفعلي" />
                <Bar dataKey="سعة" fill="#82ca9d" name="السعة القصوى" opacity={0.3} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-right text-sm text-gray-600">
            <p>متوسط الإنتاج اليومي: {avgEggProduction.toFixed(1)}%</p>
          </div>
        </div>

        {/* نسبة الفاقد */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-right">نسبة الفاقد</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lossData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="نافق" stackId="a" fill="#EF4444" name="نافق" />
                <Bar dataKey="ضعيف" stackId="a" fill="#F59E0B" name="ضعيف" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-right text-sm text-gray-600">
            <p>إجمالي الفاقد: {totalLoss} طائر</p>
          </div>
        </div>

        {/* ملخص الأداء */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-right">ملخص الأداء</h2>
          <div className="space-y-4">
            <PerformanceMetric 
              title="كفاءة التحويل الغذائي" 
              value="1.8" 
              target="1.7" 
            //   status={1.8 > 1.7 ? 'over' : 'under'}
            />
            <PerformanceMetric 
              title="معدل النمو اليومي" 
              value="45 جم" 
              target="50 جم" 
            //   status={45 > 50 ? 'over' : 'under'}
            />
            <PerformanceMetric 
              title="نسبة التفقيس" 
              value="92%" 
              target="90%" 
              status="over"
            />
            <PerformanceMetric 
              title="تكلفة التغذية للطائر" 
              value="12.5 جنيه" 
              target="11.8 جنيه" 
            //   status={12.5 > 11.8 ? 'over' : 'under'}
            />
          </div>
          <div className="mt-6">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-200">
              إنشاء تقرير شهري
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// مكون بطاقة الإحصائيات
const StatCard = ({ title, value, icon, trend, trendValue, bgColor }) => {
  const trendColor = trend === 'up' ? 'text-red-500' : trend === 'down' ? 'text-green-500' : 'text-gray-500';
  const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';
  
  return (
    <div className={`${bgColor} p-6 rounded-lg shadow-sm`}>
      <div className="flex justify-between items-start">
        <div className="text-3xl">{icon}</div>
        <div className="text-right">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          <div className={`flex items-center mt-2 text-sm ${trendColor}`}>
            <span>{trendIcon} {trendValue}</span>
            <span className="ml-1">من آخر فترة</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// مكون مؤشر الأداء
const PerformanceMetric = ({ title, value, target, status }) => {
  const statusColor = status === 'over' ? 'text-green-600' : 'text-red-600';
  const statusText = status === 'over' ? 'أعلى من المستهدف' : 'أقل من المستهدف';
  
  return (
    <div className="border-b border-gray-100 pb-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <span className="font-semibold">{value}</span>
      </div>
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs text-gray-400">المستهدف: {target}</span>
        <span className={`text-xs ${statusColor}`}>{statusText}</span>
      </div>
    </div>
  );
};

export default ActivityRecords;