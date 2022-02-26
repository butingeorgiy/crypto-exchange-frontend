import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Layouts
import MainLayout from '../layouts/Main';

// Presenters
import rateItemPresenter from '../presenters/rate-item.presenter';

// Components
import Dashboard from '../components/rateDashboard/Dashboard';
import Partners from '../components/general/Partners';
import BusinessNumbers from '../components/general/BusinessNumbers';
import TransactionWrapper from '../components/transaction/TransactionWrapper';

class Index extends Component {
    render() {
        const notifications = [
            {
                text: 'Внимание!!! Если вы первый раз на нашем сайте, рекомендуем ознакомиться с инструкцией.',
                link: 'https://google.com'
            }
        ];

        return (
            <MainLayout notifications={notifications}>
                <Dashboard items={this.props.dashboardItems} />
                <TransactionWrapper />
                <Partners />
                <BusinessNumbers />
            </MainLayout>
        );
    }
}

Index.propTypes = {
    dashboardItems: PropTypes.array
};

const mapStateToProps = ({ general }) => ({
    dashboardItems: rateItemPresenter(general.dashboardItems)
});

export default connect(mapStateToProps)(Index);