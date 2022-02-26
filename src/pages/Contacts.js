import React, { Component } from 'react';

// Layouts
import MainLayout from '../layouts/Main';

class Contacts extends Component {
    render() {
        return (
            <MainLayout>
                <div className="tw-container tw-mx-auto tw-px-5 tw-py-10 tw-min-h-screen-without-header-and-footer">
                    <p className="tw-mb-5 tw-text-2xl tw-text-white">Контакты</p>

                    <p className="tw-text-white tw-font-light tw-whitespace-pre-wrap">Идейные соображения высшего порядка, а также новая модель организационной деятельности способствует подготовки и реализации форм развития. С другой стороны дальнейшее развитие различных форм деятельности требуют определения и уточнения новых предложений. Значимость этих проблем настолько очевидна, что реализация намеченных плановых заданий позволяет оценить значение системы обучения кадров, соответствует насущным потребностям. Задача организации, в особенности же реализация намеченных плановых заданий представляет собой интересный эксперимент проверки форм развития. Разнообразный и богатый опыт рамки и место обучения кадров требуют определения и уточнения систем массового участия. Товарищи! укрепление и развитие структуры влечет за собой процесс внедрения и модернизации позиций, занимаемых участниками в отношении поставленных задач.</p>
                </div>
            </MainLayout>
        );
    }
}

export default Contacts;