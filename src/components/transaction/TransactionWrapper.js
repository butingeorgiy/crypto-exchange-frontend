import React, { Component } from 'react';

// Components
import TransactionStepsList from './TransactionStepsList';
import ChoosingPairStage from './choosingPairStage/ChoosingPairStage';

class TransactionWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentStep: 1
        };
    }

    render() {
        return (
            <div className="tw-py-4 transaction-wrapper">
                <TransactionStepsList currentStep={this.state.currentStep} />

                <ChoosingPairStage />
            </div>
        );
    }
}

export default TransactionWrapper;