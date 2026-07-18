// ============================================================
// Action Creators
// ============================================================
// Centralized async action creators for server mutations.
// TODO: Integrate with React Hook Form + Zod for validation
// TODO: Add retry logic, error normalization, and optimistic updates

export { login, register, logout, forgotPassword, resetPassword } from './auth';
export { fetchStudents, createStudent, updateStudent, deleteStudent } from './students';
export { fetchTeachers, createTeacher, updateTeacher, deleteTeacher } from './teachers';
