import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import NumberFormat from 'react-number-format';

class ReceivedEntitySelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownVisible: true
        };
    }

    prepareOptionsRendering() {
        const { item, options, onSelectChangeHandler } = this.props;

        return options.map(option => {
            let className = 'tw-flex tw-items-center tw-mb-2.5 last:tw-mb-0 tw-pb-2.5 last:tw-pb-0 ' +
                'tw-border-b last:tw-border-0 tw-border-blue';

            const disabled = option.id === item.id || !option.selectable;

            if (disabled) {
                className += ' tw-cursor-not-allowed';
            } else {
                className += ' tw-cursor-pointer';
            }

            const onClickHandler = _ => {
                if (option.id === item.id || !option.selectable) {
                    return;
                }

                onSelectChangeHandler(option.id);
            };

            return (
                <div key={option.id} className={className} onClick={onClickHandler}>
                    <div className={`tw-w-10 tw-h-10 tw-mr-4 tw-bg-cover tw-bg-center tw-bg-no-repeat tw-rounded-full ${disabled ? 'tw-opacity-50' : ''}`}
                         style={{ backgroundImage: `url(${option.icon})` }} />

                    <div className={`tw-flex tw-flex-col ${disabled ? 'tw-opacity-50' : ''}`}>
                        <p className="tw-text-white">{option.name}</p>
                        <p className="tw-mr-1 tw-text-sm tw-text-gray tw-font-light">{option.alias}</p>
                    </div>
                </div>
            );
        });
    }

    render() {
        const { item, amount, onAmountChangeHandler } = this.props;

        const dropdownContent = this.prepareOptionsRendering();

        return (
            <div className="tw-relative tw-flex-1 tw-flex tw-flex-col">
                <p className="tw-absolute tw--top-9 tw-text-lg tw-text-white tw-font-light">Получаете:</p>

                <div className="tw-flex tw-items-center tw-w-full tw-px-4 tw-py-3 tw-bg-white tw-bg-opacity-20 tw-rounded-md">
                    <div className="tw-w-10 tw-h-10 tw-mr-4 tw-bg-cover tw-bg-center tw-bg-no-repeat tw-rounded-full"
                         style={{ backgroundImage: `url(${item.icon})` }} />

                    <div className="tw-flex tw-flex-col tw-mr-auto tw-cursor-pointer"
                         onClick={_ => this.setState(({ dropdownVisible }) => ({ dropdownVisible: !dropdownVisible }))}>
                        <p className="tw-text-white">{item.name}</p>
                        <div className="tw-flex tw-items-center">
                            <p className="tw-mr-1 tw-text-sm tw-text-gray tw-font-light">{item.alias}</p>

                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className={`tw-h-5 tw-w-5 tw-text-gray ${this.state.dropdownVisible ? 'tw-rotate-180' : ''}`}
                                 viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1
                                      0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    <NumberFormat thousandSeparator=" " decimalScale={2}
                                  allowNegative={false} value={amount}
                                  onValueChange={e => onAmountChangeHandler(e.floatValue || 0)}
                                  placeholder="Укажите сумму"
                                  className="tw-w-40 tw-px-2 tw-py-1.5 tw-text-right tw-text-sm tw-text-white tw-font-light
                                             tw-bg-white tw-bg-opacity-0 tw-border tw-border-white tw-border-opacity-40
                                             tw-rounded-md focus:tw-outline-none" />

                    <p className="tw-ml-3 tw-text-white tw-font-light">{item.alias}</p>
                </div>

                <div className={`${this.state.dropdownVisible ? '' : 'tw-hidden'} tw-absolute tw-z-10 
                     tw-w-full tw-max-h-52 tw-p-4 entities-dropdown tw-rounded-md tw-shadow tw-overflow-scroll`}>{dropdownContent}
                </div>
            </div>
        );
    }
}

ReceivedEntitySelect.propTypes = {
    item: PropTypes.object,
    amount: PropTypes.number,
    onSelectChangeHandler: PropTypes.func,
    onAmountChangeHandler: PropTypes.func,
    options: PropTypes.array
};

export default ReceivedEntitySelect;