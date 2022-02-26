import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import RateItem from './RateItem';
import { Swiper, SwiperSlide } from 'swiper/react';

class Dashboard extends Component {
    render() {
        const rateItems = this.props.items.map(item => (
            <SwiperSlide key={item.id}>
                <RateItem data={item} />
            </SwiperSlide>
        ));

        return (
            <div className="tw-py-10">
                <div className="tw-container tw-mx-auto tw-px-5">
                    <h3 className="tw-mb-4 tw-text-lg tw-text-white">Курс валют</h3>

                    <Swiper spaceBetween={20} slidesPerView={5}>{ rateItems }</Swiper>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    items: PropTypes.array
};

export default Dashboard;