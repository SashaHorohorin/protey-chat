import {createRoot} from "react-dom/client";
import Application from "./js/view/Application";

const root = document.getElementById('root')

if(!root){
    throw new Error('root not found')
}


const container = createRoot(root);


container.render(<Application/>)