import { hashPassword } from "./index";
import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), 'src/lib/data/characters.json');

export const seedAdmin = async () => {
    try {
        interface StoredData {
            id: string;
            username: string;
            password: string;
            role: 'admin' | 'player';
            userId: string; // Ensure userId is part of the interface
            characters: string[]; // Adjust type as needed
        }

        let existingData: StoredData[] = [];

        if (existsSync(DATA_FILE)) {
            const fileContent = readFileSync(DATA_FILE, 'utf-8');
            existingData = JSON.parse(fileContent) as StoredData[];
        }

        // Check if admin exists
        const adminExists = existingData.some(
            (user) => user.role === 'admin' && user.username === 'admin',
        );

        if (!adminExists) {
            const hashedPassword = await hashPassword("admin123");
            const adminUser: StoredData = {
                id: 'admin-001',
                username: 'admin',
                password: hashedPassword,
                role: 'admin',
                userId: 'admin-001',
                characters: [],
            };

            existingData.push(adminUser);
            writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2));
            console.log('Admin user seeded successfully');
        }
    } catch (error) {
        console.error('Error seeding admin:', error);
    }
};