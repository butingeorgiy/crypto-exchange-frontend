import React, { Component } from 'react';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { setDashboardItems, stopInitLoading } from './store/general/actions';

// Components
import App from './App';
import GlobalLoader from './components/general/GlobalLoader'

class DataLoader extends Component {
    componentDidMount() {
        const { setDashboardItems, stopInitLoading } = this.props;

        axios.get(`${process.env.REACT_APP_API_BASE_URL}/general`)
            .then(({ data }) => {
                setDashboardItems(data['rate_dashboard_items']);

                stopInitLoading();
            })
            .catch(error => {
                console.error(error);
            })
    }

    render() {
        const { loading = true } = this.props;

        return loading ? <GlobalLoader /> : <App />;
    }
}

const mapStateToProps = ({ general }) => ({
    loading: general.initDataLoading
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setDashboardItems,
        stopInitLoading
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DataLoader);