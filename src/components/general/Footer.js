import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <footer className="tw-bg-blue-dark">
                <div className="tw-container tw-mx-auto tw-px-5 tw-py-5">
                    <div className="tw-grid tw-grid-cols-12">
                        <div className="tw-col-span-5">
                            <p className="tw-text-sm tw-text-gray-medium">© 2021 - { (new Date()).getFullYear() } Coin Exchange.</p>
                            <p className="tw-mb-2 tw-text-sm tw-text-gray-medium">Все права защищены.</p>

                            <div className="tw-flex">
                                <Link className="tw-mr-5 tw-text-sm tw-text-gray-medium tw-underline" to="#">Соглашение</Link>
                                <Link className="tw-text-sm tw-text-gray-medium tw-underline" to="#">Предупреждение</Link>
                            </div>
                        </div>
                        <div className="tw-col-span-2 tw-flex tw-justify-center tw-items-center">
                            <a className="tw-mr-8 last:tw-mr-0" href="https://web.telegram.org" target="_blank" rel="noreferrer">
                                <img src="./images/icons/telegram-gray.svg" alt="Telegram Icon" />
                            </a>

                            <a className="tw-mr-8 last:tw-mr-0" href="https://www.whatsapp.com" target="_blank" rel="noreferrer">
                                <img src="./images/icons/whatsapp-gray.svg" alt="WhatsApp Icon" />
                            </a>

                            <a className="tw-mr-8 last:tw-mr-0" href="https://instagram.com" target="_blank" rel="noreferrer">
                                <img src="./images/icons/instagram-gray.svg" alt="Instagram Icon" />
                            </a>
                        </div>

                        <div className="tw-col-span-5">
                            <div className="tw-flex tw-flex-col tw-items-end">
                                <a className="tw-flex tw-items-center tw-mb-2 tw-pb-1.5 tw-border-b tw-border-white tw-border-opacity-60" href="tel:+77777777777">
                                    <span className="tw-min-w-6 tw-w-6 tw-min-h-6 tw-h-6 tw-mr-2 tw-bg-contain tw-bg-center tw-bg-no-repeat" style={{ backgroundImage: 'url(./images/icons/phone-gray.svg)' }} />
                                    <span className="tw-text-lg tw-text-gray-medium">+7 (777) 777 7777</span>
                                </a>

                                <p className="tw-text-sm tw-text-gray-medium">Ежедневно с 10:00 до 00:00 по времени Алматы.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;