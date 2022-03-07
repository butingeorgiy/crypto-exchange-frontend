import React, { Component } from 'react';

// Components
import TransactionStepsList from './TransactionStepsList';
import ChoosingPairStage from './choosingPairStage/ChoosingPairStage';
import TransactionForm from './formFillingStage/TransactionForm';
import TransactionCompeting from './completingStage/TransactionCompeting';

class TransactionWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentStep: 1,

            transactionUuid: null,
            transactionType: null,

            /**
             * Transferred data from first to second stage.
             *
             * Structure: {
             *                 givenItem: object,
             *                 receivedItem: object,
             *                 givenAmount: float,
             *                 receivedAmount: float
             *             }
             */
            secondStepData: null,

            /**
             * Transferred data from first to second stage.
             */
            thirdStepData: null
        };

        this.moveOnSecondStep = this.moveOnSecondStep.bind(this);
        this.moveOnThirdStep = this.moveOnThirdStep.bind(this);
    }

    moveOnSecondStep(uuid, type, payload) {
        this.setState({
            currentStep: 2,
            transactionUuid: uuid,
            transactionType: type,
            secondStepData: payload
        });
    }

    moveOnThirdStep(payload) {
        this.setState({
            currentStep: 3,
            thirdStepData: payload
        });
    }

    render() {
        let content = <ChoosingPairStage moveOnSecondStep={this.moveOnSecondStep} />;

        if (this.state.currentStep === 2) {
            content = <TransactionForm transactionUuid={this.state.transactionUuid}
                                       transactionType={this.state.transactionType}
                                       moveOnThirdStep={this.moveOnThirdStep}
                                       preparedTransaction={this.state.secondStepData} />;
        }

        if (this.state.currentStep === 3) {
            content = <TransactionCompeting transactionUuid={this.state.transactionUuid}
                                            transactionType={this.state.transactionType}
                                            options={this.state.thirdStepData} />
        }

        return (
            <div className="tw-py-4 transaction-wrapper">
                <TransactionStepsList currentStep={this.state.currentStep} />
                {content}
            </div>
        );
    }
}

export default TransactionWrapper;