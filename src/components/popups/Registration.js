import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { openPopup, closePopup } from '../../store/popups/actions';

// Helpers
import { parseKeysFromCamelToCase } from '../../helpers/structure.helper';
import { errorToast, successPopup } from '../../helpers/swal.helper';

// Components
import InputMask from 'react-input-mask';
import Popup from 'reactjs-popup';

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phoneNumber: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            loading: false
        };
    }

    async register(e) {
        e.preventDefault();

        if (this.state.loading) {
            return;
        }

        this.setState({ loading: true });

        const { phoneNumber, email, password, passwordConfirmation } = this.state;

        await axios.post('authentication/register', parseKeysFromCamelToCase({
            phoneNumber, email, password, passwordConfirmation
        })).then(({ data }) => {
            successPopup(data.message);

            this.props.closePopup('registration');
        }).catch(error => {
            errorToast(error.response?.data.message || error.message);
        });

        this.setState({ loading: false });
    }

    onChangePhoneNumberHandler(value) {
        this.setState({
            phoneNumber: value.replace(/\D/g, '')
        });
    }

    openLoginPopup() {
        this.props.closePopup({ popupType: 'registration' });
        this.props.openPopup({ popupType: 'login' });
    }

    render() {
        const { loading } = this.state;
        const { isOpen, closePopup } = this.props;

        return (
            <Popup open={isOpen} onClose={_ => closePopup({ popupType: 'registration' })}>
                <div className="tw-flex tw-flex-col tw-w-96 tw-px-8 tw-py-8 tw-bg-white tw-rounded-xl">
                    <p className="tw-mb-2 tw-text-2.5xl tw-font-bold tw-tracking-normal">Создать аккаунт</p>

                    <img className="tw-w-48 tw-mb-10" src={'/images/logo-for-white-bg.png'} alt="Logo" />

                    <form className="tw-flex tw-flex-col tw-mb-10" onSubmit={e => this.register(e)}>
                        <InputMask className="tw-mb-3 simple-input"
                                   type="text"
                                   mask="+7 (999) 999 9999"
                                   onChange={e => this.onChangePhoneNumberHandler(e.target.value)}
                                   value={this.state.phoneNumber}
                                   placeholder="Номер телефона" />

                        <input className="tw-mb-3 simple-input"
                               type="text"
                               onChange={e => this.setState({ email: e.target.value })}
                               value={this.state.email}
                               placeholder="E-mail" />

                        <input className="tw-mb-3 simple-input"
                               type="password"
                               onChange={e => this.setState({ password: e.target.value })}
                               value={this.state.password}
                               placeholder="Пароль" />

                        <input className="tw-mb-3 simple-input"
                               type="password"
                               onChange={e => this.setState({ passwordConfirmation: e.target.value })}
                               value={this.state.passwordConfirmation}
                               placeholder="Повторите пароль" />

                        <button className={`tw-py-3 tw-text-sm tw-text-white tw-bg-blue tw-rounded-md ${loading ? 'tw-cursor-progress tw-opacity-50' : ''}`}>Создать аккаунт</button>
                    </form>

                    <div className="tw-flex tw-flex-col">
                        <p className="tw-mb-2 tw-text-center tw-text-xs tw-text-gray-extradark tw-uppercase">— Есть аккаунта? —</p>

                        <button className="tw-py-3 tw-text-sm tw-text-gray-extradark tw-border tw-border-gray-extradark tw-rounded-md"
                                onClick={_ => this.openLoginPopup()}>Войти в аккаунт</button>
                    </div>
                </div>
            </Popup>
        );
    }
}

Registration.propTypes = {
    isOpen: PropTypes.bool,
    closePopup: PropTypes.func,
    openPopup: PropTypes.func
};

const mapStateToProps = ({ popups }) => {
    return {
        isOpen: popups.registrationOpened
    };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        closePopup,
        openPopup
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Registration);