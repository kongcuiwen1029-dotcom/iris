
export enum UserRole {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  TUTOR = 'TUTOR'
}

export enum Phase {
  PROPOSAL = '开题',
  MIDTERM = '中期',
  DEFENSE = '毕业答辩'
}

export enum ThesisStatus {
  NOT_SUBMITTED = '未提交',
  CHECKING = '系统检测中',
  AUDITING = '导师审核中',
  MODIFYING = '学生修改中',
  PASSED = '已通过'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Tutor extends User {
  specialization: string;
}

export interface Student extends User {
  tutorId: string;
  reviewerId: string;
  degree: '硕士' | '博士';
  currentPhase: Phase;
  status: ThesisStatus;
  submitDate?: string;
  lastAuditDate?: string;
}

export interface AuditRecord {
  id: string;
  studentId: string;
  phase: Phase;
  tutorId: string;
  result: '通过' | '修改' | '拒绝';
  comment: string;
  date: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'OVERDUE' | 'AUDIT_PASSED' | 'SYSTEM';
}
