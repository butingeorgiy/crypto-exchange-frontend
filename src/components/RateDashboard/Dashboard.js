import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import RateItem from './RateItem';

class Dashboard extends Component {
    render() {
        const rateItems = this.props.items.map(item => <RateItem key={item.id} data={item} />);

        return (
            <div className="tw-py-10">
                <div className="tw-container tw-mx-auto">
                    <h3 className="tw-mb-4 tw-text-lg tw-text-white">Курс валют</h3>

                    <div className="tw-grid tw-grid-cols-5 tw-gap-5">{ rateItems }</div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    items: PropTypes.array
};

export default Dashboard;