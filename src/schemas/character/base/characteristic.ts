// schemas/character/base/characteristic.ts
import { z } from 'zod';

export const characteristicSchema = z.object({
    base: z.number().min(1).max(40),
    current: z.number().min(0).max(200),
});