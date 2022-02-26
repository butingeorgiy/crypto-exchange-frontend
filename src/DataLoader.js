import React, { Component } from 'react';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { setDashboardItems, stopInitLoading } from './store/general/actions';
import { setUserData } from './store/user/actions';
import { setDirections } from './store/exchange/actoins';

// Helpers
import { errorToast } from './helpers/swal.helper';

// Components
import App from './App';
import GlobalLoader from './components/general/GlobalLoader';

class DataLoader extends Component {
    async componentDidMount() {
        const { setDashboardItems, stopInitLoading, setUserData, setDirections } = this.props;

        // General service data fetching
        await axios.get('general')
            .then(({ data }) => {
                setDashboardItems(data['rate_dashboard_items']);
                setDirections(data['exchange_directions']);
            })
            .catch(async error => {
                await errorToast(
                    error.response?.data.message || error.message
                );
            });

        // Authentication / user data fetching
        await axios.get('users/current')
            .then(({ data }) => setUserData(data))
            .catch(async error => {
                // Not show error toast else user is not authenticated
                if (error.response.status === 401) {
                    return;
                }

                await errorToast(
                    error.response?.data.message || error.message
                );
            });

        stopInitLoading();
    }

    render() {
        const { loading = true } = this.props;

        return loading ? <GlobalLoader /> : <App />;
    }
}

const mapStateToProps = ({ general, user }) => ({
    loading: general.initDataLoading
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setDashboardItems,
        stopInitLoading,
        setUserData,
        setDirections
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DataLoader);