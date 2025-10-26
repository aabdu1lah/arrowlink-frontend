import ProtectedRoute from '../../components/auth/ProtectedRoute';
import LogoutButton from '../../components/auth/LogoutButton';

// Simple Navbar component for this layout
const ManagerNav = () => {
    // Note: You can't use useAuth here directly as it's a server component by default
    // For logout functionality, you would create a client component button.
    return (
        <header className="bg-gray-800 p-4 mb-6 rounded-lg">
            <h1 className="text-xl font-bold">Manager Portal</h1>
        </header>
    );
};

export default function ManagerLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={['MANAGER']}>
      <ManagerNav />
      <LogoutButton />
      <main>{children}</main>
    </ProtectedRoute>
  );
}