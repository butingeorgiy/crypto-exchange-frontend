export const isFloat = number => {
    return Number(number) === number && number % 1 !== 0;
};