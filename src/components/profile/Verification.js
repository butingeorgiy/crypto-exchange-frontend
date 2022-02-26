import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';

// Helpers
import { mapToFormData } from '../../helpers/form-data.helper';
import { errorToast, successPopup } from '../../helpers/swal.helper';

// Presenters
import userPresenter from '../../presenters/user.presenter';

// Components
import InputMask from 'react-input-mask';

class Verification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            middleName: this.props.middleName,
            phoneNumber: this.props.phoneNumber,
            telegramLogin: '',
            selfie: null,
            scan: null,
            loading: false
        };
    }

    async send() {
        if (this.state.loading) {
            return;
        }

        this.setState({
            loading: true
        });

        let payload = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            telegramLogin: this.state.telegramLogin,
            selfieAttachment: this.state.selfie,
            scanAttachment: this.state.scan
        };

        if (this.state.middleName) {
            payload.middleName = this.state.middleName;
        }

        axios.post('verification/create-request', mapToFormData(payload))
            .then(async ({ data }) => {
                await successPopup(data.message);

                window.location.replace('/');
            })
            .catch(error => errorToast(error.response?.data.message || error.message))
            .finally(_ => {
                this.setState({ loading: false });
            });
    }

    onAttachmentUpload(file, type) {
        if (!file) {
            this.setState({
                [type]: null
            });

            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = e => {
            this.setState({
                [type]: file
            });
        };

        fileReader.onerror = console.error;

        fileReader.readAsDataURL(file);
    }

    render() {
        const { firstName, lastName, phoneNumber, telegramLogin, selfie, scan } = this.state;
        const canSend = firstName && lastName && phoneNumber && telegramLogin && selfie && scan;

        let sendButtonStyles = 'tw-py-3 tw-text-sm tw-text-white tw-bg-blue tw-rounded-md tw-cursor-not-allowed tw-opacity-50';

        if (canSend) {
            sendButtonStyles = 'tw-py-3 tw-text-sm tw-text-white tw-bg-blue tw-rounded-md';
        }

        if (this.state.loading) {
            sendButtonStyles = 'tw-py-3 tw-text-sm tw-text-white tw-bg-blue tw-rounded-md tw-cursor-progress tw-opacity-50';
        }

        return (
            <div className="tw-flex tw-flex-col">
                <p className="tw-mb-3 tw-text-xl tw-text-white tw-font-light">Форма верификации</p>

                <div className="tw-mb-3 tw-text-sm tw-text-white tw-font-light tw-whitespace-pre-wrap">
                    {`Верификация — это обязательная процедура в целях борьбы с мошенническими операция по покупке анонимных криптовалют и электронных валют в платежных системах с помощью банковских карт и некоторых платежных систем. \n\nВаш запрос на верификацию документов будет обработан в рабочее время с 10:00 по 00:00 по времени Алматы. Максимальное время обработки запроса — 24 часа. Уведомление об успешной верификации или отказе вы получите на свой E-mail адрес. \n\nВсе вопросы вы можете задать по телефону: +7 777 777 7777`}
                </div>

                <div className="tw-flex tw-flex-col tw-px-4 tw-py-4 tw-bg-blue-dark tw-rounded-md">
                    <div className="tw-flex tw-flex-col tw-mb-7">
                        <div className="tw-flex tw-flex-col tw-mb-3 last:tw-mb-0">
                            <p className="tw-mb-1 tw-text-sm tw-text-white tw-font-light">Имя:</p>

                            <input className="simple-input tw-text-white tw-bg-blue-dark tw-border-gray-medium"
                                   type="text"
                                   onChange={e => this.setState({ firstName: e.target.value })}
                                   value={this.state.firstName}
                                   placeholder="Введите имя" />
                        </div>

                        <div className="tw-flex tw-flex-col tw-mb-3 last:tw-mb-0">
                            <p className="tw-mb-1 tw-text-sm tw-text-white tw-font-light">Фамилия:</p>

                            <input className="simple-input tw-text-white tw-bg-blue-dark tw-border-gray-medium"
                                   type="text"
                                   onChange={e => this.setState({ lastName: e.target.value })}
                                   value={this.state.lastName}
                                   placeholder="Введите фамилию" />
                        </div>

                        <div className="tw-flex tw-flex-col tw-mb-3 last:tw-mb-0">
                            <p className="tw-mb-1 tw-text-sm tw-text-white tw-font-light">Отчество:</p>

                            <input className="simple-input tw-text-white tw-bg-blue-dark tw-border-gray-medium"
                                   type="text"
                                   onChange={e => this.setState({ middleName: e.target.value })}
                                   value={this.state.middleName}
                                   placeholder="Введите отчество (если есть)" />
                        </div>

                        <div className="tw-flex tw-flex-col tw-mb-3 last:tw-mb-0">
                            <p className="tw-mb-1 tw-text-sm tw-text-white tw-font-light">Номер телефона:</p>

                            <InputMask className="simple-input tw-text-white tw-bg-blue-dark tw-border-gray-medium"
                                       type="text"
                                       mask="+7 (999) 999 9999"
                                       onChange={e => this.setState({ phoneNumber: e.target.value.replace(/\D/g, '') })}
                                       value={this.state.phoneNumber}
                                       placeholder="Введите номер телефона" />
                        </div>

                        <div className="tw-flex tw-flex-col tw-mb-3 last:tw-mb-0">
                            <p className="tw-mb-1 tw-text-sm tw-text-white tw-font-light">Telegram:</p>

                            <input className="simple-input tw-text-white tw-bg-blue-dark tw-border-gray-medium"
                                   type="text"
                                   onChange={e => this.setState({ telegramLogin: e.target.value })}
                                   value={this.state.telegramLogin}
                                   placeholder="Логин вашего Telegram (например: @amir_5566)" />
                        </div>
                    </div>

                    <div className="tw-flex tw-flex-col tw-mb-5">
                        <p className="tw-mb-3 tw-text-xl tw-text-white">Документы</p>

                        <div className="tw-grid tw-grid-cols-4 tw-mb-8">
                            <div className="tw-col-span-2 tw-flex tw-flex-col">
                                <p className="tw-mb-1 tw-text-sm tw-text-white tw-font-light">Селфи с паспортом и надписью на листе: для сайта coin-exchange.com и дата</p>
                                <p className="tw-mb-5 tw-text-sm tw-text-yellow-light tw-font-light">(.GIF, .JPG, .JPEG, .JPE, .PNG, макс. 1 MB)</p>

                                <label className="tw-flex tw-items-center">
                                    <input type="file" hidden
                                           onChange={e => this.onAttachmentUpload(e.target.files[0] || null, 'selfie')} />
                                    <div className="tw-mr-4 tw-px-10 tw-py-2.5 tw-text-sm tw-text-white tw-font-light tw-bg-gray-medium tw-rounded-md tw-cursor-pointer">Выберите файл</div>

                                    <p className="tw-text-sm tw-text-white tw-font-light tw-opacity-60" onClick={e => e.preventDefault()}>
                                        {this.state.selfie ? this.state.selfie.name : 'Файл не выбран'}
                                    </p>
                                </label>
                            </div>

                            <div className="tw-col-span-2">
                                <div className="tw-w-48 tw-h-32 tw-h-full tw-ml-auto tw-bg-cover tw-bg-center tw-bg-no-repeat tw-rounded-md"
                                     style={{ backgroundImage: 'url(/images/selfie-attachment-default-bg.png)' }} />
                            </div>
                        </div>

                        <div className="tw-grid tw-grid-cols-4">
                            <div className="tw-col-span-2 tw-flex tw-flex-col">
                                <p className="tw-mb-1 tw-text-sm tw-text-white tw-font-light">Фото удостоверения личности или паспорта</p>
                                <p className="tw-mb-5 tw-text-sm tw-text-yellow-light tw-font-light">(.GIF, .JPG, .JPEG, .JPE, .PNG, макс. 1 MB)</p>

                                <label className="tw-flex tw-items-center">
                                    <input type="file" hidden
                                           onChange={e => this.onAttachmentUpload(e.target.files[0] || null, 'scan')} />
                                    <div className="tw-mr-4 tw-px-10 tw-py-2.5 tw-text-sm tw-text-white tw-font-light tw-bg-gray-medium tw-rounded-md tw-cursor-pointer">Выберите файл</div>

                                    <p className="tw-text-sm tw-text-white tw-font-light tw-opacity-60" onClick={e => e.preventDefault()}>
                                        {this.state.scan ? this.state.scan.name : 'Файл не выбран'}
                                    </p>
                                </label>
                            </div>

                            <div className="tw-col-span-2">
                                <div className="tw-w-48 tw-h-32 tw-h-full tw-ml-auto tw-bg-cover tw-bg-center tw-bg-no-repeat tw-rounded-md"
                                     style={{ backgroundImage: 'url(/images/scan-attachment-default-bg.png)' }} />
                            </div>
                        </div>
                    </div>

                    <button className={sendButtonStyles}
                            onClick={async _ => {
                                if (!canSend) {
                                    return;
                                }

                                await this.send();
                            }}>
                        Отправить запрос
                    </button>
                </div>
            </div>
        );
    }
}

Verification.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    middleName: PropTypes.string,
    phoneNumber: PropTypes.string
};

const mapStateToProps = ({ user }) => {
    if (user.user === null) {
        return {
            firstName: '',
            lastName: '',
            middleName: '',
            phoneNumber: ''
        };
    }

    const userData = userPresenter(user.user);

    return {
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        middleName: userData.middleName || '',
        phoneNumber: userData.phoneNumber
    };
};

export default connect(mapStateToProps)(Verification);