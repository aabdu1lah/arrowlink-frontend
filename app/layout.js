import { Inter } from 'next/font/google';
import { AuthProvider } from '../context/AuthContext';
import './globals.css';

// 1. Configure the font to use a CSS variable
const inter = Inter({
  subsets: ['latin'],
});

export const metadata = {
  title: 'ArrowLink',
  description: 'Archery Event Management',
};

// 2. Apply the variable to the <html> tag and the base classes to <body>
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}> 
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <AuthProvider>
          <div className="container mx-auto p-4">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}