import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

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
            invertingAllowed: true,

            // is it able to move to second transaction step
            canContinue: false
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
     * Resolve entity item.
     *
     * @param id
     * @param position available values: `given`, `received`
     */
    resolveEntityItem(id, position) {
        let needleKey, entity = null;

        if (position === 'given' && this.state.inverted === false) {
            needleKey = 'first_entity';
        } else if (position === 'received' && this.state.inverted === false) {
            needleKey = 'second_entity';
        } else if (position === 'given' && this.state.inverted === true) {
            needleKey = 'second_entity';
        } else {
            needleKey = 'first_entity';
        }

        for (const direction of this.props.directions) {
            if (direction[needleKey]['id'] === id) {
                entity = direction[needleKey];

                break;
            }
        }

        return entity;
    }

    /**
     * Update state after changing of given select.
     *
     * @param id
     */
    onChangeGivenSelectHandler(id) {
        const receivedOptions = this.resolveReceivedOptions(id);
        const givenItem = this.resolveEntityItem(id, 'given');

        // todo: подключить инвертирование

        this.setState({
            givenOptions: this.resolveGivenOptions(),
            receivedOptions,
            givenItem,
            receivedItem: receivedOptions[0],
            givenAmount: givenItem['cost'],
            receivedAmount: receivedOptions[0]['cost'],
            givenCost: givenItem['cost'],
            receivedCost: receivedOptions[0]['cost']
        });
    }

    /**
     * Update state after changing of received select.
     *
     * @param id
     */
    onChangeReceivedSelectHandler(id) {
        const givenOptions = this.resolveGivenOptions(id);
        const receivedItem = this.resolveEntityItem(id, 'received');

        // todo: подключить инвертирование

        this.setState(prev => ({
            givenOptions,
            receivedItem,
            //givenItem: givenOptions[0],
            givenAmount: prev.givenItem['cost'],
            receivedAmount: receivedItem['cost'],
            givenCost: prev.givenItem['cost'],
            receivedCost: receivedItem['cost']
        }));
    }

    onChangeGivenAmountHandler(value) {
        const { givenCost, receivedCost } = this.state;

        this.setState({
            givenAmount: value,
            receivedAmount: receivedCost * value / givenCost
        });
    }

    onChangeReceivedAmountHandler(value) {
        const { givenCost, receivedCost } = this.state;

        this.setState({
            givenAmount: givenCost * value / receivedCost,
            receivedAmount: value
        });
    }

    /**
     * Validate amounts
     * @param given
     * @param received
     */
    validatedAmounts(given, received) {
        // todo: write method

        return {
            result: true,
            message: null
        };
    }

    moveToNextStep() {
        if (this.state.canContinue === false) {
            return;
        }

        // todo: write method
    }

    render() {
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

                    <button className={`tw-flex tw-items-center tw-px-8 tw-text-white tw-font-light tw-bg-blue 
                                      tw-rounded-md ${this.state.canContinue ? '' : 'tw-opacity-50 tw-cursor-not-allowed'}`}
                            onClick={_ => this.moveToNextStep()}>
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
    directions: PropTypes.array
};

const mapStateToProps = ({ exchange }) => ({
    directions: exchange.directions
});

export default connect(mapStateToProps)(ChoosingPairStage);