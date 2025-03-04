// schemas/character/skills/professional.ts
import { z } from 'zod';
import { baseSkillSchema } from './base';
import { professionalSkillKeys, professionalSkillAnyKeys } from '../constants';

export const professionalSkillSchema = baseSkillSchema.extend({
  category: z.union([
    z.enum([...professionalSkillKeys, ...professionalSkillAnyKeys]),
    z.string().min(3),
  ]),
  type: z.literal('professional'),
  specialization: z.string().min(3).optional(),
});


/*export const professionalSkillSchema = baseSkillSchema.extend({
    name: z.union([
        z.enum(professionalSkillKeys),
        z.string().refine(
            (value) =>
                professionalSkillAnyKeys.some(skill => value === `${skill} (any)`),
            'Invalid specialization',
        ),
    ]),
    type: z.literal('professional'),
    specialization: z.string().min(3).optional(),
});*/

/*
export const professionalSkillSchema = baseSkillSchema.extend({
    name: z.enum(professionalSkillKeys),
    type: z.literal('professional'),
    specialization: z.string().min(3),
});*/