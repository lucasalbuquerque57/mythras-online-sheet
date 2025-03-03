import { readFileSync, writeFileSync } from 'fs'
import { formSchema } from '@/schemas/character/character'
import type { Character } from '@/types/auto-generated'

const DATA_FILE = 'src/lib/data/characters.json'

export const getCharacters = (userId?: string): Character[] => {
    const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
    return userId ? data.filter(c => c.userId === userId) : data
}

export const saveCharacter = (character: Character) => {
    const data = getCharacters()
    data.push(character)
    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
}