import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Header from '../components/general/Header';
import Footer from '../components/general/Footer';
import Announcement from '../components/general/Announcement';

class Main extends Component {
    render() {
        const { children, notifications = [], footerEnabled = true } = this.props;

        const announcements = notifications.map(({ text, link = ''}, index) => {
            return <Announcement key={index} text={text} link={link} />;
        });

        return (
            <div className="main-layout-bg">
                <div className="tw-bg-no-repeat tw-bg-center" style={{ backgroundImage: 'url(./images/main-layout-bg.png)'}}>
                    <Header />
                    { announcements }
                    { children }
                    { footerEnabled ? <Footer /> : null }
                </div>
            </div>
        );
    }
}

Main.propTypes = {
    footerEnabled: PropTypes.bool,
    notifications: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        link: PropTypes.string
    }))
};

export default Main;