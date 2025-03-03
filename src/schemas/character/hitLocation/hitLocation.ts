// schemas/character/hitLocation/hitLocation.ts
import { z } from 'zod';
import { changeLogSchema } from './changeLog';

export const hitLocationSchema = z.object({
    location: z.enum([
        'Head', 'Thorax', 'Abdomen',
        'Right Arm', 'Left Arm',
        'Right Leg', 'Left Leg',
        'Tail',
    ]),
    armor: z.string().optional(),
    hp: z.number().min(0).max(100),
    hpHistory: z.array(changeLogSchema),
    ap: z.number().min(0).max(50),
    apHistory: z.array(changeLogSchema),
});