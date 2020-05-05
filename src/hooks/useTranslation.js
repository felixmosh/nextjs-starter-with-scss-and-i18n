import {useContext} from 'react';
import dynamic from 'next/dynamic';
import {get} from 'lodash';

import config from 'translations/config';
import {LocaleContext} from 'components/providers/LocaleProvider';
import {defaultLocale} from '../translations/config';

export default function useTranslation(ns) {
    const {locale} = useContext(LocaleContext);
    const currentLocale = config.locales.includes(locale) ? locale : config.defaultLocale;
    const strings = dynamic(() =>
        import(`../locales/${currentLocale}/${ns || 'common'}.json`)
    );

    function t(i18nKey) {
        if (!strings[currentLocale][i18nKey]) {
            console.warn(
                `Translation '${i18nKey}' for locale '${currentLocale}' not found.`
            );
        }

        return get(strings, [currentLocale, i18nKey], i18nKey);
    }

    return [t, locale];
}
