import React from 'react';
import {NextPage} from 'next';
import Error from 'next/error';
import {getDisplayName} from 'next-server/dist/lib/utils';
import {isLocale, Locale} from 'translations/types';
import LocaleProvider from 'components/providers/LocaleComponent';

export default (WrappedPage) => {
    const WithLocale = ({locale, ...pageProps}) => {
        return (locale)
            ? (
                <LocaleProvider lang={locale}>
                    <WrappedPage {...pageProps} />
                </LocaleProvider>
            )            // no valid locale detected
            : <Error statusCode={404} />;
        }
    };

    WithLocale.getInitialProps = async (ctx) => {
        // retrieve initial props of the wrapped component
        let pageProps = {};

        if (WrappedPage.getInitialProps) {
            pageProps = await WrappedPage.getInitialProps(ctx);
        }

        return (typeof ctx.query.lang !== 'string' || !isLocale(ctx.query.lang))
            // in case the value of 'lang' is not a valid locale return it as undefined
            ? {...pageProps, locale: undefined}
            // the locale is valid
            : {...pageProps, locale: ctx.query.lang};
    };

    // pretty display name for the debugger
    WithLocale.displayName = `withLocale(${getDisplayName(WrappedPage)})`;

    return WithLocale;
};
