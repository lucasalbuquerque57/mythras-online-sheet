// schemas/character/skills/standard.ts
import { z } from 'zod';
import { baseSkillSchema } from './base';
import {standardSkillKeys} from "../constants";

export const standardSkillSchema = baseSkillSchema.extend({
    name: z.enum(standardSkillKeys),
    type: z.literal('standard'),
});