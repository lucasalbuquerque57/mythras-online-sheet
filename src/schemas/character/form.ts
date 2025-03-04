// schemas/character/form.ts
import { z } from 'zod';
import { characteristicSchema} from './base/characteristic';
import { attributeSchema} from './base/attribute';
import { standardSkillSchema} from './skills/standard';
import { professionalSkillSchema } from './skills/professional';
import { magicSkillSchema } from './skills/magic';
import { hitLocationSchema} from './hitLocation/hitLocation';

//main schema, big ass schema, if I don't separate it I will get lost
export const formSchema = z.object({
    id: z.string(),
    userId: z.string(),
    personal: z.object({
        //main
        name: z.string().min(3).max(40),
        player: z.string().min(3).max(40),
        nickname: z.string().max(40),
        age: z.number().min(1).max(350),
        gender: z.string().min(1).max(11),
        //communal
        species: z.string().min(3).max(20),
        culture: z.string().min(3).max(20),
        homeland: z.string().min(3).max(20),
        religion: z.string().min(3).max(20),
        deity: z.string().min(3).max(25).optional(),
        socialClass: z.string().max(15),
        lord: z.string().min(3).max(30).optional(),
        //life choices
        career: z.string().min(3).max(20),
        faction: z.string().min(3).max(20).optional(),
        //physical
        handedness: z.string().max(10),
        frame: z.string().min(3).max(10),
        height: z.string().min(3).max(5),
        weight: z.string().min(3).max(5),
    }),
    characteristics: z.object({
        strength: characteristicSchema,
        constitution: characteristicSchema,
        size: characteristicSchema,
        dexterity: characteristicSchema,
        intelligence: characteristicSchema,
        power: characteristicSchema,
        charisma: characteristicSchema,
    }),
    attributes: z.object({
        actionPoints: attributeSchema,
        damageModifier: attributeSchema,
        expModifier: attributeSchema,
        healingRate: attributeSchema,
        initiativeBonus: attributeSchema,
        luckPoints: attributeSchema,
        movementRate: attributeSchema,
    }),
    skills: z.object({
        standard: z.array(standardSkillSchema),
        professional: z.array(professionalSkillSchema),
        magic: z.array(magicSkillSchema),
    }),
    passions: z.array(z.object({
        name: z.string().min(3),
        relationship: z.string().min(3),
        value: z.number().min(1).max(100),
    })),
    languages: z.array(z.object({
        name: z.string().min(3),
        proficiency: z.number().min(1).max(100),
    })),
    hitLocations: z.array(
        hitLocationSchema,
    ),
});

export type CharacterFormValues = z.infer<typeof formSchema>;