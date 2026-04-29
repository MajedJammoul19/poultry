import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const MedicalReports = () => {
  const [examinations, setExaminations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingExam, setEditingExam] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    date: "",
    vetName: "",
    location: "",
    chickenCount: "",
    healthStatus: "",
    notes: "",
  });

  useEffect(() => {
    fetchExaminations();
  }, []);

  const fetchExaminations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/medical-examinations"
      );

      if (response.data.success) {
        setExaminations(response.data.data);
      } else {
        setError("فشل في جلب البيانات");
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء جلب البيانات");
      setLoading(false);
    }
  };

  // دالة حذف الفحص (واجهة فقط)
  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الفحص الطبي؟")) {
      setExaminations(examinations.filter((exam) => exam._id !== id));
      alert("تم حذف الفحص الطبي بنجاح (تحديث محلي فقط)");
    }
  };

  // دالة فتح نافذة التعديل
  const handleEdit = (exam) => {
    setEditingExam(exam);
    setEditFormData({
      date: exam.date ? exam.date.split("T")[0] : "",
      vetName: exam.vetName,
      location: exam.location,
      chickenCount: exam.chickenCount,
      healthStatus: exam.healthStatus,
      notes: exam.notes || "",
    });
    setShowEditModal(true);
  };

  // دالة تحديث البيانات في الفورم
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  // دالة حفظ التعديلات (واجهة فقط)
  const handleUpdate = (e) => {
    e.preventDefault();
    
    setExaminations(
      examinations.map((exam) =>
        exam._id === editingExam._id
          ? { ...exam, ...editFormData }
          : exam
      )
    );
    
    setShowEditModal(false);
    setEditingExam(null);
    alert("تم تحديث الفحص الطبي بنجاح (تحديث محلي فقط)");
  };

  // دالة تصدير PDF لجميع التقارير
  const exportToPDF = () => {
    if (examinations.length === 0) {
      alert("لا توجد تقارير لتصديرها");
      return;
    }

    const doc = new jsPDF();
    
    // إضافة عنوان رئيسي
    doc.setFontSize(20);
    doc.setTextColor(41, 128, 185);
    doc.text("تقارير الفحص الطبي للدواجن", 105, 20, { align: "center" });
    
    // إضافة خط فاصل
    doc.setDrawColor(41, 128, 185);
    doc.line(20, 25, 190, 25);
    
    // إضافة معلومات التقرير
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`تاريخ التقرير: ${new Date().toLocaleDateString("ar-EG")}`, 105, 35, { align: "center" });
    doc.text(`عدد الفحوصات: ${examinations.length}`, 105, 42, { align: "center" });
    
    // إحصائيات الحالة الصحية
    const healthStats = {
      "ممتاز": 0,
      "جيد": 0,
      "متوسط": 0,
      "ضعيف": 0,
      "حرج": 0
    };
    
    let totalChickens = 0;
    examinations.forEach(exam => {
      healthStats[exam.healthStatus] = (healthStats[exam.healthStatus] || 0) + 1;
      totalChickens += exam.chickenCount;
    });
    
    doc.setFontSize(9);
    let yStat = 50;
    doc.text("إحصائيات الفحوصات:", 190, yStat, { align: "right" });
    yStat += 6;
    doc.text(`إجمالي عدد الدجاج المفحوص: ${totalChickens}`, 190, yStat, { align: "right" });
    yStat += 5;
    doc.text("توزيع الحالة الصحية:", 190, yStat, { align: "right" });
    yStat += 5;
    
    Object.entries(healthStats).forEach(([status, count]) => {
      if (count > 0) {
        doc.text(`• ${status}: ${count} فحص`, 190, yStat, { align: "right" });
        yStat += 5;
      }
    });
    
    // تجهيز البيانات للجدول
    const tableData = examinations.map((exam) => [
      new Date(exam.date).toLocaleDateString("ar-EG"),
      exam.vetName,
      exam.location,
      exam.chickenCount.toString(),
      exam.healthStatus,
      exam.notes || "لا توجد ملاحظات",
    ]);
    
    const tableHeaders = [
      "التاريخ",
      "اسم الطبيب البيطري",
      "الموقع",
      "عدد الدجاج",
      "الحالة الصحية",
      "الملاحظات",
    ];
    
    // إنشاء الجدول
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
      startY: yStat + 10,
      theme: "grid",
      styles: {
        fontSize: 9,
        cellPadding: 3,
        halign: "right",
        font: "helvetica",
        lineColor: [200, 200, 200],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontSize: 10,
        fontStyle: "bold",
        halign: "right",
        valign: "middle",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 35 },
        2: { cellWidth: 30 },
        3: { cellWidth: 20 },
        4: { cellWidth: 25 },
        5: { cellWidth: 45 },
      },
      margin: { top: yStat + 10, right: 15, bottom: 20, left: 15 },
      didDrawPage: (data) => {
        // إضافة رقم الصفحة
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(
          `الصفحة ${data.pageNumber} من ${pageCount}`,
          doc.internal.pageSize.width - 20,
          doc.internal.pageSize.height - 10,
          { align: "center" }
        );
      },
    });
    
    // إضافة تذييل
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("تم إنشاء هذا التقرير بواسطة نظام الفحص الطبي للدواجن", 105, finalY, { align: "center" });
    
    // حفظ PDF
    doc.save(`تقارير_الفحص_الطبي_${new Date().toISOString().split("T")[0]}.pdf`);
  };

  // دالة تصدير PDF لفحص واحد
  const exportSingleReportToPDF = (exam) => {
    const doc = new jsPDF();
    
    // إضافة عنوان
    doc.setFontSize(20);
    doc.setTextColor(41, 128, 185);
    doc.text("تقرير الفحص الطبي للدواجن", 105, 20, { align: "center" });
    
    doc.setDrawColor(41, 128, 185);
    doc.line(20, 25, 190, 25);
    
    // إضافة تفاصيل الفحص
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    let yPosition = 40;
    const lineHeight = 10;
    
    doc.text(`التاريخ: ${new Date(exam.date).toLocaleDateString("ar-EG")}`, 190, yPosition, { align: "right" });
    yPosition += lineHeight;
    doc.text(`اسم الطبيب البيطري: ${exam.vetName}`, 190, yPosition, { align: "right" });
    yPosition += lineHeight;
    doc.text(`الموقع: ${exam.location}`, 190, yPosition, { align: "right" });
    yPosition += lineHeight;
    doc.text(`عدد الدجاج المفحوص: ${exam.chickenCount}`, 190, yPosition, { align: "right" });
    yPosition += lineHeight;
    
    // إضافة الحالة الصحية مع تنسيق خاص
    doc.text("الحالة الصحية: ", 190, yPosition, { align: "right" });
    
    // تلوين الحالة الصحية حسب القيمة
    let healthColor = [0, 0, 0];
    switch(exam.healthStatus) {
      case "ممتاز":
        healthColor = [39, 174, 96];
        break;
      case "جيد":
        healthColor = [46, 204, 113];
        break;
      case "متوسط":
        healthColor = [241, 196, 15];
        break;
      case "ضعيف":
        healthColor = [230, 126, 34];
        break;
      case "حرج":
        healthColor = [231, 76, 60];
        break;
      default:
        healthColor = [0, 0, 0];
    }
    
    doc.setTextColor(healthColor[0], healthColor[1], healthColor[2]);
    doc.text(exam.healthStatus, 190, yPosition, { align: "right" });
    yPosition += lineHeight;
    
    // إعادة تعيين اللون للأسود
    doc.setTextColor(0, 0, 0);
    
    // إضافة الملاحظات
    if (exam.notes) {
      doc.text("الملاحظات:", 190, yPosition, { align: "right" });
      yPosition += lineHeight;
      
      const splitNotes = doc.splitTextToSize(exam.notes, 170);
      doc.text(splitNotes, 190, yPosition, { align: "right" });
      yPosition += splitNotes.length * lineHeight;
    } else {
      doc.text("الملاحظات: لا توجد ملاحظات", 190, yPosition, { align: "right" });
      yPosition += lineHeight;
    }
    
    // إضافة توصيات تلقائية بناءً على الحالة الصحية
    yPosition += 10;
    doc.setFontSize(11);
    doc.setTextColor(41, 128, 185);
    doc.text("التوصيات:", 190, yPosition, { align: "right" });
    yPosition += lineHeight;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    let recommendations = [];
    switch(exam.healthStatus) {
      case "ممتاز":
        recommendations = [
          "• الاستمرار في برنامج الرعاية الحالي",
          "• إجراء فحوصات دورية كل 3 أشهر",
          "• توثيق الإجراءات الوقائية المتبعة"
        ];
        break;
      case "جيد":
        recommendations = [
          "• تعزيز برنامج التغذية",
          "• متابعة الحالة عن كثب",
          "• إجراء الفحص التالي بعد شهرين"
        ];
        break;
      case "متوسط":
        recommendations = [
          "• تحسين ظروف التربية",
          "• إضافة مكملات غذائية",
          "• إعادة الفحص بعد شهر",
          "• متابعة يومية للحالة"
        ];
        break;
      case "ضعيف":
        recommendations = [
          "• تدخل بيطري عاجل",
          "• عزل الطيور المصابة",
          "• تحسين النظافة والتعقيم",
          "• إعادة الفحص خلال أسبوعين"
        ];
        break;
      case "حرج":
        recommendations = [
          "• تدخل بيطري فوري",
          "• برنامج علاجي مكثف",
          "• عزل كامل للقطيع",
          "• تقييم الوضع يومياً",
          "• التواصل مع الجهات المختصة"
        ];
        break;
    }
    
    recommendations.forEach(rec => {
      doc.text(rec, 190, yPosition, { align: "right" });
      yPosition += 6;
    });
    
    // إضافة خانة التوقيع
    yPosition += 15;
    doc.setDrawColor(100, 100, 100);
    doc.line(20, yPosition, 190, yPosition);
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("توقيع الطبيب البيطري", 105, yPosition + 5, { align: "center" });
    
    // إضافة تذييل
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`تاريخ الطباعة: ${new Date().toLocaleString("ar-EG")}`, 105, yPosition + 15, { align: "center" });
    
    // حفظ PDF
    doc.save(`فحص_طبي_${exam.location}_${new Date(exam.date).toISOString().split("T")[0]}.pdf`);
  };

  // دالة لتحديد لون الحالة الصحية
  const getHealthStatusColor = (status) => {
    switch(status) {
      case "جيد":
        return "bg-green-100 text-green-800";
      case "ممتاز":
        return "bg-emerald-100 text-emerald-800";
      case "متوسط":
        return "bg-yellow-100 text-yellow-800";
      case "ضعيف":
        return "bg-orange-100 text-orange-800";
      case "حرج":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <div className="text-center mt-10">جاري تحميل البيانات...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button
            onClick={exportToPDF}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            تصدير جميع التقارير إلى PDF
          </button>
        </div>
        <h2 className="text-2xl font-bold text-right">
          تقارير الفحص الطبي للدواجن
        </h2>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full border border-gray-200 text-right">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border">التاريخ</th>
              <th className="py-3 px-4 border">اسم الطبيب البيطري</th>
              <th className="py-3 px-4 border">الموقع</th>
              <th className="py-3 px-4 border">عدد الدجاج</th>
              <th className="py-3 px-4 border">الحالة الصحية</th>
              <th className="py-3 px-4 border">الملاحظات</th>
              <th className="py-3 px-4 border">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {examinations.map((exam) => (
              <tr key={exam._id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-4 border">
                  {new Date(exam.date).toLocaleDateString("ar-EG")}
                </td>
                <td className="py-3 px-4 border">{exam.vetName}</td>
                <td className="py-3 px-4 border">{exam.location}</td>
                <td className="py-3 px-4 border">
                  <span className="font-semibold">{exam.chickenCount}</span>
                </td>
                <td className="py-3 px-4 border">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getHealthStatusColor(
                      exam.healthStatus
                    )}`}
                  >
                    {exam.healthStatus}
                  </span>
                </td>
                <td className="py-3 px-4 border">
                  {exam.notes || "لا توجد ملاحظات"}
                </td>
                <td className="py-3 px-4 border">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(exam)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-200 text-sm"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => exportSingleReportToPDF(exam)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition duration-200 text-sm"
                    >
                      PDF
                    </button>
                    <button
                      onClick={() => handleDelete(exam._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200 text-sm"
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {examinations.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            لا توجد تقارير حالياً
          </div>
        )}
      </div>

      {/* نافذة تعديل الفحص الطبي - Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4 text-right">تعديل الفحص الطبي</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-right mb-2">التاريخ</label>
                <input
                  type="date"
                  name="date"
                  value={editFormData.date}
                  onChange={handleEditInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-right mb-2">اسم الطبيب البيطري</label>
                <input
                  type="text"
                  name="vetName"
                  value={editFormData.vetName}
                  onChange={handleEditInputChange}
                  className="w-full p-2 border rounded text-right"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-right mb-2">الموقع</label>
                <input
                  type="text"
                  name="location"
                  value={editFormData.location}
                  onChange={handleEditInputChange}
                  className="w-full p-2 border rounded text-right"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-right mb-2">عدد الدجاج</label>
                <input
                  type="number"
                  name="chickenCount"
                  value={editFormData.chickenCount}
                  onChange={handleEditInputChange}
                  min="0"
                  className="w-full p-2 border rounded text-right"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-right mb-2">الحالة الصحية</label>
                <select
                  name="healthStatus"
                  value={editFormData.healthStatus}
                  onChange={handleEditInputChange}
                  className="w-full p-2 border rounded text-right"
                  required
                >
                  <option value="ممتاز">ممتاز</option>
                  <option value="جيد">جيد</option>
                  <option value="متوسط">متوسط</option>
                  <option value="ضعيف">ضعيف</option>
                  <option value="حرج">حرج</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-right mb-2">الملاحظات</label>
                <textarea
                  name="notes"
                  value={editFormData.notes}
                  onChange={handleEditInputChange}
                  rows="3"
                  className="w-full p-2 border rounded text-right"
                  placeholder="أدخل الملاحظات هنا..."
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                >
                  حفظ التعديلات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalReports;