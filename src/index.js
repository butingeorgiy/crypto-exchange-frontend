import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { createStore } from 'redux';
import reducers from './store/index-store';

// Components
import DataLoader from './DataLoader';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// Styles
import './index.css';

const root = document.getElementById('root');
const store = createStore(reducers);

const content = (
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <DataLoader />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

ReactDOM.render(content, root);