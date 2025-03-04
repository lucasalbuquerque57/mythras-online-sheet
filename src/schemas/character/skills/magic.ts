// schemas/character/skills/magic.ts
import { z } from 'zod';
import { baseSkillSchema } from './base';
import {magicSkillKeys} from "@/schemas/character/constants";

export const magicSkillSchema = baseSkillSchema.extend({
    name: z.enum(magicSkillKeys),
    type: z.literal('magic'),
    spellType: z.enum(['Theism', 'Sorcery', 'Folk Magic', 'Mysticism', 'Animism']),
});