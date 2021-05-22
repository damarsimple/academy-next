export interface BaseModel {
    id: number;
}

export type KeyOf<T> = keyof T;
export type KeysOf<T> = KeyOf<T>[];

export interface GQLCursorVar {
    cursor: string;
}

export interface Lecturer extends BaseModel {
    name: string;
    nidn: number;
    doctorate: string;
    magistrate: string;
    specialty: string;
    is_conform_with_ps: boolean;
    academic_job: string;
    certificate_education: string;
    certificate_industry: string;
}
