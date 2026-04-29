import { useState, useContext } from 'react';
import { Link ,  useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import {AuthContext} from '../context/auth-context'

const PoultryFarmSignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');

 const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'بريد إلكتروني غير صالح';
    }
    
    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoginError('');
  
  console.log('🚀 1. بدأ تسجيل الدخول:', formData.email);
  
  if (validateForm()) {
    console.log('✅ 2. التحقق من صحة البيانات نجح');
    setIsSubmitting(true);
    
    try {
      console.log('⏳ 3. جاري استدعاء API...');
      
      const { user } = await login(formData.email, formData.password);
      
      console.log('🎉 4. تم الاستجابة من API');
      console.log('📦 5. البيانات المرتجعة:', user);
      console.log('🔑 6. الدور:', user?.role);
      
      // ✅ تأكد أن signIn موجود
      console.log('🔍 7. هل signIn موجود؟', typeof signIn);
      
      // جرب تخزين البيانات مع try/catch
      try {
        signIn(user);
        console.log('💾 8. تم تخزين البيانات بنجاح');
      } catch (contextError) {
        console.log('❌ خطأ في التخزين:', contextError);
      }
      
      // تأخير بسيط
    setTimeout(() => {
  console.log('🔄 9. جاري التوجيه...');
  
  // 👇 هذا مهم جداً
  console.log('🔍 قيمة role الفعلية:', user.role);
  console.log('🔍 نوع role:', typeof user.role);
  
  let targetPath = '/'; // القيمة الافتراضية
  
  // استخدم if/else مع طباعة كل حالة
  if (user.role === 'admin') {
    console.log('✅ شرط admin تحقق');
    targetPath = '/dashbourd';
  } else if (user.role === 'employee') {
    console.log('✅ شرط employee تحقق');
    targetPath = '/reports';
  } else if (user.role === 'vet') {
    console.log('✅ شرط vet تحقق');
    targetPath = '/health-checks';
  } else if (user.role === 'fuel_supplier') {
    console.log('✅ شرط fuelsupplier تحقق');
    targetPath = '/fuel';
  } else if (user.role === 'food_supplier') {
    
    targetPath = '/food';
  } else {
    console.log('❌ لا شرط تحقق، القيمة هي:', user.role);
  }
  
  console.log('🎯 المسار المستهدف:', targetPath);
  navigate(targetPath);
  
}, 500);
      
    } catch (error) {
      console.log('❌ خطأ في API:', error);
      setLoginError(error.message || 'فشل تسجيل الدخول');
    } finally {
      setIsSubmitting(false);
    }
  } else {
    console.log('❌ فشل التحقق من صحة البيانات');
  }
};

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">تسجيل الدخول</h2>
            <p className="mt-2 text-sm text-gray-600">إلى نظام إدارة المنشأة الزراعية لتربية الدواجن</p>
          </div>
          
          {loginError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {loginError}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* حقل البريد الإلكتروني */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            
            {/* حقل كلمة المرور */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                كلمة المرور
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
            
            {/* تذكرني ونسيت كلمة المرور */}
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  نسيت كلمة المرور؟
                </Link>
              </div>
            </div>
            
            {/* زر تسجيل الدخول */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ليس لديك حساب؟{' '}
              <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">
                إنشاء حساب جديد
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoultryFarmSignIn;