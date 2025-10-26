import ProtectedRoute from '../../components/auth/ProtectedRoute';
import LogoutButton from '../../components/auth/LogoutButton';

export default function ArcherLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={['ARCHER']}>
      <LogoutButton />
      <main>{children}</main>
    </ProtectedRoute>
  );
}