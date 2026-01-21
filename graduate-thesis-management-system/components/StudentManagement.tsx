
import React, { useState } from 'react';
import { MOCK_STUDENTS, MOCK_TUTORS, STATUS_COLORS } from '../constants';
import { ThesisStatus, Phase } from '../types';
import { Search, Filter, Plus, FileSpreadsheet, MoreVertical, Mail, Send } from 'lucide-react';
import { generateEmailContent } from '../services/geminiService';

const StudentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPhase, setFilterPhase] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showEmailModal, setShowEmailModal] = useState<{show: boolean, studentName?: string, phase?: string}>({show: false});
  const [emailContent, setEmailContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredStudents = MOCK_STUDENTS.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPhase = filterPhase === 'all' || s.currentPhase === filterPhase;
    const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
    return matchesSearch && matchesPhase && matchesStatus;
  });

  const handleNotify = async (studentName: string, phase: string) => {
    setIsGenerating(true);
    setShowEmailModal({ show: true, studentName, phase });
    const nextPhase = phase === Phase.PROPOSAL ? Phase.MIDTERM : Phase.DEFENSE;
    const content = await generateEmailContent(studentName, phase, nextPhase);
    setEmailContent(content);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索学生姓名或邮箱..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            value={filterPhase}
            onChange={(e) => setFilterPhase(e.target.value)}
          >
            <option value="all">所有阶段</option>
            {Object.values(Phase).map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select 
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">所有状态</option>
            {Object.values(ThesisStatus).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl transition-all font-medium">
            <FileSpreadsheet size={18} />
            <span>批量导入</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/20 transition-all font-medium">
            <Plus size={18} />
            <span>添加学生</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">学生信息</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">培养层次</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">负责导师</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">当前阶段</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.map((student) => {
              const tutor = MOCK_TUTORS.find(t => t.id === student.tutorId);
              return (
                <tr key={student.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${student.degree === '博士' ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600'}`}>
                      {student.degree}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {tutor?.name || '未分配'}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">
                    {student.currentPhase}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[student.status]}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {student.status === ThesisStatus.PASSED && (
                        <button 
                          onClick={() => handleNotify(student.name, student.currentPhase)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="发送阶段通过通知"
                        >
                          <Mail size={18} />
                        </button>
                      )}
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredStudents.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            没有找到匹配的学生记录
          </div>
        )}
      </div>

      {/* Email Modal */}
      {showEmailModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">发送阶段通过通知</h3>
              <button onClick={() => setShowEmailModal({show: false})} className="text-slate-400 hover:text-slate-600">×</button>
            </div>
            <div className="p-8">
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">收件人</label>
                <input type="text" readOnly className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl" value={`${showEmailModal.studentName} (${showEmailModal.phase}已通过)`} />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">邮件正文 (AI 已根据当前阶段生成)</label>
                {isGenerating ? (
                  <div className="h-40 w-full bg-slate-50 rounded-xl flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <textarea 
                    className="w-full h-40 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                  />
                )}
              </div>
              <div className="flex items-center space-x-3 p-4 bg-blue-50 border border-blue-100 rounded-xl mb-6">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><Send size={16} /></div>
                <p className="text-xs text-blue-700 leading-relaxed">
                  提示：发送通过通知后，学生将收到带有下一阶段模版附件的邀请邮件。
                </p>
              </div>
              <div className="flex justify-end space-x-4">
                <button onClick={() => setShowEmailModal({show: false})} className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-all">取消</button>
                <button className="px-8 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all flex items-center space-x-2">
                  <span>立即发送</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
