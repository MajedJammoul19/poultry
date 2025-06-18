import React from 'react';

const RecentActivity = () => {
  const activities = [
    { id: 1, user: 'محمد أحمد', action: 'سجل تغذية الدواجن', time: 'منذ 10 دقائق', icon: 'restaurant' },
    { id: 2, user: 'أحمد علي', action: 'أضاف فحصًا بيطريًا', time: 'منذ 25 دقيقة', icon: 'medical_services' },
    { id: 3, user: 'سالم محمد', action: 'أرسل طلب شراء', time: 'منذ ساعة', icon: 'shopping_cart' },
    { id: 4, user: 'فاطمة عبدالله', action: 'سجل حالة نظافة', time: 'منذ ساعتين', icon: 'cleaning_services' },
    { id: 5, user: 'خالد سعيد', action: 'تسليم وقود جديد', time: 'منذ 3 ساعات', icon: 'local_gas_station' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 h-full">
      <h2 className="text-lg font-semibold mb-4">آخر الأنشطة</h2>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <span className="material-icons-outlined text-blue-600">{activity.icon}</span>
            </div>
            <div className="flex-1">
              <p className="font-medium">{activity.user}</p>
              <p className="text-sm text-gray-600">{activity.action}</p>
            </div>
            <span className="text-sm text-gray-500">{activity.time}</span>
          </li>
        ))}
      </ul>
      <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
        عرض جميع الأنشطة →
      </button>
    </div>
  );
};

export default RecentActivity;