import {DetailedHTMLProps, HTMLAttributes} from "react";

type Title = 'Регистрация' | 'Войти';
type NameButton = 'Зарегистрироваться' | 'Войти'
export interface AuthorizationFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    title: Title;
    nameButton: NameButton;
}