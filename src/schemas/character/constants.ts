// schemas/character/constants.ts

export const characteristicKeys = [
    'strength', 'constitution', 'size',
    'dexterity', 'intelligence', 'power',
    'charisma',
] as const;

export const standardSkillKeys = [
    'Athletics', 'Boating', 'Brawn', 'Conceal', 'Customs',
    'Dance', 'Deceit', 'Drive', 'Endurance', 'Evade',
    'First Aid', 'Influence', 'Insight', 'Locale', 'Perception',
    'Ride', 'Sing', 'Stealth', 'Swim', 'Unarmed', 'Willpower',
] as const;

export const professionalSkillKeys = [
    'Acting', 'Acrobatics', 'Bureaucracy', 'Commerce',
    'Courtesy', 'Disguise', 'Engineering', 'Gambling',
    'Healing', 'Literacy', 'Lockpicking', 'Mechanisms',
    'Navigation', 'Oratory', 'Seamanship', 'Seduction',
    'Sleight', 'Streetwise', 'Survival', 'Teach', 'Track',
] as const;

export const professionalSkillAnyKeys = [
    'Art', 'Craft', 'Culture', 'Language', 'Lore',
] as const;

export type ProfessionalSkillAny = `${(typeof professionalSkillAnyKeys)[number]} (any)`;

export const magicSkillKeys = [
    'Binding', 'Devotion', 'Exhort', 'Folk Magic', 'Invocation',
    'Meditation', 'Mysticism', 'Shaping', 'Trance',
] as const;

export const hitLocationKeys = [
    'Head', 'Thorax', 'Abdomen',
    'Left Arm', 'Right Arm',
    'Left Leg', 'Right Leg', 'Tail',
] as const;