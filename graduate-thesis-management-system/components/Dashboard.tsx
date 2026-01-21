
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { MOCK_STUDENTS, STATUS_COLORS } from '../constants';
import { ThesisStatus, Phase } from '../types';
import { AlertCircle, CheckCircle2, Clock, FileText, Send } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = useMemo(() => {
    const total = MOCK_STUDENTS.length;
    const passed = MOCK_STUDENTS.filter(s => s.status === ThesisStatus.PASSED).length;
    const pending = MOCK_STUDENTS.filter(s => s.status === ThesisStatus.AUDITING).length;
    const modifying = MOCK_STUDENTS.filter(s => s.status === ThesisStatus.MODIFYING).length;

    // Overdue simulation (more than 2 days in auditing)
    const overdueCount = MOCK_STUDENTS.filter(s => 
      s.status === ThesisStatus.AUDITING && s.lastAuditDate && 
      (new Date().getTime() - new Date(s.lastAuditDate).getTime()) > 2 * 24 * 60 * 60 * 1000
    ).length;

    return { total, passed, pending, modifying, overdueCount };
  }, []);

  const statusData = useMemo(() => {
    return Object.values(ThesisStatus).map(status => ({
      name: status,
      value: MOCK_STUDENTS.filter(s => s.status === status).length
    }));
  }, []);

  const phaseData = useMemo(() => {
    return Object.values(Phase).map(phase => ({
      name: phase,
      硕士: MOCK_STUDENTS.filter(s => s.currentPhase === phase && s.degree === '硕士').length,
      博士: MOCK_STUDENTS.filter(s => s.currentPhase === phase && s.degree === '博士').length,
    }));
  }, []);

  const COLORS = ['#94a3b8', '#3b82f6', '#f59e0b', '#a855f7', '#10b981'];

  return (
    <div className="space-y-8">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: '学生总数', value: stats.total, icon: UsersIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '已通过阶段', value: stats.passed, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
          { label: '审核中', value: stats.pending, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: '逾期提醒', value: stats.overdueCount, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className={`${card.bg} ${card.color} p-4 rounded-xl`}>
              <card.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{card.label}</p>
              <h4 className="text-2xl font-bold text-slate-800">{card.value}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Status Distribution */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 text-slate-800">论文状态分布</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Phase Breakdown */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 text-slate-800">各阶段进度分析</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={phaseData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="硕士" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="博士" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Insights (Powered by Gemini) */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-8 rounded-2xl text-white shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2 flex items-center">
              <span className="mr-2">✨</span> 智能监控助理
            </h3>
            <p className="text-indigo-100 max-w-xl">
              系统分析当前进度，有 2 名学生的审核已超过 48 小时未响应。建议管理员主动联系 李教授 和 张教授 进行催办。
            </p>
          </div>
          <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg backdrop-blur-md border border-white/20 transition-all">
            查看详情
          </button>
        </div>
      </div>
    </div>
  );
};

const UsersIcon = (props: any) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export default Dashboard;
