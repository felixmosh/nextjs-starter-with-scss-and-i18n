import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';

import {withTranslation} from '../i18n';

import './index.scss';

function IndexPage({t}) {
    function handleActivate(event) {
        setActiveTab(event.detail.index);
    }

    // return <AllEvents className="home__events-list" />
    return (
        <section className="page-home">
            <h1>{t('home-headline')}</h1>
            <p>{t('home-content')}</p>
        </section>
    );
}

IndexPage.propTypes = {
    t: PropTypes.func.isRequired,
};

IndexPage.getInitialProps = async () => ({
    namespacesRequired: ['common'],
});

export default withTranslation('common')(IndexPage);
