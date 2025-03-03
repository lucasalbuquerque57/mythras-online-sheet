// schemas/character/skills/standard.ts
import { z } from 'zod';
import { baseSkillSchema } from './base';

export const standardSkillSchema = baseSkillSchema.extend({
    name: z.string().min(3),
    type: z.literal('standard'),
    specialties: z.array(z.string()).optional(),
});