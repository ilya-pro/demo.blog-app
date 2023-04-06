import React, {Suspense,} from 'react';
import {Routes, Link, Route} from 'react-router-dom';
import './styles/index.scss';
import {AboutPage} from "pages/AboutPage";
import {MainPageAsync} from "pages/MainPage";
import {useTheme} from "app/providers/ThemeProvider";
import {classNames} from "shared/lib/classNames/classNames";

const App = () => {
    const {theme, toggleTheme} = useTheme();
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
                    <Route path="/about" element={<AboutPage/>}>
                    </Route>
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;
