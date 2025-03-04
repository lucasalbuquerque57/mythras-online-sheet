import { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { formSchema } from '@/schemas/character/form';
import type { CharacterFormValues } from '@/schemas/character/form';
import {
    characteristicKeys,
    standardSkillKeys,
    professionalSkillKeys,
    professionalSkillAnyKeys,
    magicSkillKeys,
    hitLocationKeys,
} from '@/schemas/character/constants';
import { defaultEmptyValues } from '@/schemas/character/defaults';

interface CharacterFormProps {
    defaultValues?: Partial<CharacterFormValues>;
}

export default function CharacterForm({ defaultValues }: CharacterFormProps) {
    const router = useRouter();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CharacterFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultEmptyValues,
        mode: 'onBlur',
    });

    // Field arrays
    const { fields: standardSkills } = useFieldArray({
        control,
        name: 'skills.standard',
    });

    const {
        fields: professionalSkills,
        append: appendProfessionalSkill,
        remove: removeProfessionalSkill,
    } = useFieldArray({
        control,
        name: 'skills.professional',
    });

    appendProfessionalSkill({
        category: '',
        specialization: '',
        baseValue: 0,
        currentProficiency: 0,
        isProficient: false,
        type: 'professional',
        isFumbled: false,
    });

    /*const {
        fields: magicSkills,
        append: appendMagicSkill,
        remove: removeMagicSkill,
    } = useFieldArray({
        control,
        name: 'skills.magic',
    });*/

    const {
        fields: hitLocations,
        append: appendHitLocation,
    } = useFieldArray({
        control,
        name: 'hitLocations',
    });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    const onSubmit = async (data: CharacterFormValues) => {
        try {
            const method = defaultValues ? 'PUT' : 'POST';
            const url = defaultValues
                ? `/api/characters/${data.id}`
                : '/api/characters';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Failed to save character');

            toast.success('Character saved successfully!');
            router.push('/characters');
        } catch (error) {
            toast.error('Failed to save character');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-4">
            {/* Personal Information */}
            <section className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            {...register('personal.name')}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                        {errors.personal?.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.personal.name.message}
                            </p>
                        )}
                    </div>
                    {/* Add other personal fields similarly */}
                </div>
            </section>

            {/* Characteristics */}
            <section className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Characteristics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {characteristicKeys.map((char) => (
                        <div key={char} className="space-y-2">
                            <label className="block text-sm font-medium capitalize">
                                {char}
                            </label>
                            <div className="flex gap-2">
                                <input
                                    {...register(`characteristics.${char}.base`, {
                                        valueAsNumber: true,
                                    })}
                                    type="number"
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                                <input
                                    {...register(`characteristics.${char}.current`, {
                                        valueAsNumber: true,
                                    })}
                                    type="number"
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            {errors.characteristics?.[char] && (
                                <p className="text-red-500 text-sm">
                                    {errors.characteristics[char]?.current?.message}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills Section */}
            <section className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Skills</h2>

                {/* Standard Skills */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Standard Skills</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {standardSkills.map((skill, index) => (
                            <div key={skill.id} className="space-y-2">
                                <label className="block text-sm font-medium">
                                    {skill.name}
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        {...register(`skills.standard.${index}.baseValue`, {
                                            valueAsNumber: true,
                                        })}
                                        type="number"
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                    <input
                                        {...register(`skills.standard.${index}.currentProficiency`, {
                                            valueAsNumber: true,
                                        })}
                                        type="number"
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Professional Skills */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Professional Skills</h3>
                        <button
                            type="button"
                            onClick={() =>
                                appendProfessionalSkill({
                                    category: '', // Changed from 'name' to 'category'
                                    specialization: '',
                                    baseValue: 0,
                                    currentProficiency: 0,
                                    isProficient: false,
                                    isFumbled: false, // Add this if your base schema requires it
                                    type: 'professional',
                                })
                            }
                            className="btn-primary"
                        >
                            Add Professional Skill
                        </button>
                    </div>
                    {professionalSkills.map((skill, index) => (
                        <div key={skill.id} className="mb-4 p-3 bg-white rounded-md shadow-sm">
                            <div className="flex gap-2 items-start">
                                <div className="flex-1">
                                    <select
                                        {...register(`skills.professional.${index}.category`)}
                                        className="w-full px-3 py-2 border rounded-md mb-2"
                                    >
                                        <option value="">Select Category</option>
                                        {[...professionalSkillKeys, ...professionalSkillAnyKeys].map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        {...register(`skills.professional.${index}.specialization`)}
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="Specialization (if required)"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeProfessionalSkill(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                            {errors.skills?.professional?.[index] && (
                                <>
                                    {errors.skills.professional[index]?.category?.message && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.skills.professional[index]?.category?.message}
                                        </p>
                                    )}
                                    {errors.skills.professional[index]?.specialization?.message && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.skills.professional[index]?.specialization?.message}
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* Magic Skills - Similar structure to professional skills */}
            </section>

            {/* Hit Locations */}
            <section className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Hit Locations</h2>
                {hitLocations.map((location, index) => (
                    <div key={location.id} className="mb-4 p-3 bg-white rounded-md shadow-sm">
                        <div className="grid grid-cols-2 gap-4">
                            <select
                                {...register(`hitLocations.${index}.location`)}
                                className="w-full px-3 py-2 border rounded-md"
                            >
                                {hitLocationKeys.map((loc) => (
                                    <option key={loc} value={loc}>
                                        {loc}
                                    </option>
                                ))}
                            </select>
                            <input
                                {...register(`hitLocations.${index}.hp`, { valueAsNumber: true })}
                                type="number"
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="HP"
                            />
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() =>
                        appendHitLocation({
                            location: 'Head',
                            hp: 0,
                            hpHistory: [],
                            ap: 0,
                            apHistory: [],
                            armor: '',
                        })
                    }
                    className="btn-primary mt-2"
                >
                    Add Hit Location
                </button>
            </section>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition"
            >
                Save Character
            </button>
        </form>
    );
}