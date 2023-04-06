import React from 'react';
import {useTheme} from "app/providers/ThemeProvider";

const AboutPage = () => {
    const {theme} = useTheme();
    return (
        <div>
            О компании About  ({theme})
        </div>
    );
};

export default AboutPage;
