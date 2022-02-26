import { camelToSnakeCase } from './string.helper';

export const parseKeysFromCamelToCase = payload => {
    let output = {};

    Object.entries(payload).forEach(([key, value]) => {
        output[camelToSnakeCase(key)] = value;
    });

    return output;
};
