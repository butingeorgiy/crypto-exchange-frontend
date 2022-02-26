import React, { Component } from 'react';

// Layouts
import MainLayout from '../../layouts/Main';

// Components
import Navbar from '../../components/profile/Navbar';
import ProfileCard from '../../components/profile/ProfileCard';
import SecureSettingsForm from '../../components/profile/secureSettings/SecureSettings';

class SecureSettings extends Component {
    render() {
        return (
            <MainLayout>
                <div className="tw-container tw-min-h-screen-without-header-and-footer tw-mx-auto tw-px-5 tw-py-10">
                    <div className="tw-grid tw-grid-cols-10 tw-gap-5">
                        <div className="tw-col-span-2">
                            <Navbar />
                        </div>

                        <div className="tw-col-span-6">
                            <SecureSettingsForm />
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

export default SecureSettings;