import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';

export const AppRouter = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>

            {Object.entries(routeConfig).map(([key, { path, element }]) => (
                // console.log('it',key, path, element);
                <Route
                    key={key}
                    path={path}
                    element={(
                        <div className="page-wrapper">
                            {element}
                        </div>
                    )}
                />
            ))}
            {/* <Route path="/" element={<MainPageAsync/>}>
                </Route>
                <Route path="/about" element={<AboutPage/>}>
                </Route> */}
        </Routes>
    </Suspense>
);

export default AppRouter;
