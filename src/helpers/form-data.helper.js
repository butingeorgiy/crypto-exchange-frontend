import { camelToSnakeCase } from './string.helper';

export const mapToFormData = payload => {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
        const payloadKey = camelToSnakeCase(key);

        if (typeof value === 'object' && value.constructor.name !== 'File') {
            formData.append(payloadKey, JSON.stringify(value));
        } else {
            console.log(value);
            formData.append(payloadKey, value);
        }
    });

    return formData;
};
