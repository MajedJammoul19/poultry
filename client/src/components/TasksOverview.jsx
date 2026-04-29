import React from 'react';

const TasksOverview = () => {
  const tasks = [
    { id: 1, title: 'تسجيل التغذية اليومية', completed: 4, total: 5, color: 'bg-blue-500' },
    { id: 2, title: 'الفحوصات البيطرية', completed: 2, total: 3, color: 'bg-green-500' },
    { id: 3, title: 'طلبات الشراء المعلقة', completed: 1, total: 3, color: 'bg-yellow-500' },
    { id: 4, title: 'بلاغات النظافة', completed: 5, total: 5, color: 'bg-red-500' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">نظرة عامة على المهام</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{task.title}</span>
              <span className="text-sm text-gray-500">
                {task.completed} من {task.total}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${task.color}`}
                style={{ width: `${(task.completed / task.total) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksOverview;