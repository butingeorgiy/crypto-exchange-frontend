import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Presenters
import userPresenter from '../../presenters/user.presenter';

// Components
import { Link } from 'react-router-dom';

class ProfileCard extends Component {
    render() {
        const { firstName, lastName, isVerified, refCode, transfersAmount } = this.props.user;

        let verificationStatus = (
            <Link className="tw-flex tw-justify-center tw-items-center tw-py-4 tw-bg-yellow tw-rounded-md"
                  to="/profile/verification">
                <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-5 tw-w-5 tw-mr-2 tw-text-white"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955
                              0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332
                              9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>

                <p className="tw-text-sm tw-text-white tw-font-light">Не верифицирован</p>
            </Link>
        );

        if (isVerified) {
            verificationStatus = (
                <div className="tw-flex tw-justify-center tw-items-center tw-py-4 tw-bg-white tw-rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-5 tw-w-5 tw-mr-2 tw-text-blue"
                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955
                              0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332
                              9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>

                    <p className="tw-text-sm tw-text-blue tw-font-light">Верифицирован</p>
                </div>
            );
        }

        return (
            <div className="tw-px-4 tw-py-4 tw-bg-blue-dark tw-rounded-md">
                <div className="tw-flex tw-justify-center tw-items-center tw-mb-5">
                    <img className="tw-w-8 tw-mr-3" src={'/images/default-profile-photo.svg'} alt="Default Avatar" />

                    <p className="tw-text-sm tw-text-white tw-font-light">{ `${lastName || 'Анонимов'} ${firstName || 'Аноним'}` }</p>
                </div>

                <div className="tw-flex tw-flex-col tw-mb-2">
                    <div className="tw-flex tw-justify-between tw-text-sm tw-text-white tw-font-light">
                        <p>Кол-во сделок:</p>
                        <p>{ transfersAmount }</p>
                    </div>
                </div>

                <div className="tw-flex tw-flex-col tw-mb-3">
                    <p className="tw-mb-1.5 tw-text-sm tw-text-white tw-font-light">Реферальная ссылка:</p>

                    <div className="tw-flex tw-justify-center tw-items-center tw-py-3 tw-bg-blue tw-rounded-md">
                        <p className="tw-relative tw-top-0.5 tw-mr-2 tw-text-xl tw-font-light tw-text-white tw-uppercase tw-underline">{ refCode }</p>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             className="tw-h-5 tw-w-5 tw-text-white tw-opacity-60"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656
                                  5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </div>
                </div>

                { verificationStatus }
            </div>
        );
    }
}

ProfileCard.propTypes = {
    user: PropTypes.object
};

const mapStateToProps = ({ user }) => ({
    user: userPresenter(user.user)
});

export default connect(mapStateToProps)(ProfileCard);