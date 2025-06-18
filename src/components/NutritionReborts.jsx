
   import React from 'react';

   const NutritionReport = () => {
     const reports = [
       { date: '2025-5-01', feedType: 'علف 1', quantity: '100 كجم' },
       { date: '2025-5-02', feedType: 'علف 2', quantity: '120 كجم' },
       { date: '2025-6-03', feedType: 'علف 3', quantity: '150 كجم' },
        { date: '2025-6-04', feedType: 'علف 4', quantity: '160 كجم' },
         { date: '2025-7-05', feedType: 'علف 5', quantity: '110 كجم' },
          { date: '2025-8-06', feedType: 'علف 6', quantity: '150 كجم' },
           { date: '2025-8-07', feedType: 'علف 7', quantity: '180 كجم' },
            { date: '2025-10-08', feedType: 'علف 8', quantity: '135 كجم' },
             { date: '2025-12-09', feedType: 'علف 9', quantity: '175 كجم' },
     ];

     return (
       <div className="container mx-auto p-4">
         <h1 className="text-2xl font-bold mb-4">تقارير التغذية اليومية</h1>
         <table className="min-w-full bg-white border border-gray-300">
           <thead>
             <tr>
               <th className="py-2 px-4 border-b">التاريخ</th>
               <th className="py-2 px-4 border-b">نوع العلف</th>
               <th className="py-2 px-4 border-b">الكمية</th>
             </tr>
           </thead>
           <tbody>
             {reports.map((report, index) => (
               <tr key={index} className="hover:bg-gray-100">
                 <td className="py-2 px-4 border-b">{report.date}</td>
                 <td className="py-2 px-4 border-b">{report.feedType}</td>
                 <td className="py-2 px-4 border-b">{report.quantity}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     );
   };

   export default NutritionReport;
   
