import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

// Pages
import IndexPage from './pages/Index';
import ProfilePage from './pages/Profile';

class App extends Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="profile" element={<ProfilePage />} />
            </Routes>
        );
    }
}

export default App;
