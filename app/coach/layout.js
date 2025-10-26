import ProtectedRoute from '../../components/auth/ProtectedRoute';
import LogoutButton from '../../components/auth/LogoutButton';

export default function CoachLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={['COACH']}>
      <LogoutButton />
      <main>{children}</main>
    </ProtectedRoute>
  );
}