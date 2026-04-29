import { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
const PoultryFarmSignUp = () => {
const navigate = useNavigate();

  const [formData, setFormData] = useState({
     name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'employee'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  const roles = [
    { value: 'admin', label: 'مسؤول (أدمن)' },
    { value: 'employee', label: 'موظف' },
    { value: 'vet', label: 'طبيب بيطري' },
    { value: 'food_supplier', label: 'تاجر مواد غذائية' },
    { value: 'fuel_supplier', label: 'تاجر وقود التدفئة' }
  ];
  
   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'الاسم مطلوب';
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'بريد إلكتروني غير صالح';
    }
    if (!formData.password) newErrors.password = 'كلمة المرور مطلوبة';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمات المرور غير متطابقة';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors('');
  if (validateForm()) {
    setIsSubmitting(true);
    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      
      // حفظ الموظف في localStorage
      const newEmployee = {
        id: Date.now(), // استخدام الطوابع الزمنية كمعرف فريد
        name: formData.name,
        position: formData.role === 'employee' ? 'موظف' : 
                formData.role === 'admin' ? 'مسؤول' :
                formData.role === 'vet' ? 'طبيب بيطري' :
                formData.role === 'food_supplier' ? 'تاجر مواد غذائية' :
                'تاجر وقود التدفئة'
      };
      
      // الحصول على الموظفين الحاليين من localStorage
      const existingEmployees = JSON.parse(localStorage.getItem('employees')) || [];
      // إضافة الموظف الجديد
      localStorage.setItem('employees', JSON.stringify([...existingEmployees, newEmployee]));
      
      navigate('/sign-in');
    } 
    catch (error) {
      setErrors({
        form: error.message || 'فشل تسجيل الدخول. الرجاء المحاولة مرة أخرى.'
      });
    }
    finally {
      setIsSubmitting(false);
    }
  }
};


   return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">تسجيل حساب جديد</h2>
            <p className="mt-2 text-sm text-gray-600">للمنشأة الزراعية لتربية الدواجن</p>
          </div>
          
          {errors.form && (
            <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* الاسم الكامل */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                الاسم الكامل
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            
            {/* البريد الإلكتروني */}
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
            
            {/* كلمة المرور */}
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
            
            {/* تأكيد كلمة المرور */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                تأكيد كلمة المرور
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>
            
            {/* نوع المستخدم */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                نوع المستخدم
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {roles.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'جاري التسجيل...' : 'تسجيل الحساب'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              لديك حساب بالفعل؟{' '}
              <Link to="/sign-in" className="font-medium text-blue-600 hover:text-blue-500">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoultryFarmSignUp;