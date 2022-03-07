import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Helpers
import { successPopup, errorToast } from '../../../helpers/swal.helper';

class TransactionCompeting extends Component {
    resolveExtraActions() {
        const { transactionType, options } = this.props;

        if (['crypto_to_crypto', 'crypto_to_e_money'].includes(transactionType)) {
            return (
                <div className="tw-flex tw-flex-col tw-items-center">
                    <p className="tw-mb-4 tw-text-sm tw-text-blue">
                        Переведите {options['transfer_amount']} на указанный кошелек: <span
                        className="tw-text-white tw-cursor-text tw-select-text">{options['wallet_address']}</span>
                    </p>

                    <button className="tw-flex tw-justify-center tw-items-center tw-px-5 tw-py-4
                                       tw-text-white tw-font-light tw-bg-blue tw-rounded-md"
                            onClick={async _ => {
                                await axios.post(options['next_step_url'])
                                    .then(_ => {
                                        successPopup('С вами скоро свяжется наш менеджер!')
                                            .then(_ => window.location.reload());
                                    })
                                    .catch(error => {
                                        errorToast(error.response?.data.message || error.message);
                                    });
                            }}>
                        Нажмите после перевода
                    </button>
                </div>
            );
        }

        return (
            <>
                <p className="tw-text-sm tw-text-blue">Обработка заявки занимает ~1 час.</p>
                <p className="tw-text-sm tw-text-blue">Пожалуйста подождите...</p>
            </>
        );
    }

    render() {
        return (
            <div className="tw-bg-blue-dark">
                <div className="tw-container tw-flex tw-flex-col tw-items-center tw-mx-auto tw-py-8 tw-px-5">
                    <p className="tw-mb-5 tw-text-white">Ваша заявка принята</p>

                    <div className="tw-relative tw-flex tw-justify-center tw-items-center tw-mb-5">
                        <img className="tw-w-60 tw-h-60 tw-animate-spin" src={`/images/loading-circle.png`}
                             alt="Loading Circle" />

                        <p className="tw-absolute tw-text-2.5xl tw-text-white tw-font-semibold">
                            Coin<span className="tw-text-blue">Change</span>
                        </p>
                    </div>

                    {this.resolveExtraActions()}
                </div>
            </div>
        );
    }
}

TransactionCompeting.propTypes = {
    options: PropTypes.object,
    transactionType: PropTypes.oneOf([
        'e_money_to_cash', 'cash_to_e_money',
        'crypto_to_cash', 'cash_to_crypto',
        'crypto_to_e_money', 'e_money_to_crypto',
        'crypto_to_crypto'
    ]),
    transactionUuid: PropTypes.string
};

export default TransactionCompeting;