// src/lib/auth/seedAdmin.ts
import { hashPassword } from "./index"
import { readFileSync, writeFileSync, existsSync } from "fs"
import path from "path"

const DATA_FILE = path.join(process.cwd(), 'src/lib/data/characters.json')

export const seedAdmin = async () => {
    try {
        // Read file if exists, otherwise create empty array
        interface StoredData {
            id: string
            username: string
            password: string
            role: 'admin' | 'player'
        }

        let existingData: StoredData[] = []

        if (existsSync(DATA_FILE)) {
            const fileContent = readFileSync(DATA_FILE, 'utf-8')
            existingData = JSON.parse(fileContent)
        }

        // Check if admin exists
        const adminExists = existingData.some(
            user => user.role === 'admin' && user.username === 'admin'
        )

        if (!adminExists) {
            // Create admin user
            const hashedPassword = await hashPassword("admin123");

            const adminUser = {
                id: 'admin-001',
                username: 'admin',
                password: hashedPassword,
                role: 'admin' as const,
                characters: []
            }

            // Update JSON file
            existingData.push(adminUser)
            writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2))
            console.log('Admin user seeded successfully')
        }
    } catch (error) {
        console.error('Error seeding admin:', error)
    }
}