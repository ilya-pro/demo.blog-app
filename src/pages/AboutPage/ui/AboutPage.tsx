import React from 'react';
import {useTheme} from "app/providers/ThemeProvider";
import {useTranslation} from "react-i18next";

const AboutPage = () => {
    const {theme} = useTheme();
    const {t} = useTranslation('about');

    return (
        <div>
            {t('О компании')} ({theme})
        </div>
    );
};

export default AboutPage;
