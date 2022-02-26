import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import JsCookie from 'js-cookie';

// Redux
import { createStore } from 'redux';
import reducers from './store/index-store';

// Components
import DataLoader from './DataLoader';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// Styles
import './index.css';

// Set Axios Default Config
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

if (JsCookie.get('auth_token')) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${JsCookie.get('auth_token')}`;
}

const root = document.getElementById('root');
const store = createStore(reducers);

const content = (
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <DataLoader />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

ReactDOM.render(content, root);