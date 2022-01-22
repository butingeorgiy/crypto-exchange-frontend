import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Announcement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true
        };
    }

    render() {
        if (!this.state.visible) {
            return null;
        }

        const { text, link = '' } = this.props;
        const content = link
            ? <a className="tw-text-white tw-font-light" href={link} target="_blank" rel="noreferrer">{text}</a>
            : <p className="tw-text-white tw-font-light">{text}</p>;

        return (
            <div className="tw-bg-red">
                <div className="tw-container tw-mx-auto tw-px-5 tw-py-2">
                    <div className="tw-flex tw-justify-center tw-items-center">
                        <span className="tw-min-w-5 tw-w-5 tw-min-h-5 tw-h-5 tw-mr-3 tw-bg-contain tw-bg-center tw-bg-no-repeat"
                            style={{ backgroundImage: 'url(./images/icons/announcement-warning.svg)' }} />

                        {content}

                        <span className="tw-min-w-4 tw-w-4 tw-min-h-4 tw-h-4 tw-ml-3 tw-bg-contain tw-bg-center tw-bg-no-repeat tw-cursor-pointer"
                              onClick={_ => this.setState({ visible: false })}
                              style={{ backgroundImage: 'url(./images/icons/cross-black.svg)' }} />
                    </div>
                </div>
            </div>
        );
    }
}

Announcement.propTypes = {
    text: PropTypes.string.isRequired,
    link: PropTypes.string
};

export default Announcement;