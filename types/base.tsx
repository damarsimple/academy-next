import { StringMap } from '../components/Form';
import { FormAttribute, KeyOf } from './type';

export const BASE_MODEL_ATTRIBUTE: Array<FormAttribute> = [
    {
        name: 'id',
        formatted_name: 'ID',
        disabled: true
    },
    {
        name: 'created_at',
        formatted_name: 'Diubah Pada',
        disabled: true
    },
    {
        name: 'updated_at',
        formatted_name: 'Dibuat Pada',
        disabled: true
    }
];

export const BASE_FORMATTED_LECTURER_ATTRIBUTE = [
    {
        name: 'name',
        formatted_name: 'Nama',
        required: true
    },
    {
        name: 'nidn',
        formatted_name: 'NIDN',
        required: true
    },
    {
        name: 'doctor_degree',
        formatted_name: 'Gelar S2'
    },
    {
        name: 'magister_degree',
        formatted_name: 'Gelar S3'
    },
    {
        name: 'specialty',
        formatted_name: 'Keahlian Khusus'
    },
    {
        name: 'education_certificate_number',
        formatted_name: 'Nomor Sertifikasi Pendidikan'
    },
    {
        name: 'academic_job',
        formatted_name: 'academic_job'
    },
    {
        name: 'is_ps_competent',
        formatted_name: 'Kompetensi dengan Inti PS',
        type: 'checkbox'
    }
];

export const reduceToObject = (array: Array<FormAttribute>, by: KeyOf<FormAttribute>) =>
    array.reduce((obj: StringMap, item) => {
        obj[item.name] = item[by];
        return obj;
    }, {});

export const lecturerNameMap = reduceToObject(BASE_FORMATTED_LECTURER_ATTRIBUTE, 'formatted_name');
export const lecturerTypeMap = reduceToObject(BASE_FORMATTED_LECTURER_ATTRIBUTE, 'type');
export const lecturerRequiredMap = reduceToObject(BASE_FORMATTED_LECTURER_ATTRIBUTE, 'required');
