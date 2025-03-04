import { z } from 'zod';
import { formSchema } from './form';
import { standardSkillKeys } from './constants';

export type CharacterFormValues = z.infer<typeof formSchema>;

export const defaultEmptyValues: CharacterFormValues = {
    id: '',
    userId: '',
    personal: {
        name: '',
        player: '',
        nickname: '',
        age: 18,
        gender: '',
        species: '',
        culture: '',
        homeland: '',
        religion: '',
        socialClass: '',
        career: '',
        handedness: 'right',
        frame: 'medium',
        height: '',
        weight: '',
        deity: undefined,
        lord: undefined,
        faction: undefined,
    },
    characteristics: {
        strength: { base: 10, current: 10 },
        constitution: { base: 10, current: 10 },
        size: { base: 10, current: 10 },
        dexterity: { base: 10, current: 10 },
        intelligence: { base: 10, current: 10 },
        power: { base: 10, current: 10 },
        charisma: { base: 10, current: 10 },
    },
    attributes: {
        actionPoints: { base: 0, current: 0 },
        damageModifier: { base: 0, current: 0 },
        expModifier: { base: 0, current: 0 },
        healingRate: { base: 0, current: 0 },
        initiativeBonus: { base: 0, current: 0 },
        luckPoints: { base: 0, current: 0 },
        movementRate: { base: 0, current: 0 },
    },
    skills: {
        standard: standardSkillKeys.map(name => ({
            name,
            baseValue: 0,
            currentProficiency: 0,
            isProficient: false,
            type: 'standard',
            isFumbled: false,
        })),
        professional: [],
        magic: [],
    },
    passions: [],
    languages: [],
    hitLocations: [],
};

// Optional: Helper type for components
export type CharacterFormDefaults = Partial<CharacterFormValues>;