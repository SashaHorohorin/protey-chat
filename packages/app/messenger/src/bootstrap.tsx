import {createRoot} from "react-dom/client";

import StoreAuth from "@/js/store/sroreAuth/storeAuth";
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {routers} from "@/js/view/app/routers/routers";



const root = document.getElementById('root')

if(!root){
    throw new Error('root not found')
}


export const storeAuth = new StoreAuth()

const container = createRoot(root);


container.render(<RouterProvider router={routers} />)