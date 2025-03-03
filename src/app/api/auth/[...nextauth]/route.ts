import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { validateCredentials } from "@/lib/auth/auth";
import { seedAdmin } from "@/lib/auth/seedAdmin";
import type { AuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";


seedAdmin().catch((error: Error) => {
    console.error("Seed failed:", error.message);
});

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "admin" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = await validateCredentials(credentials);
                if (!user) throw new Error("Invalid credentials");
                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({
                          session,
                          token,
                          newSession,
                          trigger,
                      }: {
            session: Session,
            token: JWT,
            newSession: Partial<Session>,
            trigger: "signIn" | "signUp" | "update"
        }) {
            session.user = {
                ...session.user,
                role: token.role,
                id: token.id,
            };
            return session;
        },
    },
};

export default NextAuth(authOptions);