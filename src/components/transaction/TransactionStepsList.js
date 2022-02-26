import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TransactionStepsList extends Component {
    render() {
        const currentStep = this.props.currentStep;

        return (
            <div className="tw-container tw-grid tw-grid-cols-3 tw-gap-16 tw-mx-auto tw-mb-8 tw-px-5">
                <div className={`step-item ${currentStep >= 1 ? 'active' : ''}`}>
                    <div className="list-circle">1</div>
                    <p className="description">Выберите направление обмена</p>
                </div>

                <div className={`step-item ${currentStep >= 2 ? 'active' : ''}`}>
                    <div className="list-circle">2</div>
                    <p className="description">Заполните ваши данные</p>
                </div>

                <div className={`step-item ${currentStep === 3 ? 'active' : ''}`}>
                    <div className="list-circle">3</div>
                    <p className="description">Оплата заявки</p>
                </div>
            </div>
        );
    }
}

TransactionStepsList.propTypes = {
    currentStep: PropTypes.number
};

export default TransactionStepsList;