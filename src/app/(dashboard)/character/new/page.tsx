import { getServerSession } from "next-auth";
import CharacterForm from "@/components/character/characterForm";

export default async function CreateCharacter() {
    const session = await getServerSession();
    if (!session) return null; // Add loading state

    return (
        <div>
            <h1>Create Character</h1>
            <CharacterForm />
        </div>
    );
}