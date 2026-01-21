
import React from 'react';
import { UserRole } from '../types';
import { 
  LayoutDashboard, 
  Users, 
  Layers, 
  Bell, 
  Settings, 
  LogOut,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeRole, setActiveRole, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: '控制面板', icon: LayoutDashboard, roles: [UserRole.ADMIN] },
    { id: 'students', label: '学生管理', icon: Users, roles: [UserRole.ADMIN] },
    { id: 'flows', label: '流程管理', icon: Layers, roles: [UserRole.ADMIN] },
    { id: 'tutor-portal', label: '我的指导', icon: GraduationCap, roles: [UserRole.TUTOR] },
    { id: 'student-portal', label: '论文进度', icon: Layers, roles: [UserRole.STUDENT] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(activeRole));

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col flex-shrink-0">
        <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
          <div className="bg-blue-600 p-2 rounded-lg">
            <GraduationCap size={24} />
          </div>
          <span className="font-bold text-lg tracking-tight">论文管理系统</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {filteredMenu.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 p-3 rounded-xl mb-4">
            <p className="text-xs text-slate-500 mb-1">当前身份</p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">
                {activeRole === UserRole.ADMIN ? '系统管理员' : activeRole === UserRole.TUTOR ? '导师' : '学生'}
              </span>
              <button 
                onClick={() => {
                  const roles = [UserRole.ADMIN, UserRole.TUTOR, UserRole.STUDENT];
                  const nextIdx = (roles.indexOf(activeRole) + 1) % roles.length;
                  setActiveRole(roles[nextIdx]);
                  setActiveTab(roles[nextIdx] === UserRole.ADMIN ? 'dashboard' : roles[nextIdx] === UserRole.TUTOR ? 'tutor-portal' : 'student-portal');
                }}
                className="text-[10px] bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded text-slate-300"
              >
                切换
              </button>
            </div>
          </div>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-white transition-colors">
            <LogOut size={20} />
            <span className="font-medium">退出登录</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0 z-10">
          <h2 className="text-xl font-semibold text-slate-800">
            {menuItems.find(i => i.id === activeTab)?.label || '管理系统'}
          </h2>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                  {activeRole === UserRole.ADMIN ? 'Admin User' : activeRole === UserRole.TUTOR ? '张教授' : '陈同学'}
                </p>
                <p className="text-xs text-slate-500 capitalize">{activeRole.toLowerCase()}</p>
              </div>
              <img 
                src="https://picsum.photos/seed/user123/40/40" 
                className="w-10 h-10 rounded-full border-2 border-slate-100" 
                alt="Avatar" 
              />
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </section>
      </main>
    </div>
  );
};

export default Layout;
