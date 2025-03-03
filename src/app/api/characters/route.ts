import { getServerSession } from "next-auth";
import { formSchema } from "@/schemas/character";
import { readFileSync, writeFileSync } from "fs";
import { nanoid } from "nanoid";
import path from "path";

const DATA_FILE = path.join(process.cwd(), 'src/lib/data/characters.json');

export async function POST(request: Request) {
    const session = await getServerSession();
    if (!session) return new Response('Unauthorized', { status: 401 });

    const data = await request.json();
    const validationResult = formSchema.safeParse(data);
    if (!validationResult.success) {
        return new Response(
            JSON.stringify(validationResult.error.format()),
            { status: 400 },
        );
    }

    const newCharacter = {
        ...validationResult.data,
        id: nanoid(), // Generate unique ID
        userId: session.user.id,
    };
    const existingData = JSON.parse(
        readFileSync(DATA_FILE, 'utf-8') || '[]',
    ) as typeof newCharacter[];

    existingData.push(newCharacter);
    writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2));

    return new Response('Character created', { status: 201 });
}

export async function GET(request: Request) {
    const session = await getServerSession();
    if (!session) return new Response('Unauthorized', { status: 401 });

    const data = JSON.parse(
        readFileSync(DATA_FILE, 'utf-8') || '[]',
    ) as { userId: string }[];

    const characters = data.filter(c => c.userId === session.user.id);
    return new Response(JSON.stringify(characters));
}