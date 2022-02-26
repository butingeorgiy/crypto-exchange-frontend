import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { setUserData } from '../../store/user/actions';

// Layouts
import MainLayout from '../../layouts/Main';

// Components
import Navbar from '../../components/profile/Navbar';
import ProfileCard from '../../components/profile/ProfileCard';
import PersonalData from '../../components/profile/PersonalData';

class Index extends Component {
    render() {
        return (
            <MainLayout>
                <div className="tw-container tw-min-h-screen-without-header-and-footer tw-mx-auto tw-px-5 tw-py-10">
                    <div className="tw-grid tw-grid-cols-10 tw-gap-5">
                        <div className="tw-col-span-2">
                            <Navbar />
                        </div>

                        <div className="tw-col-span-6">
                            <PersonalData />
                        </div>

                        <div className="tw-col-span-2">
                            <ProfileCard />
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }
}

Index.propTypes = {
    user: PropTypes.object,
    setUserData: PropTypes.func
};

const mapStateToProps = ({ user }) => ({
    user: user.user
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setUserData
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Index);