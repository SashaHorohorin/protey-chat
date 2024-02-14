import {DetailedHTMLProps, HTMLAttributes} from "react";


export interface CustomInputProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    type: 'text' | 'password';
    name: string;
    placeholder: string;
}