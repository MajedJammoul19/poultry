import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/use-auth';

/* ==================================
   Menu Configuration (Multiple Roles Ready)
================================== */

const MENU_ITEMS = [
  { name: 'اشتراك', icon: 'sign_up', path: '/', roles: [] },
  { name: 'تسجيل دخول', icon: 'sign_in', path: '/sign-in', roles: [] },

  { name: 'لوحة التحكم', icon: 'dashboard', path: '/dashbourd', roles: ['admin'] },

  { name: 'إدارة المستخدمين', icon: 'people', path: '/users', roles: ['admin'] },
  { name: 'إدارة الموظفين', icon: 'people', path: '/employee', roles: ['admin'] },
  { name: 'معلومات النظام', icon: 'settings', path: '/settings', roles: ['admin'] },
  { name: 'سجلات الأنشطة', icon: 'list_alt', path: '/activity-logs', roles: ['admin'] },

  { name: 'تقارير الإنتاج', icon: 'assessment', path: '/reports', roles: ['admin','employee'] },
  { name: 'تخطيط الموارد', icon: 'calendar_today', path: '/resource-planning', roles: ['admin','employee'] },
  { name: 'فرز و تعبئة ', icon: 'package', path: '/packing-operations', roles: ['employee'] },
  { name: ' تقارير الفرز ', icon: 'package', path: '/packing-reports', roles: ['employee'] },
  { name: 'الفحوصات البيطرية', icon: 'medical_services', path: '/health-checks', roles: ['vet'] },
  { name: 'خطط التغذية', icon: 'medical_services', path: '/feeding-plans', roles: ['vet'] },
  { name: 'تقارير الفحوصات البيطرية', icon: 'medical_services', path: '/health-reports', roles: ['vet','employee','admin'] },
  { name: 'خطط الوقاية', icon: 'health_and_safety', path: '/prevention-plans', roles: ['vet'] },
   { name: 'طلب أدوية ', icon: 'health_and_safety', path: '/medication-requests', roles: ['vet','admin'] },
  { name: 'تقارير خطط الوقاية', icon: 'health_and_safety', path: '/prevention-reports', roles: ['vet','employee','admin'] },

  { name: 'التغذية اليومية', icon: 'restaurant', path: '/daily-feeding', roles: ['food_supplier'] },
   { name: 'التغذية العامة', icon: 'restaurant', path: '/general-feeding', roles: ['food_supplier'] },
   { name: ' تقارير التغذية العامة', icon: 'restaurant', path: '/general-feeding-reports', roles: ['food_supplier'] },
  { name: ' سجلات الأنتاج', icon: 'daily-forms', path:'/productivity-reports', roles: ['admin'] },
  { name: 'بلاغات النظافة', icon: 'cleaning_services', path: '/hygiene-reports', roles: ['employee'] },
  { name: 'تقارير بلاغات النظافة', icon: 'cleaning_services', path: '/hygiene-docs', roles: ['employee','admin'] },
  { name: 'تسجيل البيانات اليومية', icon: 'daily-forms', path: '/daily-data', roles: ['employee','admin'] },
  { name: 'طلب وقود', icon: 'price_change', path: '/fuel', roles: ['fuel_supplier','admin'] },
  { name: 'طلب مواد غذائية', icon: 'price_change', path: '/food', roles: ['food_supplier','admin'] },
  { name: 'عروض أسعار', icon: 'price_change', path: '/pricing', roles: ['employee'] },
  { name: 'سجلات طلبات الوقود', icon: 'price_change', path: '/fuel-reports', roles: ['fuel_supplier','employee','admin'] },
  { name: ' استبيان استهلاك الوقود', icon: 'price_change', path: '/fuel-consumption', roles: ['fuel_supplier'] },
  { name: ' تقارير استهلاك الوقود', icon: 'price_change', path: '/fuel-consumption-reports', roles: ['fuel_supplier'] },
];

/* ==================================
   Access Helper
================================== */

const hasAccess = (allowedRoles, userRole) => {
  // إذا لم يتم تحديد أدوار → العنصر متاح للجميع
  if (!allowedRoles || allowedRoles.length === 0) return true;

  return allowedRoles.includes(userRole);
};

/* ==================================
   Component
================================== */

const Sidebar = () => {
  const { userRole } = useAuth();

  const filteredMenuItems = MENU_ITEMS.filter(({ roles }) =>
    hasAccess(roles, userRole)
  );

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white shadow-2xl flex flex-col">
      
      {/* Logo / Title */}
      <div className="p-6 border-b border-blue-700/40">
        <h2 className="text-2xl font-bold text-center tracking-wide">
          إدارة الدواجن
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 px-3">
        <ul className="space-y-2">
          {filteredMenuItems.map(({ name, path, icon }) => (
            <li key={name}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ease-in-out
                  ${
                    isActive
                      ? "bg-white/10 backdrop-blur-md shadow-lg scale-[1.02]"
                      : "hover:bg-white/5 hover:translate-x-1"
                  }`
                }
              >
                <span className="material-icons-outlined text-lg opacity-80 group-hover:opacity-100 transition">
                  {icon}
                </span>

                <span className="flex-1">{name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-blue-700/40 text-xs text-center text-blue-200">
        © 2026 Poultry System
      </div>
    </aside>
  );
};

export default Sidebar;