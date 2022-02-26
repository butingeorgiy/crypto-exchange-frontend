import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';

// Layouts
import MainLayout from '../../layouts/Main';

// Components
import Navbar from '../../components/profile/Navbar';
import ProfileCard from '../../components/profile/ProfileCard';
import VerificationForm from '../../components/profile/Verification';

class Verification extends Component {
    render () {
        return (
            <MainLayout>
                <div className="tw-container tw-min-h-screen-without-header-and-footer tw-mx-auto tw-px-5 tw-py-10">
                    <div className="tw-grid tw-grid-cols-10 tw-gap-5">
                        <div className="tw-col-span-2">
                            <Navbar />
                        </div>

                        <div className="tw-col-span-6">
                            <VerificationForm />
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

const mapStateToProps = ({ user }) => ({
    isVerified: user.user?.['is_verified']
});

export default connect(mapStateToProps)(Verification);