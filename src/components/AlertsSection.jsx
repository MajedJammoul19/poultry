import React from 'react';

const AlertsSection = () => {
  const alerts = [
    { id: 1, title: 'نفاد المواد الغذائية', message: 'سيتم نفاد العلف خلال 3 أيام', severity: 'high', icon: 'warning' },
    { id: 2, title: 'فحوصات متأخرة', message: 'هناك 2 فحص بيطري متأخر', severity: 'medium', icon: 'schedule' },
    { id: 3, title: 'طلب تسليم', message: 'يوجد طلب تسليم وقود جديد', severity: 'low', icon: 'local_shipping' },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">التنبيهات المهمة</h2>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className={`p-4 rounded-lg ${getSeverityColor(alert.severity)}`}>
            <div className="flex items-start">
              <span className="material-icons-outlined mr-3">{alert.icon}</span>
              <div>
                <h3 className="font-medium">{alert.title}</h3>
                <p className="text-sm">{alert.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsSection;