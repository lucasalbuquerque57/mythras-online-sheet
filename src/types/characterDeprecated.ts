// types/character.ts

/* Characteristics (STR, CON, etc.) */
type Characteristic = {
    base: number,
    current: number
}

/* Attributes (Action Points, Damage Modifier, etc.) */
type Attribute = {
    base: number | string, // Some attributes have string values like "1d4"
    current: number | string
}

/* Base Skill Type */
type BaseSkill = {
    baseValue: number,
    currentProficiency: number,
    isProficient: boolean,
    isFumbled: boolean,
    specialties?: string[]
}

/* Skill Category Types */
type StandardSkill = BaseSkill & {
    name: string,
    type: 'standard',
    specialties?: never // Disallow specialties for standard skills
}

type ProfessionalSkill = BaseSkill & {
    name: string,
    type: 'professional',
    specialization: string // Required for professional skills
}

type MagicSkill = BaseSkill & {
    name: string,
    type: 'magic',
    spellType: 'theism' | 'sorcery' | 'folk-magic' | 'animism' | 'mysticism'
}

type Skill = StandardSkill | ProfessionalSkill | MagicSkill

/* Passions */
type Passion = {
    name: string,
    relationship: string,
    value: number
}

/* Languages */
type Language = {
    name: string,
    proficiency: number
}

/* Hit Locations */
type HitLocation = {
    location: string,
    currentHitPoints: number,
    hitPoints: number,
    armorPoints: number,
    armor?: string
}

/*
    divider because I'm fucking blind
*/

export type Character = {
    // Core Info
    id: string
    personal: {
        //main
        name: string,
        player: string,
        nickname: string,
        age: number,
        gender: string,
        //communal
        species: string,
        culture: string,
        homeland: string,
        religion: string,
        deity: string,
        socialClass: string,
        lord: string,
        //life choices
        career: string,
        faction: string,
        //physical
        handedness: string,
        frame: string,
        height: string,
        weight: string
    }

    // Game Mechanics
    characteristics: {
        strength: Characteristic,
        constitution: Characteristic,
        size: Characteristic,
        dexterity: Characteristic,
        intelligence: Characteristic,
        power: Characteristic,
        charisma: Characteristic,
    }
    attributes: {
        actionPoints: Attribute
        damageModifier: Attribute
        expModifier: Attribute,
        healingRate: Attribute,
        intiativeBonus: Attribute,
        luckPoints: Attribute,
        movementRate: Attribute
    }

    // Skills
    skills: {
        standard: StandardSkill[]
        professional: ProfessionalSkill[]
        magic: MagicSkill[]
    }

    // Additional Systems
    passions: Passion[]
    languages: Language[]
    hitLocations: HitLocation[]

    // Administrative
    version: number // For data migration tracking
}