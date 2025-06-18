import React from 'react';

const DashboardCards = () => {
  const stats = [
    { title: 'إجمالي الدواجن', value: '12,345', change: '+5%', icon: 'pets', color: 'bg-blue-100 text-blue-800' },
    { title: 'الإنتاج اليومي', value: '1,234 كغ', change: '+2%', icon: 'show_chart', color: 'bg-green-100 text-green-800' },
    { title: 'المواد الغذائية', value: '85%', change: '-3%', icon: 'local_dining', color: 'bg-yellow-100 text-yellow-800' },
    { title: 'الوقود المتاح', value: '72%', change: '+1%', icon: 'local_gas_station', color: 'bg-red-100 text-red-800' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="mt-1 text-3xl font-semibold">{stat.value}</p>
              <p className={`mt-1 text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} عن الأسبوع الماضي
              </p>
            </div>
            <div className={`p-3 rounded-full ${stat.color}`}>
              <span className="material-icons-outlined">{stat.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;