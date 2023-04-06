import {lazy} from "react";

//const MainPageAsync = lazy(() => import('./MainPage'));
const MainPageAsync = lazy(() => new Promise(resolve => {
    setTimeout(() => {
        // @ts-ignore
        resolve(import('./MainPage'));
    }, 1500)
}));

export default MainPageAsync;
