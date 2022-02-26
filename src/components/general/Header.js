import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { openPopup } from '../../store/popups/actions';

// Components
import LoginPopup from '../popups/Login';
import RegistrationPopup from '../popups/Registration';
import { Link, NavLink } from 'react-router-dom';

class Header extends Component {
    openLoginPopup() {
        this.props.openPopup({
            popupType: 'login'
        });
    }

    render() {
        const profileButton = this.props.fullName ?
            (
                <Link className="tw-ml-16 tw-px-10 tw-py-2 tw-text-sm tw-text-white tw-border-2 tw-border-blue tw-rounded-md tw-cursor-pointer"
                      to="/profile">{ this.props.fullName }</Link>
            ) :
            (
                <div className="tw-ml-16 tw-px-10 tw-py-2 tw-text-sm tw-text-white tw-border-2 tw-border-blue tw-rounded-md tw-cursor-pointer"
                     onClick={_ => this.openLoginPopup()}>Войти</div>
            );

        return (
            <header className="tw-bg-blue-dark">
                <div className="tw-container tw-mx-auto tw-px-5 tw-py-4">
                    <div className="tw-flex tw-justify-between">
                        <div className="tw-flex">
                            <Link to="/">
                                <img className="tw-w-52 tw-mr-16" src={'/images/logo.png'} alt="Logo" />
                            </Link>

                            <span className="tw-h-full tw-w-0.5 tw-bg-white tw-border tw-border-white tw-opacity-20 tw-rounded-2xl" />
                        </div>

                        <div className="tw-flex tw-items-center">
                            <div className="tw-flex tw-mr-16">
                                <NavLink className="header-nav-item" to="/transfer">Обмен</NavLink>
                                <NavLink className="header-nav-item" to="/help">Помощь</NavLink>
                                <NavLink className="header-nav-item" to="/contacts">Контакты</NavLink>
                                <NavLink className="header-nav-item" to="/reviews">Отзывы</NavLink>
                            </div>

                            <div className="tw-flex">
                                <a className="tw-mr-5 last:tw-mr-0" href="https://web.telegram.org" target="_blank" rel="noreferrer">
                                    <img className="tw-w-5" src={'/images/icons/telegram-white.svg'} alt="Telegram Icon" />
                                </a>

                                <a className="tw-mr-5 last:tw-mr-0" href="https://www.whatsapp.com" target="_blank" rel="noreferrer">
                                    <img className="tw-w-5" src={'/images/icons/whatsapp-white.svg'} alt="WhatsApp Icon" />
                                </a>

                                <a className="tw-mr-5 last:tw-mr-0" href="https://instagram.com" target="_blank" rel="noreferrer">
                                    <img className="tw-w-5" src={'/images/icons/instagram-white.svg'} alt="Instagram Icon" />
                                </a>
                            </div>
                        </div>

                        <div className="tw-flex">
                            <span className="tw-h-full tw-w-0.5 tw-bg-white tw-border tw-border-white tw-opacity-20 tw-rounded-2xl" />

                            { profileButton }
                        </div>
                    </div>
                </div>

                <LoginPopup />
                <RegistrationPopup />
            </header>
        );
    }
}

Header.propTypes = {
    openPopup: PropTypes.func,
    fullName: PropTypes.string
};

const mapStateToProps = ({ user }) => ({
    fullName: user.user ? `${user.user['last_name'] || 'Анонимов'} ${user.user['first_name'] || 'Аноним'}` : null
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        openPopup
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);