import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-800">نظام إدارة المنشأة الزراعية</h1>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-2 rounded-full bg-gray-100 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">م</div>
            <span className="text-gray-700">مسؤول النظام</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;