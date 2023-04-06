import React from 'react';
import {useTheme} from "../../theme/useTheme";

const AboutPage = () => {
    const {theme} = useTheme();
    return (
        <div>
            О компании About  ({theme})
        </div>
    );
};

export default AboutPage;
