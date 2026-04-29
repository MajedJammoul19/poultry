// components/DashboardCards.jsx
import React, { useEffect } from 'react';
import { useDashboard } from '../context/DashboardContext';

const DashboardCards = () => {
  const { stats, loading, fetchDashboardData } = useDashboard();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  return (
    <div>
      {/* البطاقات - دائماً 4 كروت */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow p-6">
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
    </div>
  );
};

export default DashboardCards;