import {z} from "zod";

const changeLogSchema = z.object({
    value: z.number(),
    timestamp: z.date(),
    reason: z.string().min(3)
})

export const characteristicSchema = z.object({
    base: z.number().min(1).max(40),
    current: z.number().min(0).max(200)
})

export const attributeSchema = z.object({
    base: z.union([z.number(), z.string()]),
    current: z.union([z.number(), z.string()])
})

export const baseSkillSchema = z.object({
    baseValue: z.number().min(0).max(100),
    currentProficiency: z.number().min(0).max(200),
    isProficient: z.boolean(),
    isFumbled: z.boolean().default(false),
})

export const standardSkillSchema = baseSkillSchema.extend({
    name: z.string().min(3),
    type: z.literal('standard'),
    specialties: z.array(z.string()).optional()
})

export const professionalSkillSchema = baseSkillSchema.extend({
    name: z.string().min(3),
    type: z.literal('professional'),
    specialization: z.string().min(3) // Required
})

export const magicSkillSchema = baseSkillSchema.extend({
    name: z.string().min(3),
    type: z.literal('magic'),
    spellType: z.enum(['Divine', 'Sorcery', 'Folk'])
})

export const skillSchema = z.discriminatedUnion('type', [
    standardSkillSchema,
    professionalSkillSchema,
    magicSkillSchema
])

export const hitLocationSchema = z.object({
    location: z.enum([
        'Head', 'Thorax', 'Abdomen',
        'Right Arm', 'Left Arm',
        'Right Leg', 'Left Leg',
        'Tail'
    ]),
    armor: z.string().optional(),
    hp: z.number().min(0).max(100),
    hpHistory: z.array(changeLogSchema),
    ap: z.number().min(0).max(50),
    apHistory: z.array(changeLogSchema)
})


//main schema, big ass schema, if I don't separate it I will get lost
export const formSchema = z.object({
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
        weight: z.string().min(3).max(5)
    }),
    characteristics: z.object({
        strength: characteristicSchema,
        constitution: characteristicSchema,
        size: characteristicSchema,
        dexterity: characteristicSchema,
        intelligence: characteristicSchema,
        power: characteristicSchema,
        charisma: characteristicSchema
    }),
    attributes: z.object({
        actionPoints: attributeSchema,
        damageModifier: attributeSchema,
        expModifier: attributeSchema,
        healingRate: attributeSchema,
        initiativeBonus: attributeSchema,
        luckPoints: attributeSchema,
        movementRate: attributeSchema
    }),
    skills: z.object({
        standard: z.array(standardSkillSchema),
        professional: z.array(professionalSkillSchema),
        magic: z.array(magicSkillSchema)
    }),
    passions: z.array(z.object({
        name: z.string().min(3),
        relationship: z.string().min(3),
        value: z.number().min(1).max(100)
    })),
    languages: z.array(z.object({
        name: z.string().min(3),
        proficiency: z.number().min(1).max(100)
    })),
    hitLocations: z.array(
        hitLocationSchema
    )
})


/*const formSchema = z.object({
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
        //arbitrarily I chose max 40, this may need to change later
        strength: z.number().min(1).max(40),
        constitution: z.number().min(1).max(40),
        size: z.number().min(1).max(40),
        dexterity: z.number().min(1).max(40),
        intelligence: z.number().min(1).max(40),
        power: z.string().min(1).max(40),
        charisma: z.string().min(1).max(40),
    }),
    attributes: z.object({
        actionPoints: z.number().min(1).max(10),
        damageModifier: z.string().min(1).max(10),
        expModifier: z.number().min(-1).max(10),
        healingRate: z.number().min(1).max(10),
        initiativeBonus: z.number().min(-99).max(99),
        luckPoints: z.number().min(1).max(10),
        movementRate: z.string().max(3),
    }),
    standardSkills: z.array(
        z.object({
            name: z.string().min(3),
            baseValue: z.number().min(1).max(100),
            currentProficiency: z.number().min(0).max(200),
            isProficient: z.boolean(),
            isFumbled: z.boolean().default(false),
            specialties: z.array(z.string()).optional()
        })
    ),
    professionalSkills: z.array(
        z.object({
            name: z.string().min(3),
            baseValue: z.number().min(0).max(100),
            currentProficiency: z.number().min(0).max(200),
            isProficient: z.boolean(),
            isFumbled: z.boolean().default(false),
            specialties: z.array(z.string()).optional()
        })
    ),
    inventory: z.array(z.string())
})*/

