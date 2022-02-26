import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { updateUserData } from '../../store/user/actions';

// Helpers
import { mapToFormData } from '../../helpers/form-data.helper';
import { parseKeysFromCamelToCase } from '../../helpers/structure.helper';
import { errorToast, confirmPopup, successPopup } from '../../helpers/swal.helper';

// Presenters
import userPresenter from '../../presenters/user.presenter';

// Components
import InputMask from 'react-input-mask';

class PersonalData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            firstName: props.firstName,
            lastName: props.lastName,
            middleName: props.middleName,
            phoneNumber: props.phoneNumber,
            updated: {}
        };
    }

    /**
     * Handle fields updating.
     *
     * @param key
     * @param value
     */
    onFieldUpdateHandler(key, value) {
        this.setState({
            [key]: value
        });

        let updated = this.state.updated;

        if (this.props[key] !== value) {
            updated = {
                ...updated,
                [key]: value
            };

            this.setState({ updated });
            return;
        }

        // If field was not updated
        if (updated.hasOwnProperty(key)) {
            delete updated[key];

            this.setState({ updated });
        }
    }

    /**
     * Update user data.
     *
     * @return {Promise<void>}
     */
    async updateUserData() {
        const loading = this.state.loading;

        if (loading) {
            return;
        }

        const confirming = await confirmPopup('Подтвердите изменение данных.');

        if (!confirming.isConfirmed) {
            return;
        }

        this.setState({ loading: true });

        const updated = mapToFormData(this.state.updated);

        await axios.post('users/current/update', updated)
            .then(({ data: { message }}) => {
                // Update redux store
                this.props.updateUserData(
                    parseKeysFromCamelToCase(this.state.updated)
                );

                this.setState({ updated: {} });

                successPopup(message);
            })
            .catch(error => {
                errorToast(error.response?.data.message || error.message);
            });

        this.setState({ loading: false });
    }

    render() {
        const hasUpdatedFields = Object.entries(this.state.updated).length > 0;

        let updateButtonStyles = 'tw-py-3 tw-text-sm tw-text-white tw-bg-blue tw-rounded-md tw-cursor-not-allowed tw-opacity-50';

        if (hasUpdatedFields) {
            updateButtonStyles = 'tw-py-3 tw-text-sm tw-text-white tw-bg-blue tw-rounded-md';
        }

        if (this.state.loading) {
            updateButtonStyles = 'tw-py-3 tw-text-sm tw-text-white tw-bg-blue tw-rounded-md tw-cursor-progress tw-opacity-50';
        }

        return (
            <div className="tw-flex tw-flex-col">
                <p className="tw-mb-3 tw-text-xl tw-text-white tw-font-light">Личные данные</p>

                <div className="tw-flex tw-flex-col tw-px-4 tw-py-4 tw-bg-blue-dark tw-rounded-md">
                    <div className="tw-flex tw-flex-col tw-mb-3">
                        <p className="tw-mb-1 tw-text-sm tw-text-white tw-font-light">Имя:</p>

                        <input className="simple-input tw-text-white tw-bg-blue-dark tw-border-gray-medium"
                               type="text"
                               onChange={e => this.onFieldUpdateHandler('firstName', e.target.value)}
                               value={this.state.firstName}
                               placeholder="Введите имя" />
                    </div>

                    <div className="tw-flex tw-flex-col tw-mb-3">
                        <p className="tw-mb-1 tw-text-sm tw-text-white tw-font-light">Фамилия:</p>

                        <input className="simple-input tw-text-white tw-bg-blue-dark tw-border-gray-medium"
                               type="text"
                               onChange={e => this.onFieldUpdateHandler('lastName', e.target.value)}
                               value={this.state.lastName}
                               placeholder="Введите фамилию" />
                    </div>

                    <div className="tw-flex tw-flex-col tw-mb-3">
                        <p className="tw-mb-1 tw-text-sm tw-text-white tw-font-light">Отчество:</p>

                        <input className="simple-input tw-text-white tw-bg-blue-dark tw-border-gray-medium"
                               type="text"
                               onChange={e => this.onFieldUpdateHandler('middleName', e.target.value)}
                               value={this.state.middleName}
                               placeholder="Введите отчество" />
                    </div>

                    <div className="tw-flex tw-flex-col tw-mb-5">
                        <p className="tw-mb-1 tw-text-sm tw-text-white tw-font-light">Номер телефона:</p>

                        <InputMask className="simple-input tw-text-white tw-bg-blue-dark tw-border-gray-medium"
                                   type="text"
                                   mask="+7 (999) 999 9999"
                                   onChange={e => this.onFieldUpdateHandler('phoneNumber', e.target.value.replace(/\D/g, ''))}
                                   value={this.state.phoneNumber}
                                   placeholder="Введите номер телефона" />
                    </div>

                    <button className={updateButtonStyles}
                            onClick={async _ => {
                                if (!hasUpdatedFields) {
                                    return;
                                }

                                await this.updateUserData();
                            }}>
                        Сохранить
                    </button>
                </div>
            </div>
        );
    }
}

PersonalData.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    middleName: PropTypes.string,
    phoneNumber: PropTypes.string,
    updateUserData: PropTypes.func
};

const mapStateToProps = ({ user }) => {
    const userData = userPresenter(user.user);

    return {
        firstName: userData.firstName,
        lastName: userData.lastName,
        middleName: userData.middleName,
        phoneNumber: userData.phoneNumber
    };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateUserData
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(PersonalData);