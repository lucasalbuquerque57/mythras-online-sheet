import path from "path";
import { formSchema } from "@/schemas/character";
import { existsSync, readFileSync, writeFileSync } from "fs";

const DATA_FILE = path.join(process.cwd(), 'src/lib/data/characters.json');

export const getCharacters = async (userId?: string): Promise<typeof formSchema._output[]> => {
    let data: typeof formSchema._output[] = [];

    try {
        if (existsSync(DATA_FILE)) {
            const fileContent = readFileSync(DATA_FILE, 'utf-8');
            data = JSON.parse(fileContent);
        }
    } catch (error) {
        console.error("Error reading characters:", error);
        throw error;
    }

    return userId ? data.filter(c => c.userId === userId) : data;
};

export const saveCharacter = async (character: typeof formSchema._output) => {
    let existingData: typeof formSchema._output[] = [];

    try {
        if (existsSync(DATA_FILE)) {
            const fileContent = readFileSync(DATA_FILE, 'utf-8');
            existingData = JSON.parse(fileContent);
        }

        existingData.push(character);
        writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2));
    } catch (error) {
        console.error("Error saving character:", error);
        throw error;
    }
};

export const updateCharacter = async (
    id: string,
    updatedCharacter: Omit<typeof formSchema._output, 'id' | 'userId'>
): Promise<boolean> => {
    try {
        let existingData: typeof formSchema._output[] = [];

        if (existsSync(DATA_FILE)) {
            const fileContent = readFileSync(DATA_FILE, 'utf-8');
            existingData = JSON.parse(fileContent);
        }

        const index = existingData.findIndex(c => c.id === id);
        if (index === -1) return false;

        const validatedData = formSchema.safeParse({
            ...existingData[index],
            ...updatedCharacter,
        });

        if (!validatedData.success) {
            console.error("Validation failed:", validatedData.error);
            return false;
        }

        existingData[index] = validatedData.data;
        writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2));
        return true;
    } catch (error) {
        console.error("Update failed:", error);
        return false;
    }
};

export const deleteCharacter = async (id: string): Promise<boolean> => {
    try {
        let existingData: typeof formSchema._output[] = [];

        if (existsSync(DATA_FILE)) {
            const fileContent = readFileSync(DATA_FILE, 'utf-8');
            existingData = JSON.parse(fileContent);
        }

        const newData = existingData.filter(c => c.id !== id);
        if (newData.length === existingData.length) return false;

        writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2));
        return true;
    } catch (error) {
        console.error("Deletion failed:", error);
        return false;
    }
};