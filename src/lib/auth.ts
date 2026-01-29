import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: 'Admin Login',
            credentials: {
                email: { label: 'E-Mail', type: 'email' },
                password: { label: 'Passwort', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const adminEmail = process.env.ADMIN_EMAIL;
                const adminPassword = process.env.ADMIN_PASSWORD;

                if (!adminEmail || !adminPassword) {
                    console.error('Admin credentials not configured');
                    return null;
                }

                // Check email
                if (credentials.email !== adminEmail) {
                    return null;
                }

                // Check password (in production, use hashed password)
                // For initial setup, we compare directly
                // Later, you should hash the password in .env
                const isValidPassword = credentials.password === adminPassword ||
                    (await bcrypt.compare(credentials.password as string, adminPassword));

                if (!isValidPassword) {
                    return null;
                }

                return {
                    id: '1',
                    email: adminEmail,
                    name: 'Admin',
                };
            },
        }),
    ],
    pages: {
        signIn: '/admin/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    session: {
        strategy: 'jwt',
    },
});
