import path from "path";
import { formSchema } from "@/schemas/character";
import {existsSync, readFileSync, writeFileSync} from "fs";

const DATA_FILE = path.join(process.cwd(), 'src/lib/data/characters.json');

export const getCharacters = async (userId?: string) => {
    const data = JSON.parse(
        readFileSync(DATA_FILE, 'utf-8') || '[]',
    ) as typeof formSchema._output[];

    return userId ? data.filter(c => c.userId === userId) : data;
};

export const saveCharacter = async (character: typeof formSchema._output) => {
    const existingData = JSON.parse(
        readFileSync(DATA_FILE, 'utf-8') || '[]',
    ) as typeof formSchema._output[];

    const newData = [...existingData, character];
    writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2));
};

export const updateCharacter = async (
    id: string,
    updatedCharacter: Partial<typeof formSchema._output>,
): Promise<boolean> => {
    let existingData: typeof formSchema._output[] = [];

    if (existsSync(DATA_FILE)) {
        const fileContent = readFileSync(DATA_FILE, 'utf-8');
        existingData = JSON.parse(fileContent);
    }

    const index = existingData.findIndex(c => c.id === id);
    if (index === -1) return false;

    existingData[index] = { ...existingData[index], ...updatedCharacter };
    writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2));
    return true;
};

export const deleteCharacter = async (id: string): Promise<boolean> => {
    let existingData: typeof formSchema._output[] = [];

    if (existsSync(DATA_FILE)) {
        const fileContent = readFileSync(DATA_FILE, 'utf-8');
        existingData = JSON.parse(fileContent);
    }

    const newData = existingData.filter(c => c.id !== id);
    if (newData.length === existingData.length) return false;

    writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2));
    return true;
};

// will add PUT/DELETE methods later