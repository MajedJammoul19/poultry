import axios from 'axios';

// إنشاء نسخة مخصصة من axios
const api = axios.create({
  baseURL: '/api', // سيتم توجيهه عبر proxy إلى http://localhost:5000
  timeout: 10000,
});

export const signup = async (userData) => {
  console.log('Sending data:', userData); 
  try {
    const response = await api.post('/auth/signup', userData, {
      headers: {
        'Content-Type': 'application/json', // ⚠️ مؤكد عليه
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      error.response?.data?.error || 
      'فشل في إنشاء الحساب. الرجاء المحاولة لاحقاً'
    );
  }
};
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    
    if (response.data.user && response.data.user.role) {
      return {
        user: {
          id: response.data.user.id,
          email: response.data.user.email,
          role: response.data.user.role
        }
      };
    }
    throw new Error('بيانات المستخدم غير مكتملة');
  } catch (error) {
    throw new Error(error.response?.data?.message || 'فشل تسجيل الدخول');
  }
};

export const createOrder = async (orderData) => {
  console.log('Sending order data:', orderData);
  try {
    const response = await api.post('/orders', orderData, {
      headers: {
        'Content-Type': 'application/json',
        
      },
    });
    
    return response.data;
    
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      error.response?.data?.error || 
      'فشل في إنشاء الطلب. الرجاء المحاولة لاحقاً'
    );
  }
};

export const getOrders = async (params = {}) => {
  console.log('Fetching orders with params:', params);
  try {
    const response = await api.get('/orders', {
      params, // يمكن استخدامها للتصفية والترتيب
      headers: {
        
        'Content-Type': 'application/json',
        // يمكن إضافة أي هيدرات مطلوبة هنا
      },
    });
    
    return response.data;
    
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      error.response?.data?.error || 
      'فشل في جلب البيانات. الرجاء المحاولة لاحقاً'
    );
  }
};
export const createFuelOrder = async (orderData) => {
  console.log('Sending order data:', orderData);
  try {
    const response = await api.post('/fuel-orders', orderData, {
      headers: {
        'Content-Type': 'application/json',
        
      },
    });
    
    return response.data;
    
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      error.response?.data?.error || 
      'فشل في إنشاء الطلب. الرجاء المحاولة لاحقاً'
    );
  }
};

export const createSanitationReport = async (reportData) => {
  console.log('Sending sanitation report data:', reportData);
  
  try {
    const response = await api.post('/sanitation-reports', reportData, {
      headers: {
        'Content-Type': 'application/json',
        
      },
    });
    
    return response.data;
    
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      error.response?.data?.error || 
      'فشل في إرسال بلاغ النظافة. الرجاء المحاولة لاحقاً'
    );
  }
};



export const createPreventionPlan = async (reportData) => {
  console.log('Sending prevention plan report data:', reportData);
  
  try {
    const response = await api.post('/prevention-plans', reportData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
    
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      error.response?.data?.error || 
      'فشل في إرسال بلاغ النظافة. الرجاء المحاولة لاحقاً'
    );
  }
}; 

export const createExamination = async (reportData) => {
  console.log('Sending examinations plan report data:', reportData);
  
  try {
    const response = await api.post('/medical-examinations', reportData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
    
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      error.response?.data?.error || 
      'فشل في إرسال بلاغ النظافة. الرجاء المحاولة لاحقاً'
    );
  }
};

