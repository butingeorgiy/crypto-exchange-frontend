import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';

// Helpers
import { resolveBgColor } from '../../../helpers/transaction-front';
import { errorToast } from '../../../helpers/swal.helper';
import { isFloat } from '../../../helpers/numeric.helper';

// Components
import InputMask from 'react-input-mask';

class TransactionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            givenAmount: props.preparedTransaction.givenAmount,
            receivedAmount: props.preparedTransaction.receivedAmount,

            userName: props.user?.['first_name'] || '',
            userEmail: props.user?.email || '',
            userPhone: props.user?.['phone_number'] || '',

            options: {},

            agreedWithPolicy: false,
            limitsMessage: null,
            canContinue: false,
            loading: false
        };
    }

    resolveFormExtraFields() {
        if (['crypto_to_crypto', 'e_money_to_crypto'].includes(this.props.transactionType)) {
            return (
                <div className="tw-flex tw-flex-col">
                    <p className="tw-mb-1.5 tw-text-sm tw-text-white tw-font-light">
                        Адрес крипто кошелька для перевода:
                    </p>

                    <input className="tw-px-3 tw-py-2 tw-text-sm tw-text-white tw-font-light
                                                  tw-bg-white tw-bg-opacity-0 tw-border tw-border-white tw-border-opacity-40
                                                  tw-rounded-md focus:tw-outline-none"
                           onInput={e => {
                               this.setState(prev => ({
                                   options: {
                                       ...prev.options,
                                       wallet_address: e.target['value']
                                   }
                               }), _ => {
                                   this.ensureCanContinue();
                               });
                           }}
                           value={this.state.options['wallet_address'] || ''}
                           placeholder="Введите адрес крипто кошелька" type="text" />
                </div>
            );
        } else if (this.props.transactionType === 'crypto_to_e_money') {
            return (
                <div className="tw-flex tw-flex-col">
                    <p className="tw-mb-1.5 tw-text-sm tw-text-white tw-font-light">
                        Номер карты для обратного перевода:
                    </p>

                    <input className="tw-px-3 tw-py-2 tw-text-sm tw-text-white tw-font-light
                                                  tw-bg-white tw-bg-opacity-0 tw-border tw-border-white tw-border-opacity-40
                                                  tw-rounded-md focus:tw-outline-none"
                           onInput={e => {
                               this.setState(prev => ({
                                   options: {
                                       ...prev.options,
                                       card_number: e.target['value']
                                   }
                               }), _ => {
                                   this.ensureCanContinue();
                               });
                           }}
                           value={this.state.options['card_number'] || ''}
                           placeholder="Введите номер карты" type="text" />
                </div>
            );
        }

        return '';
    }

    onChangeGivenAmountHandler(value) {
        const givenCost = this.props.preparedTransaction.givenItem.cost;
        const receivedCost = this.props.preparedTransaction.receivedItem.cost;

        this.setState({
            givenAmount: value,
            receivedAmount: parseFloat((receivedCost * value / givenCost).toFixed(2))
        }, _ => {
            this.validatedAmounts();
            this.ensureCanContinue();
        });
    }

    onChangeReceivedAmountHandler(value) {
        const givenCost = this.props.preparedTransaction.givenItem.cost;
        const receivedCost = this.props.preparedTransaction.receivedItem.cost;

        this.setState({
            givenAmount: parseFloat((givenCost * value / receivedCost).toFixed(2)),
            receivedAmount: value
        }, _ => {
            this.validatedAmounts();
        });
    }

    /**
     * Validate amounts.
     */
    validatedAmounts() {
        const { givenItem, receivedItem } = this.props.preparedTransaction;
        const { givenAmount, receivedAmount } = this.state;

        if (givenAmount < givenItem['limits']['min']) {
            this.setState({
                limitsMessage: `Слишком маленькая сумма для ${givenItem['name']}. Минимальная сумма ${givenItem['limits']['min']}`
            }, _ => {
                this.ensureCanContinue();
            });
        } else if (givenAmount > givenItem['limits']['max']) {
            this.setState({
                limitsMessage: `Слишком большая сумма для ${givenItem['name']}. Максимальная сумма ${givenItem['limits']['max']}`
            }, _ => {
                this.ensureCanContinue();
            });
        } else if (receivedAmount < receivedItem['limits']['min']) {
            this.setState({
                limitsMessage: `Слишком маленькая сумма для ${receivedItem['name']}. Минимальная сумма ${receivedItem['limits']['min']}`
            }, _ => {
                this.ensureCanContinue();
            });
        } else if (receivedAmount > receivedItem['limits']['max']) {
            this.setState({
                limitsMessage: `Слишком большая сумма для ${receivedItem['name']}. Максимальная сумма ${receivedItem['limits']['max']}`
            }, _ => {
                this.ensureCanContinue();
            });
        } else {
            this.setState({
                limitsMessage: null
            }, _ => {
                this.ensureCanContinue();
            });
        }
    }

    ensureCanContinue() {
        let canContinue = true;

        if (canContinue && !this.state.agreedWithPolicy) {
            canContinue = false;
        }

        if (this.props.user === null &&
            !(
                this.state.userName &&
                this.state.userEmail &&
                this.state.userPhone
            )
        ) {
            canContinue = false;
        }

        if (canContinue && this.props.user !== null && !this.state.userName) {
            canContinue = false;
        }

        if (canContinue && this.state.limitsMessage !== null) {
            canContinue = false;
        }

        // Special fields validation

        // Need specify crypto wallet address when type is crypto_to_crypto or e_money_to_crypto
        if (canContinue && ['crypto_to_crypto', 'e_money_to_crypto'].includes(this.props.transactionType) && !this.state.options['wallet_address']) {
            canContinue = false;
        }

        if (canContinue && this.props.transactionType === 'crypto_to_e_money' && !this.state.options['card_number']) {
            canContinue = false;
        }

        this.setState({ canContinue });
    }

    async moveToNextStep() {
        if (!this.state.canContinue || this.state.loading) {
            return;
        }

        this.setState({ loading: true });

        const uri = `transactions/create?uuid=${this.props.transactionUuid}`;

        await axios.post(uri, this.prepareDataForRequest())
            .then(({ data }) => {
                this.props.moveOnThirdStep(data['transaction_response']);
            })
            .catch(error => {
                errorToast(error.response?.data.message);
            })
            .finally(_ => {
                this.setState({ loading: false });
            });
    }

    prepareDataForRequest() {
        let data = {};

        if (this.props.user === null) {
            data['user_data'] = {
                'name': this.state.userName,
                'email': this.state.userEmail,
                'phone_number': this.state.userPhone
            };
        } else if (!this.props.user['first_name']) {
            data['user_data'] = { 'name': this.state.userName };
        }

        if (this.state.givenAmount !== this.props.preparedTransaction.givenAmount ||
            this.state.receivedAmount !== this.props.preparedTransaction.receivedAmount) {

            if (isFloat(this.state.givenAmount) === false) {
                data['given_entity_amount'] = this.state.givenAmount;
            } else {
                data['received_entity_amount'] = this.state.receivedAmount;
            }

        }

        if (Object.keys(this.state.options).length > 0) {
            data['options'] = this.state.options;
        }

        return data;
    }

    render() {
        const { givenItem, receivedItem } = this.props.preparedTransaction;
        const { userName, userEmail, userPhone, givenAmount, receivedAmount, canContinue, loading } = this.state;
        const isAuth = this.props.user !== null;

        let buttonStyles = 'tw-flex tw-justify-center tw-items-center tw-w-full ' +
            'tw-py-4 tw-text-white tw-font-light tw-bg-blue tw-rounded-md';

        if (canContinue === false) {
            buttonStyles += ' tw-opacity-50 tw-cursor-not-allowed';
        } else if (loading === true) {
            buttonStyles += ' tw-opacity-50 tw-cursor-progress';
        }

        return (
            <div className="tw-bg-blue-dark">
                <div className="tw-container tw-mx-auto tw-py-8 tw-px-5">
                    <p className="tw-mb-2 tw-text-white tw-font-light">Отдаёте</p>

                    <div className="tw-mb-5 tw-rounded-md tw-overflow-hidden"
                         style={{ background: resolveBgColor(givenItem.color) }}>
                        <div className="tw-flex tw-items-center tw-px-4 tw-py-3 entity-wrapper-gradient-bg">
                            <div
                                className="tw-w-8 tw-h-8 tw-mr-4 tw-bg-cover tw-bg-center tw-bg-no-repeat tw-rounded-full"
                                style={{ backgroundImage: `url(${givenItem.icon})` }} />

                            <p className="tw-text-white">{givenItem.name}</p>
                        </div>
                    </div>

                    <div className="tw-grid tw-grid-cols-3 tw-gap-x-10 tw-mb-10">
                        <div className="tw-col-span-2 tw-grid tw-grid-cols-2 tw-gap-x-10 tw-gap-y-4">
                            <div className="tw-flex tw-flex-col">
                                <p className="tw-mb-1.5 tw-text-sm tw-text-white tw-font-light">Сумма:</p>

                                <input className="tw-px-3 tw-py-2 tw-text-sm tw-text-white tw-font-light
                                                  tw-bg-white tw-bg-opacity-0 tw-border tw-border-white tw-border-opacity-40
                                                  tw-rounded-md focus:tw-outline-none"
                                       value={givenAmount} placeholder="Введите сумму" type="text"
                                       onInput={e => {
                                           this.onChangeGivenAmountHandler(
                                               parseFloat(
                                                   parseFloat(e.target['value'] || '0').toFixed(2)
                                               )
                                           );
                                       }} />
                            </div>

                            <div className="tw-flex tw-flex-col">
                                <p className="tw-mb-1.5 tw-text-sm tw-text-white tw-font-light">Имя:</p>

                                <input className="tw-px-3 tw-py-2 tw-text-sm tw-text-white tw-font-light
                                                  tw-bg-white tw-bg-opacity-0 tw-border tw-border-white tw-border-opacity-40
                                                  tw-rounded-md focus:tw-outline-none"
                                       value={userName} readOnly={isAuth && this.props.user?.['first_name']}
                                       placeholder="Введите ваше имя" type="text"
                                       onInput={e => {
                                           this.setState({
                                               userName: e.target['value']
                                           }, _ => {
                                               this.ensureCanContinue();
                                           });
                                       }} />
                            </div>

                            <div className="tw-flex tw-flex-col">
                                <p className="tw-mb-1.5 tw-text-sm tw-text-white tw-font-light">E-mail:</p>

                                <input className="tw-px-3 tw-py-2 tw-text-sm tw-text-white tw-font-light
                                                  tw-bg-white tw-bg-opacity-0 tw-border tw-border-white tw-border-opacity-40
                                                  tw-rounded-md focus:tw-outline-none"
                                       value={userEmail} readOnly={isAuth}
                                       onInput={e => {
                                           this.setState({
                                               userEmail: e.target['value']
                                           }, _ => {
                                               this.ensureCanContinue();
                                           });
                                       }}
                                       placeholder="Введите ваш E-mail" type="text" />
                            </div>

                            <div className="tw-flex tw-flex-col">
                                <p className="tw-mb-1.5 tw-text-sm tw-text-white tw-font-light">Номер телефона:</p>

                                <InputMask className="tw-px-3 tw-py-2 tw-text-sm tw-text-white tw-font-light
                                                      tw-bg-white tw-bg-opacity-0 tw-border tw-border-white tw-border-opacity-40
                                                      tw-rounded-md focus:tw-outline-none"
                                           value={userPhone} readOnly={isAuth}
                                           onInput={e => {
                                               this.setState({
                                                   userPhone: e.target['value'].replace(/\D+/g, '')
                                               }, _ => {
                                                   this.ensureCanContinue();
                                               });
                                           }}
                                           mask="+7 (999) 999 9999"
                                           placeholder="Введите ваш номер телефона" type="text" />
                            </div>
                        </div>

                        <div className="tw-col-span-1 tw-pt-5">
                            <p className="tw-text-sm tw-text-white tw-font-light">
                                Все ваши данные, указанные на нашем сервисе, надежно хранятся и передаются
                                исключительно в зашифрованном виде. Можете не переживать по поводу утечки
                                ваших персональных и финансовых данных.
                            </p>
                        </div>
                    </div>

                    <p className="tw-mb-2 tw-text-white tw-font-light">Получаете</p>

                    <div className="tw-mb-5 tw-rounded-md tw-overflow-hidden"
                         style={{ background: resolveBgColor(receivedItem.color) }}>
                        <div className="tw-flex tw-items-center tw-px-4 tw-py-3 entity-wrapper-gradient-bg">
                            <div
                                className="tw-w-8 tw-h-8 tw-mr-4 tw-bg-cover tw-bg-center tw-bg-no-repeat tw-rounded-full"
                                style={{ backgroundImage: `url(${receivedItem.icon})` }} />

                            <p className="tw-text-white">{receivedItem.name}</p>
                        </div>
                    </div>

                    <div className="tw-grid tw-grid-cols-3 tw-gap-x-10 tw-mb-10">
                        <div className="tw-col-span-2 tw-grid tw-grid-cols-2 tw-gap-x-10 tw-gap-y-4">
                            <div className="tw-flex tw-flex-col">
                                <p className="tw-mb-1.5 tw-text-sm tw-text-white tw-font-light">Сумма:</p>

                                <input className="tw-px-3 tw-py-2 tw-text-sm tw-text-white tw-font-light
                                                  tw-bg-white tw-bg-opacity-0 tw-border tw-border-white tw-border-opacity-40
                                                  tw-rounded-md focus:tw-outline-none"
                                       value={receivedAmount} placeholder="Введите сумму" type="text"
                                       onInput={e => {
                                           this.onChangeReceivedAmountHandler(
                                               parseFloat(
                                                   parseFloat(e.target['value'] || '0').toFixed(2)
                                               )
                                           );
                                       }} />
                            </div>

                            {this.resolveFormExtraFields()}
                        </div>

                        <div className="tw-col-span-1 tw-pt-5">
                            <p className="tw-text-sm tw-text-white tw-font-light">
                                Будьте очень внимательными при введении реквизитов для обратного перевода средств!
                                Администрация переведет средства по указанным вами реквизитам.
                            </p>
                        </div>
                    </div>

                    <div className="tw-flex tw-mb-4">
                        <label className="tw-flex tw-items-center tw-cursor-pointer">
                            <input className="tw-mr-2" type="checkbox"
                                   onChange={_ => {
                                       this.setState(prev => ({
                                           agreedWithPolicy: !prev.agreedWithPolicy
                                       }), _ => {
                                           this.ensureCanContinue();
                                       });
                                   }}  />

                            <p className="tw-text-sm tw-text-white tw-font-light">
                                С правилами сервиса ознакомлен и согласен
                            </p>
                        </label>
                    </div>

                    <button className={buttonStyles} onClick={_ => this.moveToNextStep()} title={this.state.limitsMessage}>
                        Обменять

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor"
                             className="tw-min-w-6 tw-w-6 tw-min-h-6 tw-h-6 tw-ml-3" fill="none">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2
                                  2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    }
}

TransactionForm.propTypes = {
    user: PropTypes.object,
    preparedTransaction: PropTypes.shape({
        givenItem: PropTypes.object,
        receivedItem: PropTypes.object,
        givenAmount: PropTypes.number,
        receivedAmount: PropTypes.number
    }),
    transactionType: PropTypes.oneOf([
        'e_money_to_cash', 'cash_to_e_money',
        'crypto_to_cash', 'cash_to_crypto',
        'crypto_to_e_money', 'e_money_to_crypto',
        'crypto_to_crypto'
    ]),
    transactionUuid: PropTypes.string,
    moveOnThirdStep: PropTypes.func
};

const mapStateToProps = ({ user }) => ({
    user: user.user
});

export default connect(mapStateToProps)(TransactionForm);