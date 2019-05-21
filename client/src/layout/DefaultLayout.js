import React from 'react';
import PropTypes from 'prop-types';
import 'font-awesome/scss/font-awesome.scss';
import './DefaultLayout.scss';

function DefaultLayout(props) {
    return (
        <main role="main" className="flex-shrink-0 DefaultLayout" style={{ backgroundImage: 'url("./asset/img/bkg3.jpg")' }}>
            <div className="overlay"></div>
            {props.children}
        </main>
    )
}

/* propTypes =============================================================== */
DefaultLayout.propTypes = {
    children:PropTypes.node.isRequired
}

export default DefaultLayout;