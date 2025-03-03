import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/schemas/character';
import { standardSkillSchema } from '@/schemas/character/skills/standard';

interface CharacterFormProps {
    defaultValues?: typeof formSchema._output;
}

export default function CharacterForm({ defaultValues}: CharacterFormProps) {
    const router = useRouter();
    const { register, handleSubmit, formState, reset } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues || (router.query.id
            ? { id: router.query.id as string }
            : { userId: '' }),
    });

    const onSubmit = (data: typeof formSchema._output) => {
        // POST/PUT logic here
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Personal Info */}
            <div className="mb-4">
                <label>Name</label>
                <input {...register('personal.name')} />
                {formState.errors?.personal?.name?.message}
            </div>

            {/* Characteristics */}
            <div className="mb-4">
                <label>Strength</label>
                <input
                    type="number"
                    {...register('characteristics.strength.current')}
                />
                {formState.errors?.characteristics?.strength?.current?.message}
            </div>

            {/* Skills */}
            <div className="mb-4">
                <label>Standard Skills</label>
                {(formState.errors?.skills?.standard as
                        Zod.FormattedError<typeof standardSkillSchema.shape>[] | undefined
                )?.map((skillError, i) => (
                    <div key={i}>
                        <strong>{skillError._path?.join('.')}:</strong>
                        {skillError._errors.map((err: string, j: number) => (
                            <div key={j} className="text-red-500 text-sm">
                                {err}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <button type="submit">Save</button>
        </form>
    );
}