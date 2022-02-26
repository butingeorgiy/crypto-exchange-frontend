import React, { Component } from 'react';

// Layouts
import MainLayout from '../../layouts/Main';

// Components
import { Link } from 'react-router-dom';

class Error404 extends Component {
    render() {
        return (
            <MainLayout>
                <div className="tw-container tw-min-h-screen-without-header-and-footer tw-flex tw-flex-col tw-justify-center tw-items-center tw-mx-auto tw-px-5 tw-py-10">
                    <img className="tw-w-96 tw-mb-14" src={'/images/icons/404-error.png'} alt="404 Error Icon" />
                    <p className="tw-mb-4 tw-text-3xl tw-text-white tw-font-light">Запрашиваемая страница не найдена</p>

                    <Link to="/" className="tw-text-white tw-font-light tw-underline tw-opacity-60">На главную</Link>
                </div>
            </MainLayout>
        );
    }
}

export default Error404;