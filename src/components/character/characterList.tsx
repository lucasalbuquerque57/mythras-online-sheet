// src/components/character/CharacterList.tsx
import { useState } from 'react';
import Link from 'next/link';
import { formSchema } from "@/schemas/character";

type Props = {
    characters: typeof formSchema._output[]; // Explicit prop type
}

export default function CharacterList({ characters }: Props) {
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            await fetch(`/api/characters/${id}`, { method: 'DELETE' });
            window.location.reload();
        } catch (error) {
            console.error(error);
            setDeletingId(null);
        }
    };

    return (
        <div>
            {characters.map((char: typeof formSchema._output) => (
                <div key={char.id} className="border p-4 mb-2">
                    <h3>{char.personal.name}</h3>
                    <Link href={`/dashboard/character/${char.id}`}>
                        <button>Edit</button>
                    </Link>
                    <button
                        onClick={() => handleDelete(char.id)}
                        disabled={deletingId === char.id}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}