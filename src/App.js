import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Components
import ProtectedRoute from './ProtectedRoute';
import { Route, Routes } from 'react-router-dom';

// Pages
import IndexPage from './pages/Index';
import ProfilePage from './pages/profile/Index';
import SecureSettingsPage from './pages/profile/SecureSettings';
import VerificationPage from './pages/profile/Verification';
import TransferPage from './pages/Transfer';
import HelpPage from './pages/Help';
import ContactsPage from './pages/Contacts';
import ReviewsPage from './pages/Reviews';
import Error404 from './pages/errors/Error404';

class App extends Component {
    render() {
        let verificationRoute = '';

        if (this.props.isUserVerified === false) {
            verificationRoute = (
                <Route exact
                       path="/profile/verification"
                       element={<ProtectedRoute><VerificationPage /></ProtectedRoute>} />
            );
        }

        return (
            <Routes>
                <Route exact path="/" element={<IndexPage />} />

                <Route exact
                       path="/profile"
                       element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

                <Route exact
                       path="/profile/secure-settings"
                       element={<ProtectedRoute><SecureSettingsPage /></ProtectedRoute>} />

                {verificationRoute}

                <Route exact path="/transfer" element={<TransferPage />} />
                <Route exact path="/help" element={<HelpPage />} />
                <Route exact path="/contacts" element={<ContactsPage />} />
                <Route exact path="/reviews" element={<ReviewsPage />} />

                <Route path="*" element={<Error404 />} />
            </Routes>
        );
    }
}

App.propTypes = {
    isUserVerified: PropTypes.bool
};

const mapStateToProps = ({ user }) => ({
    isUserVerified: user.user ? user.user['is_verified'] : null
});

export default connect(mapStateToProps)(App);
