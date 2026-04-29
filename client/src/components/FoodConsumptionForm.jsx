import React, { useState } from "react";
import axios from "axios";

const FoodConsumptionForm = () => {
  const [formData, setFormData] = useState({
    recordDate: new Date().toISOString().split('T')[0],
    poultryType: "دجاج لاحم",
    batchNumber: "",
    dailyConsumption: "",
    birdCount: "",
    averageAge: "",
    feedType: "بادئ",
    feedBrand: "",
    conversionRate: "",
    feedCost: "",
    expectedGrowth: "",
    temperature: "",
    healthStatus: "جيد",
    notes: "",
    status: "مسجل"
  });

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePredict = async () => {
    if (!formData.dailyConsumption || !formData.expectedGrowth) {
      setMessage({
        type: "warning",
        text: "الرجاء إدخال الاستهلاك اليومي والنمو المتوقع للتنبؤ"
      });
      return;
    }

    const daily = parseFloat(formData.dailyConsumption);
    const growth = parseFloat(formData.expectedGrowth) / 100;
    
    const monthlyDemand = daily * 30;
    const futureDemand = monthlyDemand * (1 + growth);
    const recommendedOrder = futureDemand * 1.1; // 10% احتياطي
    
    setPrediction({
      monthlyDemand: Math.round(monthlyDemand),
      futureDemand: Math.round(futureDemand),
      recommendedOrder: Math.round(recommendedOrder),
      safetyStock: Math.round(recommendedOrder * 0.15)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(
        "http://localhost:5000/api/food-consumption",
        formData
      );
      
      if (response.data.success) {
        setMessage({
          type: "success",
          text: "تم تسجيل استهلاك الغذاء بنجاح!"
        });
        
        // إعادة تعيين النموذج
        setFormData({
          recordDate: new Date().toISOString().split('T')[0],
          poultryType: "دجاج لاحم",
          batchNumber: "",
          dailyConsumption: "",
          birdCount: "",
          averageAge: "",
          feedType: "بادئ",
          feedBrand: "",
          conversionRate: "",
          feedCost: "",
          expectedGrowth: "",
          temperature: "",
          healthStatus: "جيد",
          notes: "",
          status: "مسجل"
        });
        setPrediction(null);
        
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "حدث خطأ أثناء التسجيل"
      });
    } finally {
      setLoading(false);
    }
  };

  const poultryTypes = ["دجاج لاحم", "دجاج بياض", "بط", "حمام", "سمان", "ديك رومي"];
  const feedTypes = ["بادئ", "نامي", "ناهي", "بياض", "خاص"];
  const healthStatuses = ["ممتاز", "جيد", "متوسط", "ضعيف", "حرج"];

  return (
    <div className="container mx-auto p-6">
      {/* رسائل التنبيه */}
      {message.text && (
        <div className={`mb-4 p-4 rounded-lg text-right ${
          message.type === "success" 
            ? "bg-green-100 text-green-700 border border-green-400"
            : message.type === "warning"
            ? "bg-yellow-100 text-yellow-700 border border-yellow-400"
            : "bg-red-100 text-red-700 border border-red-400"
        }`}>
          {message.text}
        </div>
      )}

      {/* الهيدر */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-white text-right">
          🍽️ تسجيل استهلاك الغذاء
        </h1>
        <p className="text-orange-100 text-right mt-2">
          سجل استهلاك الغذاء لتحديد الكميات المستقبلية المطلوبة
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* النموذج */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
            {/* معلومات أساسية */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-right mb-4 border-b pb-2">معلومات أساسية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-right mb-2">تاريخ التسجيل *</label>
                  <input
                    type="date"
                    name="recordDate"
                    value={formData.recordDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg text-right"
                    required
                  />
                </div>
                <div>
                  <label className="block text-right mb-2">نوع الدواجن *</label>
                  <select
                    name="poultryType"
                    value={formData.poultryType}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg text-right"
                    required
                  >
                    {poultryTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-right mb-2">رقم الدفعة *</label>
                  <input
                    type="text"
                    name="batchNumber"
                    value={formData.batchNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg text-right"
                    placeholder="مثال: BATCH-001"
                    required
                  />
                </div>
                <div>
                  <label className="block text-right mb-2">عدد الطيور *</label>
                  <input
                    type="number"
                    name="birdCount"
                    value={formData.birdCount}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg text-right"
                    required
                  />
                </div>
                <div>
                  <label className="block text-right mb-2">متوسط العمر (أيام) *</label>
                  <input
                    type="number"
                    name="averageAge"
                    value={formData.averageAge}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg text-right"
                    required
                  />
                </div>
              </div>
            </div>

            {/* استهلاك الغذاء */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-right mb-4 border-b pb-2">استهلاك الغذاء</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-right mb-2">الاستهلاك اليومي (كجم) *</label>
                  <input
                    type="number"
                    name="dailyConsumption"
                    value={formData.dailyConsumption}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg text-right"
                    required
                  />
                </div>
                <div>
                  <label className="block text-right mb-2">نوع العلف *</label>
                  <select
                    name="feedType"
                    value={formData.feedType}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg text-right"
                    required
                  >
                    {feedTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-right mb-2">ماركة العلف</label>
                  <input
                    type="text"
                    name="feedBrand"
                    value={formData.feedBrand}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg text-right"
                  />
                </div>
                <div>
                  <label className="block text-right mb-2">معدل تحويل العلف</label>
                  <input
                    type="number"
                    name="conversionRate"
                    value={formData.conversionRate}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full p-2 border rounded-lg text-right"
                    placeholder="مثال: 1.8"
                  />
                </div>
                <div>
                  <label className="block text-right mb-2">تكلفة العلف (لكجم)</label>
                  <input
                    type="number"
                    name="feedCost"
                    value={formData.feedCost}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full p-2 border rounded-lg text-right"
                  />
                </div>
              </div>
            </div>

            {/* التوقعات */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-right mb-4 border-b pb-2">التوقعات المستقبلية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-right mb-2">النمو المتوقع (%)</label>
                  <input
                    type="number"
                    name="expectedGrowth"
                    value={formData.expectedGrowth}
                    onChange={handleInputChange}
                    step="0.1"
                    className="w-full p-2 border rounded-lg text-right"
                    placeholder="مثال: 5"
                  />
                </div>
                <div>
                  <label className="block text-right mb-2">درجة الحرارة (مئوية)</label>
                  <input
                    type="number"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleInputChange}
                    step="0.1"
                    className="w-full p-2 border rounded-lg text-right"
                  />
                </div>
                <div>
                  <label className="block text-right mb-2">الحالة الصحية</label>
                  <select
                    name="healthStatus"
                    value={formData.healthStatus}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg text-right"
                  >
                    {healthStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handlePredict}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                >
                  🔮 تنبؤ بالاحتياجات المستقبلية
                </button>
              </div>
            </div>

            {/* ملاحظات */}
            <div className="mb-6">
              <label className="block text-right mb-2">ملاحظات</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-2 border rounded-lg text-right"
                placeholder="أي ملاحظات إضافية..."
              />
            </div>

            {/* أزرار */}
            <div className="flex gap-3 justify-end border-t pt-6">
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    recordDate: new Date().toISOString().split('T')[0],
                    poultryType: "دجاج لاحم",
                    batchNumber: "",
                    dailyConsumption: "",
                    birdCount: "",
                    averageAge: "",
                    feedType: "بادئ",
                    feedBrand: "",
                    conversionRate: "",
                    feedCost: "",
                    expectedGrowth: "",
                    temperature: "",
                    healthStatus: "جيد",
                    notes: "",
                    status: "مسجل"
                  });
                  setPrediction(null);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
              >
                مسح البيانات
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
              >
                {loading ? "جاري التسجيل..." : "تسجيل الاستهلاك"}
              </button>
            </div>
          </form>
        </div>

        {/* لوحة التنبؤات */}
        <div className="lg:col-span-1">
          {prediction && (
            <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg p-6 text-white sticky top-6">
              <h3 className="text-xl font-bold text-center mb-4">📊 توقعات الاحتياجات</h3>
              <div className="space-y-3">
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <div className="text-sm opacity-90">الطلب الشهري المتوقع</div>
                  <div className="text-2xl font-bold">{prediction.monthlyDemand.toLocaleString()} كجم</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <div className="text-sm opacity-90">الطلب المستقبلي (مع النمو)</div>
                  <div className="text-2xl font-bold">{prediction.futureDemand.toLocaleString()} كجم</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <div className="text-sm opacity-90">كمية الطلب الموصى بها</div>
                  <div className="text-2xl font-bold">{prediction.recommendedOrder.toLocaleString()} كجم</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <div className="text-sm opacity-90">المخزون الاحتياطي الموصى به</div>
                  <div className="text-2xl font-bold">{prediction.safetyStock.toLocaleString()} كجم</div>
                </div>
              </div>
              <div className="mt-4 text-center text-sm opacity-75">
                بناءً على الاستهلاك الحالي والنمو المتوقع
              </div>
            </div>
          )}
          
          {/* نصائح سريعة */}
          <div className="bg-blue-50 rounded-lg p-4 mt-4 border border-blue-200">
            <h4 className="font-bold text-right text-blue-800 mb-2">💡 نصائح سريعة</h4>
            <ul className="text-right text-sm text-blue-700 space-y-1">
              <li>• سجل الاستهلاك يومياً للحصول على توقعات دقيقة</li>
              <li>• أدخل النمو المتوقع بناءً على عمر الطيور</li>
              <li>• أضف 10-15% احتياطي للطوارئ عند الطلب</li>
              <li>• راقب معدل تحويل العلف لتحسين الكفاءة</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodConsumptionForm;