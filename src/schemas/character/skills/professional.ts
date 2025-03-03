// schemas/character/skills/professional.ts
import { z } from 'zod';
import { baseSkillSchema } from './base';

export const professionalSkillSchema = baseSkillSchema.extend({
    name: z.string().min(3),
    type: z.literal('professional'),
    specialization: z.string().min(3),
});