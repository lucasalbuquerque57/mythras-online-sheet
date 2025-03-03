// schemas/character/skills/magic.ts
import { z } from 'zod';
import { baseSkillSchema } from './base';

export const magicSkillSchema = baseSkillSchema.extend({
    name: z.string().min(3),
    type: z.literal('magic'),
    spellType: z.enum(['Divine', 'Sorcery', 'Folk']),
});