import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ConfirmationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPassword: '',
            currentEmailCode: '',
            newEmailCode: '',
            loading: false,
            canUpdate: false
        };

        this.stopLoading = this.stopLoading.bind(this);
    }

    stopLoading() {
        this.setState({
            currentPassword: '',
            currentEmailCode: '',
            newEmailCode: '',
            loading: false,
            canUpdate: false
        });
    }

    onFieldUpdateHandler(key, value) {
        let canUpdate = false;

        const { currentPassword, currentEmailCode, newEmailCode } = this.state;

        if (key === 'currentPassword') {
            if (this.props.emailConfirmation) {
                canUpdate = value !== '' && currentEmailCode !== '' && newEmailCode !== '';
            } else {
                canUpdate = value !== '';
            }
        }

        if (key === 'currentEmailCode') {
            canUpdate = currentPassword !== '' && value !== '' && newEmailCode !== '';
        }

        if (key === 'newEmailCode') {
            canUpdate = currentPassword !== '' && currentEmailCode !== '' && value !== '';
        }

        this.setState({
            [key]: value,
            canUpdate
        });
    }

    async update() {
        if (this.state.loading || !this.state.canUpdate) {
            return;
        }

        this.setState({
            loading: true
        });

        const { emailConfirmation, updateDataHandler } = this.props;

        let data = {
            currentPassword: this.state.currentPassword
        };

        if (emailConfirmation) {
            data = {
                ...data,
                currentEmailCode: this.state.currentEmailCode,
                newEmailCode: this.state.newEmailCode
            }
        }

        await updateDataHandler(data, this.stopLoading);
    }

    render() {
        let updateButtonStyles = 'tw-py-3 tw-text-sm tw-text-white tw-bg-blue tw-rounded-md tw-cursor-not-allowed tw-opacity-50';

        if (this.state.canUpdate) {
            updateButtonStyles = 'tw-py-3 tw-text-sm tw-text-white tw-bg-blue tw-rounded-md';
        }

        if (this.state.loading) {
            updateButtonStyles = 'tw-py-3 tw-text-sm tw-text-white tw-bg-blue tw-rounded-md tw-cursor-progress tw-opacity-50';
        }

        return (
            <>
                {
                    this.props.emailConfirmation ? (
                        <>
                            <div className="tw-flex tw-flex-col tw-mb-3">
                                <p className="tw-mb-1 tw-text-sm tw-text-white tw-font-light">Код из текущего E-mail:</p>

                                <input className="simple-input tw-text-white tw-bg-blue-dark tw-border-gray-medium"
                                       type="text"
                                       onChange={e => this.onFieldUpdateHandler('currentEmailCode', e.target.value)}
                                       value={this.state.currentEmailCode}
                                       placeholder="Введите код из текущего E-mail" />
                            </div>

                            <div className="tw-flex tw-flex-col tw-mb-3">
                                <p className="tw-mb-1 tw-text-sm tw-text-white tw-font-light">Код из нового E-mail:</p>

                                <input className="simple-input tw-text-white tw-bg-blue-dark tw-border-gray-medium"
                                       type="text"
                                       onChange={e => this.onFieldUpdateHandler('newEmailCode', e.target.value)}
                                       value={this.state.newEmailCode}
                                       placeholder="Введите код из нового E-mail" />
                            </div>
                        </>
                    ) : ''
                }
                <div className="tw-flex tw-flex-col tw-mb-5">
                    <p className="tw-mb-1 tw-text-sm tw-text-white tw-font-light">Текущий пароль:</p>

                    <input className="simple-input tw-text-white tw-bg-blue-dark tw-border-gray-medium"
                           type="password"
                           onChange={e => this.onFieldUpdateHandler('currentPassword', e.target.value)}
                           value={this.state.currentPassword}
                           placeholder="Введите текущий новый пароль" />
                </div>

                <button className={updateButtonStyles} onClick={_ => this.update()}>Подтвердить изменения</button>
            </>
        );
    }
}

ConfirmationForm.propTypes = {
    emailConfirmation: PropTypes.bool,
    updateDataHandler: PropTypes.func
};

export default ConfirmationForm;