import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RateItem extends Component {
    render() {
        const { cardColor, entity } = this.props.data;

        return (
            <div className="tw-flex tw-flex-col tw-px-5 tw-py-3 tw-bg-cover tw-bg-no-repeat tw-bg-center tw-rounded-lg"
                 style={{ backgroundImage: `url(./images/rate-cards-bg/${cardColor}.png)` }}>
                <div className="tw-flex tw-items-center tw-mb-4">
                    <div className="tw-w-12 tw-h-12 tw-mr-3 tw-bg-cover tw-bg-no-repeat tw-rounded-full"
                         style={{ backgroundImage: `url(${entity.icon})` }} />

                    <div className="tw-flex tw-flex-col">
                        <p className="tw-text-white tw-font-medium">{ entity.name }</p>

                        <p className="tw-text-xs tw-text-white tw-text-opacity-60 tw-font-light">{ entity.alias }</p>
                    </div>
                </div>

                <div className="tw-flex tw-justify-between tw-mt-auto">
                    <p className="tw-text-white tw-leading-5">{ entity.cost }</p>

                    <div className="tw-flex tw-items-center">
                        <img className="tw-w-2 tw-mr-1" src={`./images/icons/arrow-up-green.svg`} alt="Arrow Icon" />
                        <span className="tw-text-sm tw-text-green">0.43%</span>
                    </div>
                </div>
            </div>
        );
    }
}

RateItem.propTypes = {
    data: PropTypes.object
};

export default RateItem;