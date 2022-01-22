import React, { Component } from 'react';

// Components
import { Bars } from 'react-loader-spinner';

class GlobalLoader extends Component {
    render() {
        return (
            <div className="tw-w-screen tw-h-screen tw-flex tw-flex-col tw-justify-center tw-items-center tw-bg-blue-dark">
                <Bars wrapperClass="tw-mb-8" heigth="100" width="100" color="white" />

                <p className="tw-text-lg tw-text-white tw-font-light">Загрузка данных...</p>
            </div>
        );
    }
}

export default GlobalLoader;