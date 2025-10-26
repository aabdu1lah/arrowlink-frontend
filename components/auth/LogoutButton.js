'use client';

import { useAuth } from '../../context/AuthContext';

export default function LogoutButton() {
    const { logout } = useAuth();
    return (
        <button
            onClick={logout}
            className="absolute top-4 right-4 px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md text-sm"
        >
            Logout
        </button>
    );
}