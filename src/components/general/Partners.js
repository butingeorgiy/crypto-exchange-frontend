import React, { Component } from 'react';

// Styles
import 'swiper/css';

// Components
import { Swiper, SwiperSlide } from 'swiper/react';

class Partners extends Component {
    render() {
        return (
            <div className="tw-container tw-mx-auto tw-px-5 tw-py-10">
                <Swiper spaceBetween={50} slidesPerView={6} loop>
                    <SwiperSlide>
                        <img src={'/images/partners/coinbase.svg'} alt="Coinbase Partner Logo" />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img src={'/images/partners/nasa.svg'} alt="Nasa Partner Logo" />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img src={'/images/partners/netflix.svg'} alt="Netflix Partner Logo" />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img src={'/images/partners/pinterest.svg'} alt="Pinterest Partner Logo" />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img src={'/images/partners/spotify.svg'} alt="Spotify Partner Logo" />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img src={'/images/partners/vodafone.svg'} alt="Vodafone Partner Logo" />
                    </SwiperSlide>
                </Swiper>
            </div>
        );
    }
}

export default Partners;