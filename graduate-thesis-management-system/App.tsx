
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import StudentManagement from './components/StudentManagement';
import { UserRole } from './types';

const App: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>(UserRole.ADMIN);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Simple view switcher
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <StudentManagement />;
      case 'flows':
        return (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">流程管理模块</h3>
            <p className="text-slate-500 max-w-sm mx-auto">管理员可在此创建、编辑硕士或博士的开题、中期和毕业答辩流程模板。</p>
            <button className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-medium">创建新流程</button>
          </div>
        );
      case 'tutor-portal':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">欢迎，张教授</h3>
                <p className="text-slate-500 text-sm">您目前负责 12 位学生的论文指导，其中 3 位有待审核。</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium">一键处理所有</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">待审核</span>
                    <span className="text-xs text-slate-400">提交于：2023-10-25</span>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-1">王同学</h4>
                  <p className="text-sm text-slate-500 mb-4">开题报告 - 硕士</p>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">查看全文</button>
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">立即审核</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'student-portal':
        return (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">毕业论文进度</h3>
                  <p className="text-slate-500">陈同学 (硕士) | 导师：李教授</p>
                </div>
                <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-xl font-bold">
                  导师审核中
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="flex justify-between relative">
                <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 -z-0"></div>
                {[
                  { label: '开题阶段', completed: true, active: false },
                  { label: '中期阶段', completed: false, active: true },
                  { label: '毕业答辩', completed: false, active: false },
                ].map((step, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white ${step.completed ? 'bg-green-500 text-white' : step.active ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                      {step.completed ? '✓' : i + 1}
                    </div>
                    <span className={`mt-2 text-sm font-bold ${step.active ? 'text-blue-600' : 'text-slate-500'}`}>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="text-lg font-bold mb-4 text-slate-800">历史审核记录</h4>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-1">
                  <p className="font-semibold text-slate-800">开题报告 - 已通过</p>
                  <p className="text-xs text-slate-500">审核人：李教授 | 2023-09-12</p>
                  <p className="text-sm text-slate-600 mt-2 bg-slate-50 p-3 rounded-lg">课题研究方向明确，方法论严谨，同意进入下一阶段。</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout 
      activeRole={activeRole} 
      setActiveRole={setActiveRole}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
