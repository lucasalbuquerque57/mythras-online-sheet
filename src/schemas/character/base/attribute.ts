// schemas/character/base/attribute.ts
import { z } from 'zod';

export const attributeSchema = z.object({
    base: z.union([z.number(), z.string()]),
    current: z.union([z.number(), z.string()]),
});