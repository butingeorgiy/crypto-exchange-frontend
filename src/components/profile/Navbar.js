import React, { Component, memo } from 'react';
import JsCookie from 'js-cookie';

// Helpers
import { confirmPopup } from '../../helpers/swal.helper';

// Components
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
    async logout() {
        const confirmation = await confirmPopup('Подтвердите выход из аккаунта.');

        if (!confirmation.isConfirmed) {
            return;
        }

        JsCookie.remove('auth_token');

        window.location.reload();
    }

    render() {
        return (
            <nav className="profile-navbar">
                <div className="tw-flex tw-flex-col tw-px-4 tw-pt-4 tw-pb-4">
                    <NavLink className="profile-navbar-item" to="/profile" end>
                        <svg xmlns="http://www.w3.org/2000/svg" className="item-icon" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0
                              11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <p className="item-text">Личный кабинет</p>
                    </NavLink>

                    <NavLink className="profile-navbar-item" to="/profile/accounts" end>
                        <svg xmlns="http://www.w3.org/2000/svg" className="item-icon" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2
                              0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>

                        <p className="item-text">Ваши счета</p>
                    </NavLink>

                    <NavLink className="profile-navbar-item" to="/profile/secure-settings" end>
                        <svg xmlns="http://www.w3.org/2000/svg" className="item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955
                              11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29
                              9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>

                        <p className="item-text">Безопасность</p>
                    </NavLink>

                    <NavLink className="profile-navbar-item" to="/profile/history" end>
                        <svg xmlns="http://www.w3.org/2000/svg" className="item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0
                              01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>

                        <p className="item-text">История обмена</p>
                    </NavLink>
                </div>

                <div className="tw-py-3 tw-text-center tw-text-sm tw-text-white tw-bg-blue tw-cursor-pointer"
                     onClick={this.logout}>Выйти</div>
            </nav>
        );
    }
}

export default memo(Navbar);