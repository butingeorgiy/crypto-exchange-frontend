import React, { Component } from 'react';

class BusinessNumbers extends Component {
    render() {
        return (
            <div className="tw-container tw-mx-auto tw-px-20 tw-py-10">
                <div className="tw-grid tw-grid-cols-3 tw-gap-10">
                    <div className="tw-flex tw-flex-col tw-items-center">
                        <p className="tw-mb-4 tw-text-5xl tw-text-white tw-font-semibold">5 234</p>

                        <p className="tw-mb-1 tw-text-blue">Клиентов ежедневно</p>

                        <p className="tw-text-center tw-text-gray-medium tw-text-opacity-80 tw-leading-5">
                            Каждый день к нам обращаются более 5 000 клиентов
                        </p>
                    </div>

                    <div className="tw-flex tw-flex-col tw-items-center">
                        <p className="tw-mb-4 tw-text-5xl tw-text-white tw-font-semibold">3 400+</p>

                        <p className="tw-mb-1 tw-text-blue">Транзакций</p>

                        <p className="tw-text-center tw-text-gray-medium tw-text-opacity-80 tw-leading-5">
                            За всё время было переведено более стольки раз
                        </p>
                    </div>

                    <div className="tw-flex tw-flex-col tw-items-center">
                        <p className="tw-mb-4 tw-text-5xl tw-text-white tw-font-semibold">24/7</p>

                        <p className="tw-mb-1 tw-text-blue">Поддержка</p>

                        <p className="tw-text-center tw-text-gray-medium tw-text-opacity-80 tw-leading-5">
                            Поддержка пользователей осуществляется 24 часа в сутки
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default BusinessNumbers;