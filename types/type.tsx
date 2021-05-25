export interface BaseModel {
    id: string;
}

export type KeyOf<T> = keyof T;
export type KeysOf<T> = KeyOf<T>[];

export interface GQLVar {
    cursor: string;
    where?: WhereConditions;
}

export type Edge<T> = {
    __typename?: string;
    node?: Maybe<T>;
    cursor: Scalars['String'];
};

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    DateTime: any;
    Mixed: any;
    Date: any;
};

export type Query = {
    __typename?: 'Query';
    user?: Maybe<User>;
    users?: Maybe<UserConnection>;
    lecturers?: Maybe<LecturerConnection>;
};

export type QueryUserArgs = {
    id?: Maybe<Scalars['ID']>;
};

export type QueryUsersArgs = {
    first: Scalars['Int'];
    after?: Maybe<Scalars['String']>;
};

export type QueryLecturersArgs = {
    where?: Maybe<QueryLecturersWhereWhereConditions>;
    first: Scalars['Int'];
    after?: Maybe<Scalars['String']>;
};

export type User = {
    __typename?: 'User';
    id: Scalars['ID'];
    name: Scalars['String'];
    email: Scalars['String'];
    created_at: Scalars['DateTime'];
    updated_at: Scalars['DateTime'];
};

export type UserConnection = {
    __typename?: 'UserConnection';
    pageInfo: PageInfo;
    edges?: Maybe<Array<Maybe<UserEdge>>>;
};

export type PageInfo = {
    __typename?: 'PageInfo';
    hasNextPage: Scalars['Boolean'];
    hasPreviousPage: Scalars['Boolean'];
    startCursor?: Maybe<Scalars['String']>;
    endCursor?: Maybe<Scalars['String']>;
    total?: Maybe<Scalars['Int']>;
    count?: Maybe<Scalars['Int']>;
    currentPage?: Maybe<Scalars['Int']>;
    lastPage?: Maybe<Scalars['Int']>;
};

export type UserEdge = {
    __typename?: 'UserEdge';
    node?: Maybe<User>;
    cursor: Scalars['String'];
};

export type QueryLecturersWhereWhereConditions = {
    column?: Maybe<QueryLecturersWhereColumn>;
    operator?: Maybe<SqlOperator>;
    value?: Maybe<Scalars['Mixed']>;
    AND?: Maybe<Array<QueryLecturersWhereWhereConditions>>;
    OR?: Maybe<Array<QueryLecturersWhereWhereConditions>>;
    HAS?: Maybe<QueryLecturersWhereWhereConditionsRelation>;
};

export enum QueryLecturersWhereColumn {
    Name = 'NAME',
    ID = 'I_D',
    CreatedAt = 'CREATED_AT',
    UpdatedAt = 'UPDATED_AT',
    Nidn = 'NIDN',
    DoctorDegree = 'DOCTOR_DEGREE',
    MagisterDegree = 'MAGISTER_DEGREE',
    AcademicJob = 'ACADEMIC_JOB',
    Specialty = 'SPECIALTY',
    EducationCertificateInt = 'EDUCATION_CERTIFICATE__INT',
    IsPsCompetent = 'IS_PS_COMPETENT'
}

export enum SqlOperator {
    Eq = 'EQ',
    Neq = 'NEQ',
    Gt = 'GT',
    Gte = 'GTE',
    Lt = 'LT',
    Lte = 'LTE',
    Like = 'LIKE',
    NotLike = 'NOT_LIKE',
    In = 'IN',
    NotIn = 'NOT_IN',
    Between = 'BETWEEN',
    NotBetween = 'NOT_BETWEEN',
    IsNull = 'IS_NULL',
    IsNotNull = 'IS_NOT_NULL'
}

export type QueryLecturersWhereWhereConditionsRelation = {
    relation: Scalars['String'];
    operator?: Maybe<SqlOperator>;
    amount?: Maybe<Scalars['Int']>;
    condition?: Maybe<QueryLecturersWhereWhereConditions>;
};

export type LecturerConnection = {
    __typename?: 'LecturerConnection';
    pageInfo: PageInfo;
    edges?: Maybe<Array<Maybe<LecturerEdge>>>;
};

export type LecturerEdge = {
    __typename?: 'LecturerEdge';
    node?: Maybe<Lecturer>;
    cursor: Scalars['String'];
};

export type Lecturer = {
    __typename?: 'Lecturer';
    name?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    created_at: Scalars['DateTime'];
    updated_at: Scalars['DateTime'];
    nidn?: Maybe<Scalars['String']>;
    doctor_degree?: Maybe<Scalars['String']>;
    magister_degree?: Maybe<Scalars['String']>;
    academic_job?: Maybe<Scalars['String']>;
    specialty?: Maybe<Scalars['String']>;
    education_certificate_Int?: Maybe<Scalars['String']>;
    is_ps_competent?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
    __typename?: 'Mutation';
    createLecturer: Lecturer;
};

export type MutationCreateLecturerArgs = {
    input: CreateLecturerInput;
};

export type CreateLecturerInput = {
    name: Scalars['String'];
    nidn?: Maybe<Scalars['String']>;
    doctor_degree?: Maybe<Scalars['String']>;
    magister_degree?: Maybe<Scalars['String']>;
    specialty?: Maybe<Scalars['String']>;
    education_certificate_Int?: Maybe<Scalars['String']>;
    is_ps_competent?: Maybe<Scalars['Boolean']>;
};

export enum SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export type OrderByClause = {
    column: Scalars['String'];
    order: SortOrder;
};

export type PaginatorInfo = {
    __typename?: 'PaginatorInfo';
    count: Scalars['Int'];
    currentPage: Scalars['Int'];
    firstItem?: Maybe<Scalars['Int']>;
    hasMorePages: Scalars['Boolean'];
    lastItem?: Maybe<Scalars['Int']>;
    lastPage: Scalars['Int'];
    perPage: Scalars['Int'];
    total: Scalars['Int'];
};

export type SimplePaginatorInfo = {
    __typename?: 'SimplePaginatorInfo';
    count: Scalars['Int'];
    currentPage: Scalars['Int'];
    firstItem?: Maybe<Scalars['Int']>;
    lastItem?: Maybe<Scalars['Int']>;
    perPage: Scalars['Int'];
};

export enum Trashed {
    Only = 'ONLY',
    With = 'WITH',
    Without = 'WITHOUT'
}

export type WhereConditions = {
    column?: Maybe<Scalars['String']>;
    operator?: Maybe<SqlOperator>;
    value?: Maybe<Scalars['Mixed']>;
    AND?: Maybe<Array<WhereConditions>>;
    OR?: Maybe<Array<WhereConditions>>;
    HAS?: Maybe<WhereConditionsRelation>;
};

export type WhereConditionsRelation = {
    relation: Scalars['String'];
    operator?: Maybe<SqlOperator>;
    amount?: Maybe<Scalars['Int']>;
    condition?: Maybe<WhereConditions>;
};
