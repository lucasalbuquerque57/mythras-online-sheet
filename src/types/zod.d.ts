import { ZodRawShape } from 'zod';

declare global {
    namespace Zod {
        export interface FormattedError<
            TInput extends ZodRawShape = ZodRawShape
        > {
            _path: (string | number)[];
            _errors: string[];
            // Recursive type for nested errors
            [key: string]: string[] | FormattedError | (string | number)[];
        }
    }
}