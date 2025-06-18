import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ResourcePlanning = () => {
  // حالة للتبويبات
  const [activeTab, setActiveTab] = useState('feed');
  
  // بيانات نموذجية
  const feedData = [
    { name: 'بداية', كمية: 1500, متبقي: 800 },
    { name: 'نامي', كمية: 2000, متبقي: 1200 },
    { name: 'ناهي', كمية: 1800, متبقي: 600 },
  ];

  const vaccineData = [
    { name: 'نيوكاسل', كمية: 100, مستخدم: 40 },
    { name: 'إنفلونزا', كمية: 80, مستخدم: 25 },
    { name: 'جدري', كمية: 60, مستخدم: 15 },
  ];

  const equipmentData = [
    { name: 'معالف', كمية: 50, معطوب: 2 },
    { name: 'مساقي', كمية: 50, معطوب: 3 },
    { name: 'دفايات', كمية: 10, معطوب: 0 },
  ];

  const workersData = [
    { name: 'عاملين دائمين', عدد: 8, متاح: 7 },
    { name: 'عاملين مؤقتين', عدد: 4, متاح: 4 },
    { name: 'أطباء بيطريين', عدد: 2, متاح: 1 },
  ];

  // حساب إجماليات الموارد
  const calculateTotals = (data) => {
    return data.reduce((acc, item) => {
      Object.keys(item).forEach(key => {
        if (key !== 'name') {
          acc[key] = (acc[key] || 0) + item[key];
        }
      });
      return acc;
    }, {});
  };

  const feedTotals = calculateTotals(feedData);
  const vaccineTotals = calculateTotals(vaccineData);
  const equipmentTotals = calculateTotals(equipmentData);
  const workersTotals = calculateTotals(workersData);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-right">تخطيط الموارد</h1>
      
      {/* تبويبات الموارد */}
      <div className="flex flex-wrap justify-end mb-6 border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium text-sm rounded-t-lg mr-2 ${activeTab === 'feed' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          onClick={() => setActiveTab('feed')}
        >
          الأعلاف
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm rounded-t-lg mr-2 ${activeTab === 'vaccine' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          onClick={() => setActiveTab('vaccine')}
        >
          اللقاحات والأدوية
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm rounded-t-lg mr-2 ${activeTab === 'equipment' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          onClick={() => setActiveTab('equipment')}
        >
          المعدات
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm rounded-t-lg ${activeTab === 'workers' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          onClick={() => setActiveTab('workers')}
        >
          العمالة
        </button>
      </div>

      {/* محتوى التبويبات */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {activeTab === 'feed' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">تخطيط الأعلاف</h2>
              <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-200">
                طلب علف جديد
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard title="إجمالي كمية العلف" value={`${feedTotals.كمية} كجم`} icon="🌾" />
              <StatCard title="الكمية المتبقية" value={`${feedTotals.متبقي} كجم`} icon="📦" />
              <StatCard title="معدل الاستهلاك اليومي" value="120 كجم/يوم" icon="📊" />
            </div>
            
            <div className="h-80 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={feedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="كمية" fill="#8884d8" name="الكمية الكلية" />
                  <Bar dataKey="متبقي" fill="#82ca9d" name="المتبقي" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <ResourceTable 
              data={feedData} 
              columns={[
                { header: 'نوع العلف', key: 'name' },
                { header: 'الكمية الكلية (كجم)', key: 'كمية' },
                { header: 'المتبقي (كجم)', key: 'متبقي' },
                { header: 'معدل الاستهلاك', key: 'rate', render: (item) => `${Math.round(((item.كمية - item.متبقي) / item.كمية) * 100)}%` },
              ]}
            />
          </div>
        )}

        {activeTab === 'vaccine' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">تخطيط اللقاحات والأدوية</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200">
                طلب لقاحات جديدة
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard title="إجمالي اللقاحات" value={vaccineTotals.كمية} icon="💉" />
              <StatCard title="المستخدم" value={vaccineTotals.مستخدم} icon="🩹" />
              <StatCard title="تاريخ الصلاحية القادم" value="15/10/2023" icon="📅" />
            </div>
            
            <div className="h-80 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vaccineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="كمية" fill="#3B82F6" name="الكمية الكلية" />
                  <Bar dataKey="مستخدم" fill="#EF4444" name="المستخدم" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <ResourceTable 
              data={vaccineData} 
              columns={[
                { header: 'نوع اللقاح', key: 'name' },
                { header: 'الكمية الكلية', key: 'كمية' },
                { header: 'المستخدم', key: 'مستخدم' },
                { header: 'المتبقي', key: 'remaining', render: (item) => item.كمية - item.مستخدم },
              ]}
            />
          </div>
        )}

        {activeTab === 'equipment' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">تخطيط المعدات</h2>
              <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-200">
                طلب معدات جديدة
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard title="إجمالي المعدات" value={equipmentTotals.كمية} icon="⚙️" />
              <StatCard title="المعدات المعطوبة" value={equipmentTotals.معطوب} icon="⚠️" />
              <StatCard title="نسبة الصلاحية" value={`${Math.round(((equipmentTotals.كمية - equipmentTotals.معطوب) / equipmentTotals.كمية) * 100)}%`} icon="🛠️" />
            </div>
            
            <div className="h-80 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={equipmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="كمية" fill="#8B5CF6" name="الكمية الكلية" />
                  <Bar dataKey="معطوب" fill="#F59E0B" name="المعطوب" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <ResourceTable 
              data={equipmentData} 
              columns={[
                { header: 'نوع المعدة', key: 'name' },
                { header: 'الكمية الكلية', key: 'كمية' },
                { header: 'المعطوب', key: 'معطوب' },
                { header: 'تاريخ الصيانة', key: 'maintenance', render: () => '15/09/2023' },
              ]}
            />
          </div>
        )}

        {activeTab === 'workers' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">تخطيط العمالة</h2>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md transition duration-200">
                تعيين عامل جديد
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard title="إجمالي العمالة" value={workersTotals.عدد} icon="👷" />
              <StatCard title="المتاح حالياً" value={workersTotals.متاح} icon="✅" />
              <StatCard title="نسبة التواجد" value={`${Math.round((workersTotals.متاح / workersTotals.عدد) * 100)}%`} icon="📊" />
            </div>
            
            <div className="h-80 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workersData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="عدد" fill="#F59E0B" name="العدد الكلي" />
                  <Bar dataKey="متاح" fill="#10B981" name="المتاح" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <ResourceTable 
              data={workersData} 
              columns={[
                { header: 'نوع العمالة', key: 'name' },
                { header: 'العدد الكلي', key: 'عدد' },
                { header: 'المتاح', key: 'متاح' },
                { header: 'نسبة التواجد', key: 'attendance', render: (item) => `${Math.round((item.متاح / item.عدد) * 100)}%` },
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// مكون بطاقة الإحصائيات
const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start">
        <div className="text-2xl">{icon}</div>
        <div className="text-right">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
};

// مكون جدول الموارد
const ResourceTable = ({ data, columns }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th 
                key={column.key}
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td 
                  key={column.key}
                  className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500"
                >
                  {column.render ? column.render(item) : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResourcePlanning;