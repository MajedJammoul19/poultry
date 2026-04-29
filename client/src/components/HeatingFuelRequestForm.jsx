import React, { useState } from 'react';
import { createFuelOrder } from '../api/auth';
const HeatingFuelRequestForm = () => {
    const [formData, setFormData] = useState({
        facilityName: '',
        ownerName: '',
        contactNumber: '',
        fuelType: '',
        quantity: '',
        deliveryDate: '',
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
       e.preventDefault();
      try {
              await createFuelOrder({
               facilityName: formData.facilityName,
               ownerName: formData.ownerName,
               contactNumber: formData.contactNumber,
               fuelType: formData.fuelType,
               quantity: formData.quantity,
               deliveryDate: formData.deliveryDate,
               
             });
          
             alert("mission done") 
             
           } 
           catch {
             console.log("error")
           }
        //   window.location.reload();
     };
   
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">طلب وقود التدفئة</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="farmName">اسم المنشأة</label>
                    <input
                        type="text"
                        id="facilityName"
                        name="facilityName"
                        value={formData.facilityName}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="ownerName">اسم المالك</label>
                    <input
                        type="text"
                        id="ownerName"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="contactNumber">رقم الاتصال</label>
                    <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="fuelType">نوع الوقود</label>
                    <select
                        id="fuelType"
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">اختر نوع الوقود</option>
                        <option value="ديزل">الديزل</option>
                        <option value="غاز طبيعي">الغاز الطبيعي</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="quantity">الكمية المطلوبة (لتر)</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="deliveryDate">تاريخ التسليم المطلوب</label>
                    <input
                        type="date"
                        id="deliveryDate"
                        name="deliveryDate"
                        value={formData.deliveryDate}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <button  type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">
                    إرسال الطلب
                </button>
            </form>
        </div>
    );
};

export default HeatingFuelRequestForm;
