import React, { useState } from 'react';

const MedicalCheckForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    veterinarianName: '',
    farmLocation: '',
    chickenCount: '',
    healthStatus: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 const handleSubmit = () => {
    alert('تم تقديم الفحص بنجاح!');
    window.location.reload();
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">نموذج تسجيل الفحوصات الطبية</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">تاريخ الفحص:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">اسم الطبيب البيطري:</label>
          <input
            type="text"
            name="veterinarianName"
            value={formData.veterinarianName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">موقع المزرعة:</label>
          <input
            type="text"
            name="farmLocation"
            value={formData.farmLocation}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">عدد الدجاج:</label>
          <input
            type="number"
            name="chickenCount"
            value={formData.chickenCount}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">حالة الصحة:</label>
          <select
            name="healthStatus"
            value={formData.healthStatus}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">اختر حالة الصحة</option>
            <option value="صحي">صحي</option>
            <option value="غير صحي">غير صحي</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">ملاحظات:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button  type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200" onClick={handleSubmit}>
          تقديم الفحص
        </button>
      </form>
    </div>
  );
};

export default MedicalCheckForm;
