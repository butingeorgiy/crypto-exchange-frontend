import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { setTransactionsHistory } from '../../../store/user/actions';

// Helpers
import { errorToast } from '../../../helpers/swal.helper';

class TransactionsList extends Component {
    componentDidMount() {
        if (this.props.items !== null) {
            return;
        }

        this.fetchHistory();
    }

    /**
     * Fetch user's transactions history.
     */
    fetchHistory() {
        axios.get('users/current/transactions-history')
            .then(({ data }) => {
                this.props.setTransactionsHistory(data['items']);
            })
            .catch(error => {
                errorToast(error.response?.data.message || error.message).then();
            });
    }

    render() {
        let content = (
            <div className="tw-flex tw-flex-col tw-px-4 tw-py-4 tw-bg-blue-dark tw-rounded-md">
                <p className="tw-text-sm tw-text-white tw-font-light">Загрузка ваших транзакций...</p>
            </div>
        );

        // content = (
        //     <div className="tw-flex tw-flex-col tw-bg-white tw-rounded-md">
        //         <div className="tw-grid tw-grid-cols-6">
        //             <div className="tw-px-4 tw-py-3 tw-text-sm">Обмен с</div>
        //
        //             <div className="tw-px-4 tw-py-3 tw-text-sm">Обмен на</div>
        //
        //             <div className="tw-px-4 tw-py-3 tw-text-sm">Сумма</div>
        //
        //             <div className="tw-px-4 tw-py-3 tw-text-sm">Дата</div>
        //
        //             <div className="tw-px-4 tw-py-3 tw-text-sm">Статус</div>
        //
        //             <div className="tw-px-4 tw-py-3 tw-text-sm">Действия</div>
        //         </div>
        //     </div>
        // );

        return (
            <div className="tw-flex tw-flex-col">
                <p className="tw-mb-3 tw-text-xl tw-text-white tw-font-light">История сделок</p>

                {content}
            </div>
        );
    }
}

TransactionsList.propTypes = {
    items: PropTypes.array,
    setTransactionsHistory: PropTypes.func
};

const mapStateToProps = ({ user }) => ({
    items: user.transactionsHistory
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setTransactionsHistory
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsList);