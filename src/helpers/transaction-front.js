export const resolveBgColor = (color, failedCallback = null) => {
    if (color === 'red') {
        return '#F14635'
    } else if (color === 'green') {
        return '#26A17B';
    } else if (color === 'yellow') {
        return '#F7931A';
    } else if (color === 'grey') {
        return '#727272';
    } else if (color === 'emerald') {
        return 'linear-gradient(90deg, #00D2FF 0%, #3A7BD5 100%)';
    } else if (color === 'blue') {
        return '#054CF5';
    } else if (color === 'light-blue') {
        return 'linear-gradient(90deg, #2800D4 0%, #4364F7 50%, #6FB1FC 100%)';
    } else {
        console.error(`Unknown color: ${color}`);

        if (failedCallback !== null) {
            failedCallback(color);
        }

        return '#727272';
    }
};