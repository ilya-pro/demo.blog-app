import React, {Suspense,} from 'react';
import {Routes, Link, Route} from 'react-router-dom';
// import {Counter} from "./components/Counter";
import './styles/index.scss';
//import MainPage from "./pages/MainPage/MainPage";
//import AboutPage from "./pages/AboutPage/AboutPage";
import AboutPageAsync from "./pages/AboutPage/AboutPage.async";
import MainPageAsync from "./pages/MainPage/MainPage.async";
import {useTheme} from "./theme/useTheme";
import {classNames} from "./helpers/classNames/classNames";

const App = () => {
    const {theme, toggleTheme} = useTheme();
    //`app ${theme}`
    return (
        <div className={classNames('app', {}, [theme])}>
            Some text
            <button onClick={toggleTheme}>Toggle theme</button>
            <Link to="/">Главная</Link>
            <Link to="/about">О нас</Link>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<MainPageAsync/>}>
                    </Route>
                    <Route path="/about" element={<AboutPageAsync/>}>
                    </Route>
                </Routes>
            </Suspense>
            {/*<Counter/>*/}
        </div>
    );
};

export default App;
