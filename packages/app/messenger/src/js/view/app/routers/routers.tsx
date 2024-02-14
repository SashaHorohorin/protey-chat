import {createBrowserRouter} from "react-router-dom";
// @ts-ignore
import ApplicationChat from 'chat/view';
import Authorization from "@/js/view/app/pages/Authorization/Authorization";
import Application from "../../Application";

export const routers = createBrowserRouter([
    {
        path: '/',
        element: <Application/>,
        children: [
            {
                path: '/auth/:sign',
                element: <Authorization/>,
            },
            {
                path: '/chat',
                element: <ApplicationChat/>
            }
        ]
    },
])