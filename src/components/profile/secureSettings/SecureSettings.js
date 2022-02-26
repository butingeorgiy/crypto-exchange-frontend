import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { updateUserData } from '../../../store/user/actions';

// Helpers
import { errorToast, successPopup } from '../../../helpers/swal.helper';
import { parseKeysFromCamelToCase } from '../../../helpers/structure.helper';

// Components
import ConfirmationForm from './ConfirmationForm';

class SecureSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: props.email,
            newPassword: '',
            newPasswordConfirmation: '',
            currentStep: 1,
            hasUpdates: false
        };

        this.updateSecureData = this.updateSecureData.bind(this);
        this.onSuccessUpdatingHandler = this.onSuccessUpdatingHandler.bind(this);
    }

    onFieldUpdateHandler(key, value) {
        let hasUpdates = false;

        if (key === 'email') {
            hasUpdates = value !== this.props.email || this.state.newPassword !== '';
        }

        if (key === 'newPassword') {
            hasUpdates = this.state.email !== this.props.email || value !== '';
        }

        this.setState({
            hasUpdates,
            [key]: value
        });
    }

    async updateSecureData(confirmationData, stopLoadingHandler) {
        let data = {
            currentPassword: confirmationData?.currentPassword
        };

        if (this.state.email !== this.props.email) {
            data = {
                ...data,
                email: this.state.email,
                currentEmailCode: confirmationData?.currentEmailCode,
                newEmailCode: confirmationData?.newEmailCode
            };
        }

        if (this.state.newPassword !== '') {
            data = {
                ...data,
                newPassword: this.state.newPassword,
                newPasswordConfirmation: this.state.newPasswordConfirmation
            };
        }

        await axios.post('users/current/update-credentials', parseKeysFromCamelToCase(data))
            .then(({ data: { message } }) => {
                successPopup(message);
            })
            .catch(error => {
                errorToast(error.response?.data.message || error.message);
            });

        stopLoadingHandler();

        this.onSuccessUpdatingHandler();
    }

    async moveToSecondStep() {
        if (!this.state.hasUpdates) {
            return;
        }

        // If E-mail updated send confirmation codes.
        if (this.state.email !== this.props.email) {
            let codesSent = true;

            const currentEmail = this.props.email;
            const newEmail = this.state.email;

            await axios.post('email-confirmation/send', { email: currentEmail })
                .catch(error => {
                    errorToast(error.response?.data.message || error.message);

                    codesSent = false;
                });

            if (!codesSent) {
                return;
            }

            await axios.post('email-confirmation/send', { email: newEmail })
                .catch(error => {
                    errorToast(error.response?.data.message || error.message);

                    codesSent = false;
                });

            if (!codesSent) {
                return;
            }
        }

        this.setState({
            currentStep: 2
        });
    }

    onSuccessUpdatingHandler() {
        this.setState({
            email: this.props.email,
            newPassword: '',
            newPasswordConfirmation: '',
            currentStep: 1,
            hasUpdates: false
        });
    }

    render() {
        const { hasUpdates, currentStep } = this.state;

        let content = (
            <>
                <div className="tw-flex tw-flex-col tw-mb-3">
                    <p className="tw-mb-1 tw-text-sm tw-text-white tw-font-light">E-mail:</p>

                    <input className="simple-input tw-text-white tw-bg-blue-dark tw-border-gray-medium"
                           type="text"
                           onChange={e => this.onFieldUpdateHandler('email', e.target.value)}
                           value={this.state.email}
                           placeholder="Введите E-mail" />
                </div>

                <div className="tw-flex tw-flex-col tw-mb-3">
                    <p className="tw-mb-1 tw-text-sm tw-text-white tw-font-light">Новый пароль:</p>

                    <input className="simple-input tw-text-white tw-bg-blue-dark tw-border-gray-medium"
                           type="password"
                           onChange={e => this.onFieldUpdateHandler('newPassword', e.target.value)}
                           value={this.state.newPassword}
                           placeholder="Введите новый пароль" />
                </div>

                <div className="tw-flex tw-flex-col tw-mb-5">
                    <p className="tw-mb-1 tw-text-sm tw-text-white tw-font-light">Повторите новый пароль:</p>

                    <input className="simple-input tw-text-white tw-bg-blue-dark tw-border-gray-medium"
                           type="password"
                           onChange={e => this.setState({ newPasswordConfirmation: e.target.value })}
                           value={this.state.newPasswordConfirmation}
                           placeholder="Введите повторно новый пароль" />
                </div>

                <button className={`tw-py-3 tw-text-sm tw-text-white tw-bg-blue tw-rounded-md ${hasUpdates ? '' : 'tw-opacity-50 tw-cursor-not-allowed'}`}
                        onClick={_ => this.moveToSecondStep()}>Сохранить</button>
            </>
        );

        if (currentStep === 2) {
            content = <ConfirmationForm emailConfirmation={this.state.email !== this.props.email}
                                        onSuccessUpdatingHandler={this.onSuccessUpdatingHandler}
                                        updateDataHandler={this.updateSecureData} />
        }

        return (
            <div className="tw-flex tw-flex-col">
                <p className="tw-mb-3 tw-text-xl tw-text-white tw-font-light">Настройки безопасности</p>

                <div className="tw-flex tw-flex-col tw-px-4 tw-py-4 tw-bg-blue-dark tw-rounded-md">
                    {content}
                </div>
            </div>
        );
    }
}

SecureSettings.propTypes = {
    email: PropTypes.string,
    updateUserData: PropTypes.func
};

const mapStateToProps = ({ user }) => ({
    email: user.user?.email
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateUserData
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SecureSettings);