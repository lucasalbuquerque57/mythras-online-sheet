// src/lib/auth/auth.ts
import bcrypt from "bcryptjs";
import { readFileSync } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), 'src/lib/data/characters.json');

export interface User {
    id: string
    username: string
    password: string // hashed
    role: 'admin' | 'player'
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface StoredUser extends User {
    // Add any additional fields from your JSON storage if needed
    // This allows extending without modifying the core User interface
}
interface AuthUser extends User {
    password: string
}

export const verifyPassword = async (
    inputPassword: string,
    hashedPassword: string,
): Promise<boolean> => {
    return await bcrypt.compare(inputPassword, hashedPassword);
};

// In src/lib/auth/auth.ts
export const validateCredentials = async (
    credentials?: Record<string, string>,
): Promise<User | null> => {
    if (!credentials) return null;

    try {
        const users: StoredUser[] = JSON.parse(
            readFileSync(DATA_FILE, "utf-8"),
        ).filter((u: StoredUser) => u.role); // Ensure type-safe filter

        const user = users.find((u) => u.username === credentials.username);

        /*const user = users.find(u =>
            u.username === credentials.username
        )*/

        if (user && (await verifyPassword(credentials.password, user.password))) {
            return {
                id: user.id,
                username: user.username,
                role: user.role,
                password: user.password,
            } as AuthUser;
        }
    } catch (error) {
        console.error('Validation error:', error);
    }

    return null;
};