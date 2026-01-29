import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    // Allow access to login page without authentication
    // The actual page components will check authentication

    return (
        <div className="min-h-screen bg-[#0F0A1A]">
            {children}
        </div>
    );
}
