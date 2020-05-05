const NextI18Next = require('next-i18next').default;

const NextI18NextInstance = new NextI18Next({
    defaultLanguage: 'en',
    defaultNS: 'common',
    fallbackLng: 'en',
    ignoreRoutes: ['/_next/', '/static/', '/public/', '/api/'],
    otherLanguages: ['es'],
});
const {appWithTranslation, withTranslation, i18n} = NextI18NextInstance;

const initHMR = async () => {
    const {applyClientHMR} = require('i18next-hmr/client');

    await NextI18NextInstance.initPromise;
    applyClientHMR(i18n);
};

if (process.env.NODE_ENV !== 'production') {
    initHMR();
}

module.exports = NextI18NextInstance;

module.export = {appWithTranslation, withTranslation, i18n};
