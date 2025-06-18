import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="px-6 flex justify-between items-center">
        <p className="text-sm text-gray-600">© 2023 نظام إدارة المنشأة الزراعية. جميع الحقوق محفوظة.</p>
        <div className="flex space-x-4">
          <a href="#" className="text-sm text-gray-600 hover:text-blue-600">الشروط والأحكام</a>
          <a href="#" className="text-sm text-gray-600 hover:text-blue-600">سياسة الخصوصية</a>
          <a href="#" className="text-sm text-gray-600 hover:text-blue-600">الدعم الفني</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;