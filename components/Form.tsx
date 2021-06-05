import { FiPlus } from 'react-icons/fi';

export interface StringMap {
    [key: string]: number | boolean | string | undefined;
}

import React from 'react';
import { FormAttribute } from '../types/type';

export default function Form(props: {
    attributes: Array<FormAttribute>;
    handleChange: (by: StringMap) => void;
}): JSX.Element {
    const data: StringMap = {};
    return (
        <form
            className="p-4 grid grid-cols-2 gap-4"
            onSubmit={(e) => {
                e.preventDefault();
                console.log(data);
                props.handleChange(data);
            }}>
            {props.attributes.map((e, i) => (
                <div key={`${e.name}-${i}`} className="flex flex-col gap-4">
                    <label htmlFor="" className="text-lg font-semibold">
                        {e.formatted_name}{' '}
                        {e.required && <span className="text-red-600 text-md italic">*</span>}
                    </label>
                    <InputBox
                        handleChange={(x) => (data[e.name] = x)}
                        required={!!e.required}
                        type={e.type ?? 'text'}
                        defaultValue={e.defaultValue ?? ''}
                        disabled={!!e.disabled}
                    />
                </div>
            ))}
            <button className="col-span-2 w-full p-4 bg-green-500 hover:bg-green-600 shadow rounded flex justify-center text-white gap-4">
                <FiPlus size="1.5em" color="white" />
                SUBMIT
            </button>
        </form>
    );
}

const InputBox = (props: {
    handleChange: (e: string | number | boolean) => void;
    required?: boolean;
    type?: string;
    defaultValue?: string | number | boolean;
    disabled?: boolean;
}): JSX.Element => {
    switch (props.type) {
        case 'checkbox':
            return (
                <input
                    type="checkbox"
                    required={!!props.required}
                    defaultChecked={props.defaultValue as boolean}
                    onChange={(evt) => {
                        props.handleChange(evt.target.checked);
                    }}
                    disabled={!!props.disabled}
                />
            );
        case 'text':
        default:
            return (
                <input
                    type="text"
                    className="border-2 rounded p-4"
                    required={!!props.required}
                    defaultValue={props.defaultValue as string}
                    onChange={(evt) => {
                        props.handleChange(evt.target.value);
                    }}
                    disabled={!!props.disabled}
                />
            );
    }
};
