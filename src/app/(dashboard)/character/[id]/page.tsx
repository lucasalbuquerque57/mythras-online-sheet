// src/app/(dashboard)/character/[id]/page.tsx
import { getServerSession } from "next-auth";
import { getCharacters } from "@/lib/data/characterService";
import CharacterForm from "@/components/character/characterForm";

export default async function EditCharacter({ params }: { params: { id: string } }) {
    const session = await getServerSession();
    if (!session) return null;

    const character = await getCharacters(session.user.id).then(chars =>
        chars.find(c => c.id === params.id),
    );

    return (
        <div>
            <h1>Edit Character</h1>
            <CharacterForm defaultValues={character} /> {/* Safe to pass undefined */}
        </div>
    );
}