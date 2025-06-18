import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
     { name: 'اشتراك ', icon: 'sign_up', path: '/sign-up', role: 'supplier' },
    { name: ' تسجيل دخول ', icon: 'sign_in', path: '/sign-in', role: 'admin' },
    { name: 'لوحة التحكم', icon: 'dashboard', path: '/' },
    { name: 'إدارة المستخدمين', icon: 'people', path: '/users', role: 'admin' },
      { name: 'إدارة الموظفين', icon: 'people', path: '/employee', role: 'admin' },
    { name: 'معلومات النظام', icon: 'settings', path: '/settings', role: 'admin' },
    { name: 'سجلات الأنشطة', icon: 'list_alt', path: '/activity-logs', role: 'admin' },
    { name: 'تقارير الإنتاج', icon: 'assessment', path: '/reports', role: 'manager' },
    { name: 'تخطيط الموارد', icon: 'calendar_today', path: '/resource-planning', role: 'manager' },
    // { name: 'طلبات الشراء', icon: 'shopping_cart', path: '/purchase-orders', role: 'manager' },
    { name: 'الفحوصات البيطرية', icon: 'medical_services', path: '/health-checks', role: 'vet' },
    { name: 'خطط الوقاية', icon: 'health_and_safety', path: '/prevention-plans', role: 'vet' },
    { name: 'التغذية اليومية', icon: 'restaurant', path: '/daily-feeding', role: 'employee' },
    { name: 'بلاغات النظافة', icon: 'cleaning_services', path: '/hygiene-reports', role: 'employee' },
    // { name: 'تسجيل التوريد', icon: 'local_shipping', path: '/supply-records', role: 'supplier' },
    // { name: 'عروض الأسعار', icon: 'price_change', path: '/quotes', role: 'supplier' },
    { name: 'طلب وقود', icon: 'price_change', path: '/fuel', role: 'supplier' },
    { name: 'طلب مواد غذائية', icon: 'price_change', path: '/food', role: 'supplier' },
       
  ];

  return (
    <aside className="w-64 bg-blue-800 text-white flex-shrink-0">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-center">إدارة الدواجن</h2>
      </div>
      
      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="px-4 py-2">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg transition-colors ${isActive ? 'bg-blue-700' : 'hover:bg-blue-600'}`
                }
              >
                <span className="material-icons-outlined mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;