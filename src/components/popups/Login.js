import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JsCookie from 'js-cookie';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { openPopup, closePopup } from '../../store/popups/actions';

// Helpers
import { parseKeysFromCamelToCase } from '../../helpers/structure.helper';
import { errorToast } from '../../helpers/swal.helper';

// Components
import Popup from 'reactjs-popup';
import InputMask from 'react-input-mask';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phoneNumber: '',
            password: ''
        };
    }

    async login(e) {
        e.preventDefault();

        axios.post('authentication/authenticate', parseKeysFromCamelToCase(this.state))
            .then(({ data }) => {
                // Store access token in cookie
                JsCookie.set('auth_token', data['credentials']['token'], {
                    expires: data['credentials']['available_days']
                });

                window.location.replace('/');
            })
            .catch(async error => {
                await errorToast(
                    error.response?.data.message || error.message
                );
            });
    }

    onChangePhoneNumberHandler(value) {
        this.setState({
            phoneNumber: value.replace(/\D/g, '')
        });
    }

    openRegistrationPopup() {
        this.props.closePopup({ popupType: 'login' });
        this.props.openPopup({ popupType: 'registration' });
    }

    render() {
        const { isOpen, closePopup } = this.props;

        return (
            <Popup open={isOpen} onClose={_ => closePopup({ popupType: 'login' })}>
                <div className="tw-flex tw-flex-col tw-w-96 tw-px-8 tw-py-8 tw-bg-white tw-rounded-xl">
                    <p className="tw-mb-2 tw-text-2.5xl tw-font-bold tw-tracking-normal">Войти в аккаунт</p>

                    <img className="tw-w-48 tw-mb-10" src={'/images/logo-for-white-bg.png'} alt="Logo" />

                    <form className="tw-flex tw-flex-col tw-mb-10" onSubmit={e => this.login(e)}>
                        <InputMask className="tw-mb-3 simple-input"
                                   type="text"
                                   mask="+7 (999) 999 9999"
                                   onChange={e => this.onChangePhoneNumberHandler(e.target.value)}
                                   value={this.state.phoneNumber}
                                   placeholder="Номер телефона" />

                        <input className="tw-mb-3 simple-input"
                               type="password"
                               onChange={e => this.setState({ password: e.target.value })}
                               value={this.state.password}
                               placeholder="Пароль" />

                        <button className="tw-py-3 tw-text-sm tw-text-white tw-bg-blue tw-rounded-md">Войти</button>
                    </form>

                    <div className="tw-flex tw-flex-col">
                        <p className="tw-mb-2 tw-text-center tw-text-xs tw-text-gray-extradark tw-uppercase">— Нет аккаунта? —</p>

                        <button className="tw-py-3 tw-text-sm tw-text-gray-extradark tw-border tw-border-gray-extradark tw-rounded-md"
                                onClick={_ => this.openRegistrationPopup()}>Создать аккаунт</button>
                    </div>
                </div>
            </Popup>
        );
    }
}

Login.propTypes = {
    isOpen: PropTypes.bool,
    closePopup: PropTypes.func,
    openPopup: PropTypes.func
};

const mapStateToProps = ({ popups }) => {
    return {
        isOpen: popups.loginOpened
    };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        closePopup,
        openPopup
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);