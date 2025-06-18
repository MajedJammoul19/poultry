import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'أحمد محمد', position: 'موظف' },
    { id: 2, name: 'سارة علي', position: ' موظف' },
    { id: 3, name: 'علي حسن', position: ' موظف' },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const addEmployee = (employee) => {
    setEmployees([...employees, { id: employees.length + 1, ...employee }]);
  };

  const editEmployee = (updatedEmployee) => {
    setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const openEditForm = (employee) => {
    setEmployeeToEdit(employee);
    setIsFormOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">إدارة الموظفين</h1>
      <button onClick={() => { setIsFormOpen(true); setEmployeeToEdit(null); }} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4">
        إضافة موظف جديد
      </button>
      {isFormOpen && (
        <EmployeeForm
          onAddEmployee={addEmployee}
          onEdit={editEmployee}
          onClose={() => { setIsFormOpen(false); setEmployeeToEdit(null); }}
          employeeToEdit={employeeToEdit}
        />
      )}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">الرقم</th>
            <th className="border px-4 py-2">الاسم</th>
            <th className="border px-4 py-2">الوظيفة</th>
            <th className="border px-4 py-2">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{employee.id}</td>
              <td className="border px-4 py-2">{employee.name}</td>
              <td className="border px-4 py-2">{employee.position}</td>
              <td className="border px-4 py-2">
                <button onClick={() => openEditForm(employee)} className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 mr-1">
                  تعديل
                </button>
                <button onClick={() => deleteEmployee(employee.id)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};




export default EmployeeTable;
