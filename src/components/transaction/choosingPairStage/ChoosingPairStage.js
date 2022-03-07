import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';

// Helpers
import { isFloat } from '../../../helpers/numeric.helper';
import { errorToast } from '../../../helpers/swal.helper';

// Components
import GivenEntitySelect from './GivenEntitySelect';
import ReceivedEntitySelect from './ReceivedEntitySelect';

class ChoosingPairStage extends Component {
    constructor(props) {
        super(props);

        const givenOptions = this.resolveGivenOptions();
        const receivedOptions = this.resolveReceivedOptions();

        this.state = {
            // current chosen given entity
            givenItem: givenOptions[0],

            // current chosen received entity
            receivedItem: receivedOptions[0],

            // available options for given entity select (depends on `receivedId`)
            givenOptions,

            // available options for received entity select (depends on `givenId`)
            receivedOptions,

            // given entity transaction amount
            givenAmount: givenOptions[0]['cost'],

            // received entity transaction amount
            receivedAmount: receivedOptions[0]['cost'],

            // given entity init cost (static value)
            givenCost: givenOptions[0]['cost'],

            // received entity init cost (static value)
            receivedCost: receivedOptions[0]['cost'],

            // is direction reversed
            inverted: false,

            // is reversing allowed
            //invertingAllowed: props.directions[0]['inverting_allowed'],
            invertingAllowed: false,

            // is it able to move to second transaction step
            canContinue: false,

            // is it loading progress
            loading: false,

            // limits validation message
            limitsMessage: null
        };

        this.onChangeGivenSelectHandler = this.onChangeGivenSelectHandler.bind(this);
        this.onChangeReceivedSelectHandler = this.onChangeReceivedSelectHandler.bind(this);

        this.onChangeGivenAmountHandler = this.onChangeGivenAmountHandler.bind(this);
        this.onChangeReceivedAmountHandler = this.onChangeReceivedAmountHandler.bind(this);
    }

    /**
     * Resolve given options.
     *
     * @param receivedEntityId
     *
     * @return {*[]}
     */
    resolveGivenOptions(receivedEntityId = null) {
        let givenOptions = [],
            exceptedIds = [],
            inverted = this.state ? this.state.inverted : false,
            givenKey = inverted ? 'second_entity' : 'first_entity',
            receivedKey = inverted ? 'first_entity': 'second_entity';

        if (receivedEntityId === null) {
            this.props.directions.forEach(item => {
                if (exceptedIds.includes(item[givenKey]['id'])) {
                    return;
                }

                exceptedIds.push(item[givenKey]['id']);
                givenOptions.push({
                    ...item[givenKey],
                    selectable: true
                });
            });

            return givenOptions;
        }

        this.props.directions.forEach(item => {
            if (item[receivedKey]['id'] === receivedEntityId &&
                !exceptedIds.includes(item[givenKey]['id'])) {
                let given = item[givenKey];

                exceptedIds.push(given['id']);
                givenOptions.push({
                    ...given,
                    selectable: inverted ? item['inverting_allowed'] : true
                });
            }
        });

        return givenOptions;
    }

    /**
     * Resolve received options.
     *
     * @param givenEntityId
     *
     * @return {*|*[]}
     */
    resolveReceivedOptions(givenEntityId = null) {
        let inverted = this.state ? this.state.inverted : false;

        if (givenEntityId === null) {
            return this.resolveReceivedOptions(
                this.props.directions[0]['first_entity']['id']
            );
        }

        let receivedOptions = [],
            exceptedIds = [],
            givenKey = inverted ? 'second_entity' : 'first_entity',
            receivedKey = inverted ? 'first_entity': 'second_entity';

        this.props.directions.forEach(item => {
            if (item[givenKey]['id'] === givenEntityId && !exceptedIds.includes(exceptedIds)) {
                let received = item[receivedKey];

                exceptedIds.push(received['id']);
                receivedOptions.push({
                    ...received,
                    selectable: inverted ? item['inverting_allowed'] : true
                });
            }
        });

        return receivedOptions;
    }

    /**
     * Resolve direction.
     *
     * IMPORTANT: method return False if pair not found.
     *
     * @param givenId
     * @param receivedId
     * @return {*[]}
     */
    resolveDirection(givenId, receivedId) {
        const givenKey = this.state.inverted ? 'second_entity' : 'first_entity';
        const receivedKey = this.state.inverted ? 'first_entity' : 'second_entity';

        let direction = false;

        this.props.directions.forEach(item => {
            if (item[givenKey]['id'] === givenId && item[receivedKey]['id'] === receivedId) {
                const selectable = this.state.inverted ? item['inverting_allowed'] : true;

                direction = {
                    given: { ...item[givenKey], selectable },
                    received: { ...item[receivedKey], selectable },
                    invertingAllowed: item['inverting_allowed']
                };
            }
        });

        return direction;
    }

    /**
     * Update state after changing of given select.
     *
     * @param id
     */
    onChangeGivenSelectHandler(id) {
        const receivedOptions = this.resolveReceivedOptions(id);

        if (!receivedOptions.length) {
            errorToast('Failed to resolve received options. ' +
                'Try to reload page or contact service\'s administrator.').then();

            return;
        }

        // Если есть пара с уже выбранным элементом из
        // списка "received", то метод вернет НЕ false
        let direction = this.resolveDirection(
            id,
            this.state.receivedItem['id']
        );

        // Есть пары нет, то автоматически перескакиваем
        // на первый элемент из списка "received"
        if (direction === false) {
            direction = this.resolveDirection(
                id,
                receivedOptions[0]['id']
            );
        }

        this.setState({
            receivedOptions,
            givenItem: direction['given'],
            receivedItem: direction['received'],
            givenAmount: direction['given']['cost'],
            receivedAmount: direction['received']['cost'],
            givenCost: direction['given']['cost'],
            receivedCost: direction['received']['cost'],
            //invertingAllowed: direction['invertingAllowed']
        });
    }

    /**
     * Update state after changing of received select.
     *
     * @param id
     */
    onChangeReceivedSelectHandler(id) {
        const givenOptions = this.resolveGivenOptions(id);

        if (!givenOptions.length) {
            errorToast('Failed to resolve given options. ' +
                'Try to reload page or contact service\'s administrator.').then();

            return;
        }

        // Если есть пара с уже выбранным элементом из
        // списка "given", то метод вернет НЕ false
        let direction = this.resolveDirection(
            this.state.givenItem['id'],
            id
        );

        // Есть пары нет, то автоматически перескакиваем
        // на первый элемент из списка "received"
        if (direction === false) {
            direction = this.resolveDirection(
                givenOptions[0]['id'],
                id
            );
        }

        this.setState({
            givenOptions,
            givenItem: direction['given'],
            receivedItem: direction['received'],
            givenAmount: direction['given']['cost'],
            receivedAmount: direction['received']['cost'],
            givenCost: direction['given']['cost'],
            receivedCost: direction['received']['cost'],
            //invertingAllowed: direction['invertingAllowed']
        });
    }

    onChangeGivenAmountHandler(value) {
        const { givenCost, receivedCost } = this.state;

        this.setState({
            givenAmount: parseFloat(value.toFixed(2)),
            receivedAmount: parseFloat((receivedCost * value / givenCost).toFixed(2))
        }, _ => {
            this.validatedAmounts();
        });
    }

    onChangeReceivedAmountHandler(value) {
        const { givenCost, receivedCost } = this.state;

        this.setState({
            givenAmount: parseFloat((givenCost * value / receivedCost).toFixed(2)),
            receivedAmount: parseFloat(value.toFixed(2))
        }, _ => {
            this.validatedAmounts();
        });
    }

    /**
     * Validate amounts.
     */
    validatedAmounts() {
        const { givenItem, receivedItem, givenAmount, receivedAmount } = this.state;

        if (givenAmount < givenItem['limits']['min']) {
            this.setState({
                canContinue: false,
                limitsMessage: `Слишком маленькая сумма для ${givenItem['name']}. Минимальная сумма ${givenItem['limits']['min']}`
            });
        } else if (givenAmount > givenItem['limits']['max']) {
            this.setState({
                canContinue: false,
                limitsMessage: `Слишком большая сумма для ${givenItem['name']}. Максимальная сумма ${givenItem['limits']['max']}`
            });
        } else if (receivedAmount < receivedItem['limits']['min']) {
            this.setState({
                canContinue: false,
                limitsMessage: `Слишком маленькая сумма для ${receivedItem['name']}. Минимальная сумма ${receivedItem['limits']['min']}`
            });
        } else if (receivedAmount > receivedItem['limits']['max']) {
            this.setState({
                canContinue: false,
                limitsMessage: `Слишком большая сумма для ${receivedItem['name']}. Максимальная сумма ${receivedItem['limits']['max']}`
            });
        } else {
            this.setState({
                canContinue: true,
                limitsMessage: null
            });
        }
    }

    async moveToNextStep() {
        if (!this.state.canContinue || this.state.loading) {
            return;
        }

        this.setState({ loading: true });

        const data = {
            'given_entity_id': this.state.givenItem.id,
            'received_entity_id': this.state.receivedItem.id,
            'inverted': this.state.inverted ? '1' : '0'
        };

        if (isFloat(this.state.givenAmount) === false) {
            data['given_entity_amount'] = this.state.givenAmount;
        } else {
            data['received_entity_amount'] = this.state.receivedAmount;
        }

        await axios.post('transactions/prepare', data)
            .then(({ data } ) => {
                this.props.moveOnSecondStep(
                    data['transaction_uuid'],
                    data['transaction_type'],
                    {
                        givenItem: this.state.givenItem,
                        receivedItem: this.state.receivedItem,
                        givenAmount: this.state.givenAmount,
                        receivedAmount: this.state.receivedAmount
                    }
                );
            })
            .catch(error => {
                errorToast(error.response?.data.message || error.message);
            })
            .finally(_ => {
                this.setState({ loading: false });
            })
    }

    render() {
        let buttonStyles = 'tw-flex tw-items-center tw-px-8 tw-text-white tw-font-light tw-bg-blue tw-rounded-md';

        if (this.state.canContinue === false) {
            buttonStyles += ' tw-opacity-50 tw-cursor-not-allowed';
        } else if (this.state.loading === true) {
            buttonStyles += ' tw-opacity-50 tw-cursor-progress';
        }

        return (
            <div className="tw-container tw-mx-auto tw-py-8 tw-px-5">
                <div className="tw-flex">
                    <div className="tw-flex-1 tw-flex tw-justify-between tw-items-center tw-mr-5">
                        <GivenEntitySelect item={this.state.givenItem}
                                           amount={this.state.givenAmount}
                                           options={this.state.givenOptions}
                                           onAmountChangeHandler={this.onChangeGivenAmountHandler}
                                           onSelectChangeHandler={this.onChangeGivenSelectHandler} />

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                             className={`tw-min-w-8 tw-w-8 tw-min-h-8 tw-h-8 tw-mx-5 tw-text-white 
                                        ${this.state.invertingAllowed ? 'tw-cursor-pointer' : 'tw-opacity-50 tw-cursor-not-allowed'}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11
                                  11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>

                        <ReceivedEntitySelect item={this.state.receivedItem}
                                              amount={this.state.receivedAmount}
                                              options={this.state.receivedOptions}
                                              onAmountChangeHandler={this.onChangeReceivedAmountHandler}
                                              onSelectChangeHandler={this.onChangeReceivedSelectHandler} />
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

ChoosingPairStage.propTypes = {
    directions: PropTypes.array,
    moveOnSecondStep: PropTypes.func
};

const mapStateToProps = ({ exchange }) => ({
    directions: exchange.directions
});

export default connect(mapStateToProps)(ChoosingPairStage);