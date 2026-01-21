
import { Student, ThesisStatus, Phase, UserRole, Tutor } from './types';

export const MOCK_TUTORS: Tutor[] = [
  { id: 't1', name: '张教授', email: 'zhang@edu.cn', role: UserRole.TUTOR, specialization: '人工智能' },
  { id: 't2', name: '李教授', email: 'li@edu.cn', role: UserRole.TUTOR, specialization: '数据科学' },
  { id: 't3', name: '王教授', email: 'wang@edu.cn', role: UserRole.TUTOR, specialization: '软件工程' },
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: 's1',
    name: '陈同学',
    email: 'chen@student.cn',
    role: UserRole.STUDENT,
    degree: '硕士',
    tutorId: 't1',
    reviewerId: 't2',
    currentPhase: Phase.PROPOSAL,
    status: ThesisStatus.AUDITING,
    submitDate: '2023-10-20',
    lastAuditDate: '2023-10-21',
  },
  {
    id: 's2',
    name: '林同学',
    email: 'lin@student.cn',
    role: UserRole.STUDENT,
    degree: '博士',
    tutorId: 't2',
    reviewerId: 't3',
    currentPhase: Phase.MIDTERM,
    status: ThesisStatus.PASSED,
    submitDate: '2023-09-15',
  },
  {
    id: 's3',
    name: '周同学',
    email: 'zhou@student.cn',
    role: UserRole.STUDENT,
    degree: '硕士',
    tutorId: 't3',
    reviewerId: 't1',
    currentPhase: Phase.DEFENSE,
    status: ThesisStatus.MODIFYING,
    submitDate: '2023-10-25',
  },
  {
    id: 's4',
    name: '吴同学',
    email: 'wu@student.cn',
    role: UserRole.STUDENT,
    degree: '博士',
    tutorId: 't1',
    reviewerId: 't3',
    currentPhase: Phase.PROPOSAL,
    status: ThesisStatus.NOT_SUBMITTED,
  }
];

export const STATUS_COLORS: Record<ThesisStatus, string> = {
  [ThesisStatus.NOT_SUBMITTED]: 'bg-gray-100 text-gray-600',
  [ThesisStatus.CHECKING]: 'bg-blue-100 text-blue-600',
  [ThesisStatus.AUDITING]: 'bg-amber-100 text-amber-600',
  [ThesisStatus.MODIFYING]: 'bg-purple-100 text-purple-600',
  [ThesisStatus.PASSED]: 'bg-green-100 text-green-600',
};
