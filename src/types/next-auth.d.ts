// src/types/next-auth.d.ts
import "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface User {
        id: string;
        role: "admin" | "player";
    }

    interface Session {
        user: {
            id: string;
            role: "admin" | "player";
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string;
        role: "admin" | "player";
    }
}