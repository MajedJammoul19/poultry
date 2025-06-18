import React from 'react';

function SystemManegement() {
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-600">معلومات عن المزرعة</h1>
      
      <section className="mb-8 p-5 border rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-semibold mb-3">معلومات المزرعة</h2>
        <p>الاسم: <span className="font-medium">مزرعة الدواجن السعيدة</span></p>
        <p>الموقع: <span className="font-medium">الرياض، المملكة العربية السعودية</span></p>
        <p>المساحة: <span className="font-medium">5000 متر مربع</span></p>
      </section>

      <section className="mb-8 p-5 border rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-semibold mb-3">عدد الحظائر وأنواع الدواجن</h2>
        <ul className="list-disc pl-5">
          <li>حظيرة 1: <span className="font-medium">دجاج بياض</span></li>
          <li>حظيرة 2: <span className="font-medium">دجاج لاحم</span></li>
        </ul>
      </section>

      <section className="mb-8 p-5 border rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-semibold mb-3">أنواع الأعلاف المستخدمة</h2>
        <ul className="list-disc pl-5">
          <li><span className="font-medium">علف بروتين عالي</span></li>
          <li><span className="font-medium">علف نمو</span></li>
        </ul>
      </section>

      <section className="mb-8 p-5 border rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-semibold mb-3">جداول التغذية</h2>
        <p>تغذية الدواجن تتم ثلاث مرات يوميًا.</p>
      </section>

      <section className="mb-8 p-5 border rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-semibold mb-3">كمية الأعلاف المطلوبة</h2>
        <p>كل نوع من الدواجن يحتاج إلى <span className="font-medium">150 غرام يوميًا.</span></p>
      </section>

      <section className="mb-8 p-5 border rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-semibold mb-3">معلومات التطعيمات والعلاجات</h2>
        <p>تطعيمات دورية كل 6 أشهر.</p>
      </section>

      <section className="mb-8 p-5 border rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-semibold mb-3">معلومات عن الأمراض الشائعة</h2>
        <p>أمراض مثل انفلونزا الطيور، وعلاجها يكون بالتطعيم والاهتمام بالنظافة.</p>
      </section>

      <section className="mb-8 p-5 border rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-semibold mb-3">معايير الإنتاج</h2>
        <p>عدد البيض المتوقع يوميًا: <span className="font-medium">200 بيضة.</span></p>
      </section>

      <section className="mb-8 p-5 border rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-semibold mb-3">تتبع الإنتاجية</h2>
        <p>يمكن تتبع الإنتاجية لكل حظيرة باستخدام نظام إدارة.</p>
      </section>

      <section className="mb-8 p-5 border rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-semibold mb-3">درجة الحرارة والرطوبة المناسبة</h2>
        <p>درجة الحرارة: <span className="font-medium">25 درجة مئوية</span>، الرطوبة: <span className="font-medium">60%</span>.</p>
      </section>

      <section className="mb-8 p-5 border rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-semibold mb-3">معلومات عن التهوية والإضاءة</h2>
        <p>تهوية جيدة وإضاءة طبيعية لمدة 12 ساعة يوميًا.</p>
      </section>
    </div>
  );
}

export default SystemManegement;
