import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <header className="tw-bg-blue-dark">
                <div className="tw-container tw-mx-auto tw-px-5 tw-py-4">
                    <div className="tw-flex tw-justify-between">
                        <div className="tw-flex">
                            <Link to="/">
                                <img className="tw-w-52 tw-mr-16" src="./images/logo.png" alt="Logo" />
                            </Link>

                            <span className="tw-h-full tw-w-0.5 tw-bg-white tw-border tw-border-white tw-opacity-20 tw-rounded-2xl" />
                        </div>

                        <div className="tw-flex tw-items-center">
                            <div className="tw-flex tw-mr-16">
                                <Link className="tw-mr-6 last:tw-mr-0 tw-text-white tw-font-light" to="/transfer">Обмен</Link>
                                <Link className="tw-mr-6 last:tw-mr-0 tw-text-white tw-font-light" to="/help">Помощь</Link>
                                <Link className="tw-mr-6 last:tw-mr-0 tw-text-white tw-font-light" to="/contact">Контакты</Link>
                                <Link className="tw-mr-6 last:tw-mr-0 tw-text-white tw-font-light" to="/reviews">Отзывы</Link>
                            </div>

                            <div className="tw-flex">
                                <a className="tw-mr-5 last:tw-mr-0" href="https://web.telegram.org" target="_blank" rel="noreferrer">
                                    <img className="tw-w-5" src="./images/icons/telegram-white.svg" alt="Telegram Icon" />
                                </a>

                                <a className="tw-mr-5 last:tw-mr-0" href="https://www.whatsapp.com" target="_blank" rel="noreferrer">
                                    <img className="tw-w-5" src="./images/icons/whatsapp-white.svg" alt="WhatsApp Icon" />
                                </a>

                                <a className="tw-mr-5 last:tw-mr-0" href="https://instagram.com" target="_blank" rel="noreferrer">
                                    <img className="tw-w-5" src="./images/icons/instagram-white.svg" alt="Instagram Icon" />
                                </a>
                            </div>
                        </div>

                        <div className="tw-flex">
                            <span className="tw-h-full tw-w-0.5 tw-bg-white tw-border tw-border-white tw-opacity-20 tw-rounded-2xl" />

                            <div className="tw-ml-16 tw-px-10 tw-py-2 tw-text-sm tw-text-white tw-border-2 tw-border-blue tw-rounded-md tw-cursor-pointer">Войти</div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;