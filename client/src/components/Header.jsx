import React, { useState, useEffect, useRef } from "react";
import { 
  Bell, Menu, Settings, HelpCircle, 
  Download, Upload, BarChart, AlertCircle, FileText, Database, Shield,
  Phone, Mail, X, HelpCircle as HelpIcon, ChevronRight, BookOpen, Video,
  SkipBack, SkipForward, Check, ArrowRight, Sun, Moon, LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import toast, { Toaster } from 'react-hot-toast';

const Header = ({ onMenuClick }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [showQuickGuideModal, setShowQuickGuideModal] = useState(false);
  const [openFAQItems, setOpenFAQItems] = useState([]);
  const [currentGuideStep, setCurrentGuideStep] = useState(0);
  const [weatherTemp, setWeatherTemp] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState('normal');
  
  const navigate = useNavigate();
  const { signOut } = useContext(AuthContext);
  
  // Refs للتعامل مع الأزرار والقوائم
  const weatherRef = useRef(null);
  const dropdownRefs = {
    help: useRef(null),
    settings: useRef(null),
    reports: useRef(null),
  };

  // تفعيل المظهر الداكن/الفاتح
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
    
    // إغلاق القوائم عند النقر خارجها
    const handleClickOutside = (event) => {
      let isClickInside = false;
      
      Object.values(dropdownRefs).forEach(ref => {
        if (ref.current && ref.current.contains(event.target)) {
          isClickInside = true;
        }
      });
      
      const buttonSelectors = [
        '.header-button',
        '.dropdown-button',
        'button[title*="مساعدة"]',
        'button[title*="إعدادات"]',
        'button[title*="تقرير"]',
        'button[title*="طقس"]'
      ];
      
      buttonSelectors.forEach(selector => {
        if (event.target.closest(selector)) {
          isClickInside = true;
        }
      });
      
      if (!isClickInside) {
        setActiveDropdown(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // وظائف التحكم بالقوائم المنسدلة
  const handleMouseEnter = (dropdownName) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown(dropdownName);
  };

  const handleMouseLeave = (dropdownName) => {
    const timeout = setTimeout(() => {
      const isMouseInDropdown = dropdownRefs[dropdownName]?.current?.contains(document.activeElement) ||
                                dropdownRefs[dropdownName]?.current?.matches(':hover');
      
      const isMouseInButton = document.querySelector(`button[title*="${dropdownName}"]`)?.matches(':hover') ||
                             document.querySelector(`.dropdown-button[data-dropdown="${dropdownName}"]`)?.matches(':hover');
      
      if (!isMouseInDropdown && !isMouseInButton && activeDropdown === dropdownName) {
        setActiveDropdown(null);
      }
    }, 500);
    setDropdownTimeout(timeout);
  };

  const handleDropdownClick = (dropdownName) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownName);
    }
  };

  // دالة التحقق من الطقس
  const checkWeather = async () => {
    try {
      toast.loading('جاري جلب بيانات الطقس...', { id: 'weather' });
      
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=24.71&longitude=46.67&current_weather=true`
      );

      const data = await response.json();
      const temp = data.current_weather.temperature;
      setWeatherTemp(temp);

      let condition = 'normal';
      let message = '';

      if (temp <= 0) {
        condition = 'cold';
        message = `⚠️ الطقس بارد جداً: ${temp}°C`;
        toast.error(message, { id: 'weather' });
      } else if (temp >= 40) {
        condition = 'hot';
        message = `🔥 الطقس حار جداً: ${temp}°C`;
        toast.error(message, { id: 'weather' });
      } else {
        condition = 'moderate';
        message = `🌤️ الطقس معتدل: ${temp}°C`;
        toast.success(message, { id: 'weather' });
      }
      
      setWeatherCondition(condition);
      
      // إظهار نافذة منبثقة مع تفاصيل الطقس
      toast((t) => (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {condition === 'cold' && '❄️'}
            {condition === 'hot' && '🔥'}
            {condition === 'moderate' && '🌤️'}
            <span className="font-bold">حالة الطقس الحالية</span>
          </div>
          <div className="text-sm">
            <div>درجة الحرارة: {temp}°C</div>
            <div>الرياح: {data.current_weather.windspeed} كم/س</div>
            <div>الاتجاه: {data.current_weather.winddirection}°</div>
          </div>
          {condition === 'hot' && (
            <div className="text-xs text-red-600 dark:text-red-400 mt-1">
              💡 نصائح: زيادة التهوية، توفير الماء البارد، تقليل الكثافة
            </div>
          )}
          {condition === 'cold' && (
            <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              💡 نصائح: تدفئة الحظائر، تقليل التهوية المباشرة، زيادة العلف
            </div>
          )}
        </div>
      ), {
        duration: 6000,
        icon: condition === 'hot' ? '🔥' : condition === 'cold' ? '❄️' : '🌤️',
      });

    } catch (err) {
      console.error('حدث خطأ في جلب الطقس:', err);
      toast.error('تعذر الحصول على بيانات الطقس', { id: 'weather' });
    }
  };

  // دالة لفتح إشعار الدعم
  const openSupportModal = () => {
    setActiveDropdown(null);
    setShowSupportModal(true);
  };

  const closeSupportModal = () => {
    setShowSupportModal(false);
  };

  const openFAQModal = () => {
    setActiveDropdown(null);
    setShowFAQModal(true);
  };

  const closeFAQModal = () => {
    setShowFAQModal(false);
  };

  const openQuickGuideModal = () => {
    setActiveDropdown(null);
    setShowQuickGuideModal(true);
    setCurrentGuideStep(0);
  };

  const closeQuickGuideModal = () => {
    setShowQuickGuideModal(false);
    setCurrentGuideStep(0);
  };

  const nextGuideStep = () => {
    if (currentGuideStep < quickGuideSteps.length - 1) {
      setCurrentGuideStep(prev => prev + 1);
    } else {
      closeQuickGuideModal();
    }
  };

  const prevGuideStep = () => {
    if (currentGuideStep > 0) {
      setCurrentGuideStep(prev => prev - 1);
    }
  };

  const goToGuideStep = (stepIndex) => {
    setCurrentGuideStep(stepIndex);
  };

  const toggleFAQItem = (index) => {
    setOpenFAQItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  // خطوات الدليل السريع
  const quickGuideSteps = [
    {
      title: "مرحباً بك في نظام إدارة المنشأة الزراعية",
      description: "هذا الدليل السريع سيساعدك على التعرف على الميزات الأساسية للنظام والبدء في استخدامه بكفاءة.",
      icon: "👋",
      features: [
        "إدارة شاملة لجميع عمليات المزرعة",
        "مراقبة صحة الطيور والإنتاج",
        "تتبع المخزون والموارد",
        "تقارير وتحليلات ذكية"
      ],
      duration: "2 دقائق"
    },
    {
      title: "لوحة التحكم الرئيسية",
      description: "من هنا يمكنك رؤية نظرة عامة على أداء المزرعة والمؤشرات المهمة.",
      icon: "📊",
      features: [
        "مؤشرات الأداء الرئيسية (KPI)",
        "إحصائيات الإنتاج اليومي",
        "حالة صحة القطيع",
        "تنبيهات النظام المهمة"
      ],
      action: "التالي",
      actionPath: "/dashbourd"
    },
    {
      title: "نظام مراقبة الطقس",
      description: "تابع حالة الطقس وتأثيرها على إنتاجية المزرعة.",
      icon: "🌤️",
      features: [
        "درجة الحرارة الحالية",
        "سرعة الرياح واتجاهها",
        "تنبيهات الطقس القاسي",
        "توصيات ذكية للمزارعين"
      ],
      action: "التالي",
      
      actionFunction: checkWeather
    },
    {
      title: "التقارير والتحليلات",
      description: "احصل على تقارير مفصلة وتحليلات ذكية لمساعدتك في اتخاذ القرارات.",
      icon: "📈",
      features: [
        "تقارير الإنتاج الشهرية",
        "تحليل التكاليف والأرباح",
        "مقارنات الأداء",
        "تنبؤات ذكية بالإنتاج"
      ],
      action: "التالي",
      
    },
    {
      title: "أنت جاهز للبدء! 🎉",
      description: "لقد تعرفت على الميزات الأساسية. يمكنك الآن البدء في استخدام النظام بكفاءة.",
      icon: "✅",
      features: [
        "ابدأ بتسجيل الإنتاج اليومي",
        "راجع التقارير الأسبوعية",
        "تابع حالة الطقس يومياً",
        "استخدم التنبيهات للمهام المهمة"
      ],
      tips: [
        "احفظ بياناتك بانتظام",
        "راجع التنبيهات يومياً",
        "استخدم البحث للعثور على ما تريد بسرعة",
        "لا تتردد في طلب المساعدة من الدعم"
      ]
    }
  ];

  // قائمة المساعدة السريعة
  const helpItems = [
    { title: "الدليل السريع", icon: BookOpen, action: () => openQuickGuideModal() },
    { title: "فيديو تعريفي", icon: Video, action: () => window.open("https://youtube.com", "_blank") },
    { title: "الأسئلة الشائعة", icon: HelpIcon, action: () => openFAQModal() },
    { title: "اتصل بالدعم", icon: Phone, action: () => openSupportModal() },
  ];

  // قائمة الإعدادات السريعة
  const quickSettings = [
    { title: "إعدادات التنبيهات", icon: "🔔", action: () => navigate("/system?tab=notifications") },
    { title: "خصوصية البيانات", icon: "🛡️", action: () => navigate("/system?tab=privacy") },
    { title: "نسخة احتياطية", icon: "💾", action: () => handleBackup() },
    { title: "معلومات النظام", icon: "ℹ️", action: () => navigate("/system?tab=info") },
  ];

  // تقارير سريعة
  const quickReports = [
    { title: "تقرير اليوم", icon: "📅", action: () => navigate("/reports/daily") },
    { title: "تقرير الأسبوع", icon: "📆", action: () => navigate("/reports/weekly") },
    { title: "تقرير الشهر", icon: "🗓️", action: () => navigate("/reports/monthly") },
    { title: "تقرير الإنتاج", icon: "📈", action: () => navigate("/production/report") },
  ];

  const handleBackup = () => {
    console.log("جاري إنشاء نسخة احتياطية...");
    setTimeout(() => {
      toast.success("✅ تم إنشاء النسخة الاحتياطية بنجاح!");
      setActiveDropdown(null);
    }, 1000);
  };

  const handleExportData = () => {
    console.log("جاري تصدير البيانات...");
    const data = {
      farmName: "مزرعة الدواجن الذكية",
      exportDate: new Date().toISOString(),
      version: "2.1.0",
      data: {
        birds: 5280,
        eggs: 4320,
        feed: 2.5,
        health: 98.5
      }
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `farm-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("📥 تم تصدير البيانات بنجاح!");
  };

  const handleImportData = () => {
    console.log("فتح محدد ملفات لاستيراد البيانات...");
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.csv';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            console.log("✅ تم استيراد البيانات:", data);
            toast.success("✅ تم استيراد البيانات بنجاح!");
          } catch (error) {
            toast.error("❌ خطأ في قراءة الملف. يرجى التأكد من صحة البيانات.");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleLogout = () => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-medium">هل أنت متأكد من تسجيل الخروج؟</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              signOut();
              navigate('/sign-in');
              toast.dismiss(t.id);
            }}
            className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
          >
            نعم، تسجيل الخروج
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            إلغاء
          </button>
        </div>
      </div>
    ), {
      duration: 8000,
      position: 'top-center',
    });
  };

  // مكون زر مع قائمة منسدلة
  const DropdownButton = ({ 
    name, 
    icon: Icon, 
    title, 
    children,
    buttonClass = ""
  }) => {
    const containerRef = useRef(null);
    const dropdownRef = useRef(null);
    
    useEffect(() => {
      dropdownRefs[name] = dropdownRef;
    }, [name]);

    return (
      <div 
        className="relative"
        ref={containerRef}
        onMouseEnter={() => handleMouseEnter(name)}
        onMouseLeave={() => handleMouseLeave(name)}
        data-dropdown={name}
      >
        <button
          className={`relative p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-300 hover-lift group dropdown-button ${buttonClass}`}
          title={title}
          onClick={() => handleDropdownClick(name)}
          data-dropdown={name}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div className="relative">
            <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
          </div>
        </button>
        
        <div 
          className={`absolute left-0 mt-2 w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-800/50 py-2 z-50 transition-all duration-300 transform origin-top-right ${
            activeDropdown === name 
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          }`}
          ref={dropdownRef}
          onMouseEnter={() => handleMouseEnter(name)}
          onMouseLeave={() => handleMouseLeave(name)}
          data-dropdown={name}
          style={{
            marginTop: '8px',
            pointerEvents: activeDropdown === name ? 'auto' : 'none'
          }}
        >
          {children}
        </div>
      </div>
    );
  };

  // دالة لتحديد لون أيقونة الطقس
  const getWeatherIconColor = () => {
    switch(weatherCondition) {
      case 'cold': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'hot': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      case 'moderate': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <>
      <Toaster 
        position="top-left" 
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: darkMode ? '#1f2937' : '#fff',
            color: darkMode ? '#fff' : '#374151',
            border: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
          },
          success: {
            icon: '✅',
            style: {
              border: '1px solid #10b981',
            },
          },
          error: {
            icon: '❌',
            style: {
              border: '1px solid #ef4444',
            },
          },
        }}
      />
      
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg">
        <div className="px-4 sm:px-6 py-2 sm:py-3">
          {/* ✅ التعديل الأساسي: استخدام Grid لتوزيع المساحات بشكل متساوي */}
          <div className="grid grid-cols-3 items-center w-full">
            
            {/* القسم الأول: زر القائمة الجانبية (يظهر فقط في الموبايل) */}
            <div className="flex items-center justify-start">
              <button 
                onClick={onMenuClick}
                className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-300 lg:hidden hover-lift header-button"
                aria-label="القائمة الجانبية"
              >
                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
            
            
            
            {/* القسم الثالث: جميع الأزرار في أقصى اليمين */}
            <div className="flex items-center justify-end space-x-1 rtl:space-x-reverse">
              
              {/* زر الطقس */}
              <div className="relative group">
                <button
                  ref={weatherRef}
                  onClick={checkWeather}
                  className={`relative p-2.5 rounded-xl transition-all duration-300 hover-lift group header-button ${getWeatherIconColor()}`}
                  title="حالة الطقس"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                  {weatherTemp && (
                    <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-white dark:bg-gray-800 text-xs font-bold rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
                      {weatherTemp}°
                    </span>
                  )}
                </button>
                
                {/* النقطة الحمراء للتنبيه - تظهر إذا كان الطقس شديد */}
                {(weatherCondition === 'hot' || weatherCondition === 'cold') && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900 animate-pulse"></span>
                )}
              </div>
              
              {/* زر التقارير السريعة */}
              <DropdownButton
                name="reports"
                icon={BarChart}
                title="التقارير السريعة"
                buttonClass="hover:text-blue-500"
              >
                <div className="px-4 py-3 border-b border-gray-100/50 dark:border-gray-800/50">
                  <h3 className="font-semibold text-gray-900 dark:text-white">التقارير السريعة</h3>
                </div>
                <div className="py-1">
                  {quickReports.map((report, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        report.action();
                        setActiveDropdown(null);
                      }}
                      className="block w-full text-right px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors flex items-center justify-end gap-2"
                    >
                      <span className="text-lg">{report.icon}</span>
                      {report.title}
                    </button>
                  ))}
                </div>
              </DropdownButton>
              
              {/* زر التصدير */}
              <button
                onClick={handleExportData}
                className="relative p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-300 hover-lift group header-button"
                title="تصدير البيانات"
                onMouseEnter={() => setActiveDropdown(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <Download className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-green-500 dark:group-hover:text-green-400" />
              </button>
              
              {/* زر الاستيراد */}
              <button
                onClick={handleImportData}
                className="relative p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-300 hover-lift group header-button"
                title="استيراد البيانات"
                onMouseEnter={() => setActiveDropdown(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <Upload className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
              </button>
              
              {/* زر المساعدة */}
              <DropdownButton
                name="help"
                icon={HelpCircle}
                title="المساعدة والدعم"
                buttonClass="group-hover:text-purple-500"
              >
                <div className="px-4 py-3 border-b border-gray-100/50 dark:border-gray-800/50">
                  <h3 className="font-semibold text-gray-900 dark:text-white">المساعدة والدعم</h3>
                </div>
                <div className="py-1">
                  {helpItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        item.action();
                        setActiveDropdown(null);
                      }}
                      className="flex w-full text-right px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors flex items-center justify-end gap-2"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.title}
                    </button>
                  ))}
                </div>
              </DropdownButton>
              
              {/* زر الإعدادات */}
              <DropdownButton
                name="settings"
                icon={Settings}
                title="الإعدادات السريعة"
                buttonClass="group-hover:text-green-500"
              >
                <div className="px-4 py-3 border-b border-gray-100/50 dark:border-gray-800/50">
                  <h3 className="font-semibold text-gray-900 dark:text-white">الإعدادات السريعة</h3>
                </div>
                <div className="py-1">
                  {quickSettings.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        item.action();
                        setActiveDropdown(null);
                      }}
                      className="block w-full text-right px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors flex items-center justify-end gap-2"
                    >
                      <span className="text-lg">{item.icon}</span>
                      {item.title}
                    </button>
                  ))}
                </div>
              </DropdownButton>
              
              {/* زر تسجيل الخروج */}
             
      <button
        onClick={handleLogout}
        className="px-4 sm:px-5 py-2 sm:py-2.5 
                   bg-red-500 text-white text-xs sm:text-sm font-semibold 
                   rounded-xl shadow-md 
                   hover:bg-red-600 hover:shadow-lg 
                   active:scale-95 
                   transition-all duration-300 
                   flex items-center gap-1 sm:gap-2"
      >
        <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">تسجيل الخروج</span>
      </button>
              
            </div>
          </div>
          
          {/* حالة النظام للشاشات الصغيرة - تظهر أسفل الهيدر في الموبايل */}
          <div className="flex items-center justify-between mt-2 md:hidden">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-800 dark:text-green-300 rounded-full text-xs sm:text-sm font-semibold border border-green-200 dark:border-green-800/30">
                🟢 نظام نشط
              </div>
              {weatherTemp && (
                <div className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold border ${
                  weatherCondition === 'hot' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800/30' :
                  weatherCondition === 'cold' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800/30' :
                  'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800/30'
                }`}>
                  {weatherCondition === 'hot' && '🔥'}
                  {weatherCondition === 'cold' && '❄️'}
                  {weatherCondition === 'moderate' && '🌤️'}
                  {weatherTemp}°C
                </div>
              )}
            </div>
            
            {/* عرض اسم المستخدم أو أي معلومات إضافية يمكن إضافتها هنا */}
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <span className="font-medium">الدورة:</span> #24-08
            </div>
          </div>
        </div>
      </header>

      {/* الدليل السريع - باقي الكود كما هو دون تغيير */}
      {showQuickGuideModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          {/* ... محتوى الدليل السريع كما هو ... */}
          <div className="relative w-full max-w-md animate-fadeIn">
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              {/* رأس الدليل */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      الدليل السريع للنظام
                    </h3>
                    <p className="text-purple-100 text-sm mt-1">تعرف على النظام خطوة بخطوة</p>
                  </div>
                  <button
                    onClick={closeQuickGuideModal}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors flex items-center justify-center"
                    title="إغلاق الدليل"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* شريط التقدم */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-purple-200 mb-1.5">
                    <span>الخطوة {currentGuideStep + 1} من {quickGuideSteps.length}</span>
                    <span>{quickGuideSteps[currentGuideStep].duration || 'سريع'}</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-2">
                    <div 
                      className="bg-white h-full rounded-full transition-all duration-300"
                      style={{ width: `${((currentGuideStep + 1) / quickGuideSteps.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* محتوى الدليل */}
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center text-2xl">
                    {quickGuideSteps[currentGuideStep].icon}
                  </div>
                </div>
                
                <h4 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-2">
                  {quickGuideSteps[currentGuideStep].title}
                </h4>
                
                <p className="text-gray-600 dark:text-gray-400 text-center text-sm mb-4">
                  {quickGuideSteps[currentGuideStep].description}
                </p>
                
                {/* الميزات */}
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    الميزات الرئيسية
                  </h5>
                  <div className="space-y-1.5">
                    {quickGuideSteps[currentGuideStep].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* نصائح إضافية للخطوة الأخيرة */}
                {currentGuideStep === quickGuideSteps.length - 1 && quickGuideSteps[currentGuideStep].tips && (
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2 text-sm">
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                      نصائح مهمة للبدء
                    </h5>
                    <div className="space-y-1.5">
                      {quickGuideSteps[currentGuideStep].tips.map((tip, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0"></div>
                          <span className="text-amber-800 dark:text-amber-300 text-sm">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* أزرار التنقل بين الخطوات */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex justify-between items-center mb-3">
                  <button
                    onClick={prevGuideStep}
                    disabled={currentGuideStep === 0}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${
                      currentGuideStep === 0
                        ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <SkipBack className="w-3.5 h-3.5" />
                    السابق
                  </button>
                  
                  {/* نقاط التنقل */}
                  <div className="flex items-center gap-1.5">
                    {quickGuideSteps.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToGuideStep(index)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          currentGuideStep === index
                            ? 'bg-purple-500 w-4'
                            : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                        }`}
                        title={`الخطوة ${index + 1}`}
                      ></button>
                    ))}
                  </div>
                  
                  {/* زر الإجراء أو التالي */}
                  {quickGuideSteps[currentGuideStep].action ? (
                    <button
                      onClick={() => {
                        if (quickGuideSteps[currentGuideStep].actionFunction) {
                          quickGuideSteps[currentGuideStep].actionFunction();
                        }
                        if (quickGuideSteps[currentGuideStep].actionPath && quickGuideSteps[currentGuideStep].actionPath !== '#') {
                          navigate(quickGuideSteps[currentGuideStep].actionPath);
                        }
                        nextGuideStep();
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg hover:opacity-90 transition-opacity"
                    >
                      {quickGuideSteps[currentGuideStep].action}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={nextGuideStep}
                      className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg hover:opacity-90 transition-opacity"
                    >
                      {currentGuideStep === quickGuideSteps.length - 1 ? 'إنهاء' : 'التالي'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                
                {/* زر التخطي والإغلاق */}
                <div className="flex gap-2">
                  <button
                    onClick={closeQuickGuideModal}
                    className="flex-1 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-300 text-sm rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    {currentGuideStep === quickGuideSteps.length - 1 ? 'إغلاق الدليل' : 'تخطي الدليل'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* إشعار معلومات الدعم */}
      {showSupportModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md mx-4 animate-fadeIn">
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              {/* رأس الإشعار */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Phone className="w-6 h-6" />
                      اتصل بالدعم الفني
                    </h3>
                    <p className="text-blue-100 mt-1">نحن هنا لمساعدتك على مدار الساعة</p>
                  </div>
                  <button
                    onClick={closeSupportModal}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* محتوى الإشعار */}
              <div className="p-6">
                {/* معلومات مجد جمول */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      م
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">مجد جمول</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">مطور النظام والدعم الفني</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
                         onClick={() => window.open('tel:+963996164249')}>
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                        <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">رقم الجوال</p>
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400 direction-ltr text-right">+963 996 164 249</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* معلومات علاء كرمة */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      ع
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">علاء كرمة</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">مطور النظام والدعم الفني</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
                         onClick={() => window.open('tel:+963997923937')}>
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors">
                        <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">رقم الجوال</p>
                        <p className="text-lg font-bold text-green-600 dark:text-green-400 direction-ltr text-right">+963 997 923 937</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
                         onClick={() => window.open('mailto:alaakarma2003264@gmail.com')}>
                      <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center group-hover:bg-amber-200 dark:group-hover:bg-amber-800/50 transition-colors">
                        <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">البريد الإلكتروني</p>
                        <p className="text-sm font-medium text-amber-600 dark:text-amber-400 break-all">alaakarma2003264@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* نص توجيهي */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800/30">
                  <p className="text-sm text-blue-800 dark:text-blue-300 text-center">
                    يمكنك النقر على أي رقم أو بريد إلكتروني للاتصال مباشرة
                  </p>
                </div>
              </div>
              
              {/* زر الإغلاق */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={closeSupportModal}
                  className="w-full py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-300 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  فهمت، شكراً لك
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* إشعار الأسئلة الشائعة */}
      {showFAQModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl mx-4 animate-fadeIn">
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden max-h-[80vh] overflow-y-auto">
              {/* رأس الإشعار */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white sticky top-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <HelpIcon className="w-6 h-6" />
                      الأسئلة الشائعة (FAQ)
                    </h3>
                    <p className="text-purple-100 mt-1">إجابات على أكثر الأسئلة شيوعاً حول النظام</p>
                  </div>
                  <button
                    onClick={closeFAQModal}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* محتوى الأسئلة الشائعة */}
              <div className="p-6">
                {/* فئة: استخدام النظام */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-500" />
                    استخدام النظام
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                      <button
                        onClick={() => toggleFAQItem(0)}
                        className="w-full flex justify-between items-center p-4 text-right"
                      >
                        <span className="font-medium text-gray-900 dark:text-white">كيف يمكنني إضافة مستخدم جديد للنظام؟</span>
                        <ChevronRight className={`w-5 h-5 text-purple-500 transition-transform ${openFAQItems.includes(0) ? 'rotate-90' : ''}`} />
                      </button>
                      {openFAQItems.includes(0) && (
                        <div className="px-4 pb-4">
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            انتقل إلى صفحة "المستخدمين" من القائمة الجانبية، ثم انقر على زر "إضافة مستخدم جديد". 
                            قم بملء المعلومات المطلوبة (الاسم، البريد الإلكتروني، الصلاحية) ثم احفظ التغييرات.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                      <button
                        onClick={() => toggleFAQItem(1)}
                        className="w-full flex justify-between items-center p-4 text-right"
                      >
                        <span className="font-medium text-gray-900 dark:text-white">كيف يمكنني إنشاء تقرير إنتاج؟</span>
                        <ChevronRight className={`w-5 h-5 text-purple-500 transition-transform ${openFAQItems.includes(1) ? 'rotate-90' : ''}`} />
                      </button>
                      {openFAQItems.includes(1) && (
                        <div className="px-4 pb-4">
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            انتقل إلى صفحة "الإنتاج" ثم اختر الفترة الزمنية المطلوبة (يومي، أسبوعي، شهري). 
                            يمكنك تصدير التقرير بصيغة PDF أو Excel من خلال الأزرار الموجودة أعلى التقرير.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* فئة: المشاكل التقنية */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-500" />
                    المشاكل التقنية
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                      <button
                        onClick={() => toggleFAQItem(2)}
                        className="w-full flex justify-between items-center p-4 text-right"
                      >
                        <span className="font-medium text-gray-900 dark:text-white">ما العمل إذا نسيت كلمة المرور؟</span>
                        <ChevronRight className={`w-5 h-5 text-blue-500 transition-transform ${openFAQItems.includes(2) ? 'rotate-90' : ''}`} />
                      </button>
                      {openFAQItems.includes(2) && (
                        <div className="px-4 pb-4">
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            انقر على "نسيت كلمة المرور" في صفحة تسجيل الدخول. أدخل بريدك الإلكتروني المسجل وسيتم إرسال رابط إعادة تعيين كلمة المرور إليك.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                      <button
                        onClick={() => toggleFAQItem(3)}
                        className="w-full flex justify-between items-center p-4 text-right"
                      >
                        <span className="font-medium text-gray-900 dark:text-white">لماذا لا تظهر البيانات بشكل صحيح؟</span>
                        <ChevronRight className={`w-5 h-5 text-blue-500 transition-transform ${openFAQItems.includes(3) ? 'rotate-90' : ''}`} />
                      </button>
                      {openFAQItems.includes(3) && (
                        <div className="px-4 pb-4">
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            1. تأكد من اتصال الإنترنت.<br/>
                            2. جرب تحديث الصفحة (F5).<br/>
                            3. تحقق من صلاحيات المستخدم.<br/>
                            4. إذا استمرت المشكلة، اتصل بالدعم الفني.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* فئة: الإدارة والصلاحيات */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    الإدارة والصلاحيات
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 transition-colors">
                      <button
                        onClick={() => toggleFAQItem(4)}
                        className="w-full flex justify-between items-center p-4 text-right"
                      >
                        <span className="font-medium text-gray-900 dark:text-white">كيف أحدد صلاحيات المستخدمين؟</span>
                        <ChevronRight className={`w-5 h-5 text-green-500 transition-transform ${openFAQItems.includes(4) ? 'rotate-90' : ''}`} />
                      </button>
                      {openFAQItems.includes(4) && (
                        <div className="px-4 pb-4">
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            يمكن لمدير النظام فقط تحديد الصلاحيات. انتقل إلى صفحة "المستخدمين"، اختر المستخدم ثم انقر على "تعديل الصلاحيات". 
                            اختر الأدوار المناسبة (مدير، طبيب بيطري، موظف، إلخ).
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 transition-colors">
                      <button
                        onClick={() => toggleFAQItem(5)}
                        className="w-full flex justify-between items-center p-4 text-right"
                      >
                        <span className="font-medium text-gray-900 dark:text-white">كيف يمكنني نسخ البيانات احتياطياً؟</span>
                        <ChevronRight className={`w-5 h-5 text-green-500 transition-transform ${openFAQItems.includes(5) ? 'rotate-90' : ''}`} />
                      </button>
                      {openFAQItems.includes(5) && (
                        <div className="px-4 pb-4">
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            انتقل إلى "الإعدادات" → "النسخ الاحتياطي". يمكنك اختيار نسخ كافة البيانات أو بيانات محددة. 
                            يوصى بعمل نسخة احتياطية أسبوعياً للحفاظ على أمان البيانات.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* نص توجيهي */}
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800/30">
                  <p className="text-sm text-purple-800 dark:text-purple-300 text-center">
                    لم تجد إجابتك؟ يمكنك دائماً <button onClick={openSupportModal} className="font-bold underline hover:opacity-80">الاتصال بالدعم الفني</button>
                  </p>
                </div>
              </div>
              
              {/* زر الإغلاق */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={closeFAQModal}
                  className="w-full py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-300 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  فهمت، شكراً لك
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;