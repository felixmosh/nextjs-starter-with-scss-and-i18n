import React from 'react';
import PropTypes from 'prop-types';

import {withTranslation} from '../i18n';

const Error = ({statusCode, t}) => (
    <p className="page-error">
        {statusCode ? t('errorWithStatus', {statusCode}) : t('errorWithoutStatus')}
    </p>
);

Error.getInitialProps = async ({res, err}) => {
    let statusCode = null;

    if (res) {
        ({statusCode} = res);
    } else if (err) {
        ({statusCode} = err);
    }
    return {
        namespacesRequired: ['error'],
        statusCode,
    };
};

Error.defaultProps = {
    statusCode: null,
};

Error.propTypes = {
    statusCode: PropTypes.number,
    t: PropTypes.func.isRequired,
};

export default withTranslation('error')(Error);
