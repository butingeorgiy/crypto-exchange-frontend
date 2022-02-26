import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { openPopup } from './store/popups/actions';

// Components
import { Navigate } from 'react-router-dom';

class ProtectedRoute extends Component {
    render() {
        const { children, authenticated, openPopup } = this.props;

        if (authenticated !== true) {
            openPopup({
                popupType: 'login'
            });

            return <Navigate to="/" replace />;
        }

        return children;
    }
}

ProtectedRoute.propTypes = {
    roles: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    openPopup: PropTypes.func
};

const mapStateToProps = ({ user }) => ({
    authenticated: user.user !== null
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        openPopup
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);