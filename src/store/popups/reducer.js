const INIT_STATE = {
    loginOpened: false,
    registrationOpened: false
};

const reducer = (state = INIT_STATE, action) => {
    if (!['OPEN_POPUP', 'CLOSE_POPUP'].includes(action.type)) {
        return state;
    }

    const { popupType = null } = action.payload || {};

    if (!state.hasOwnProperty(`${popupType}Opened`)) {
        console.error(`Popup \`${popupType}Opened\` not found.`);

        return state;
    }

    switch (action.type) {
        case 'OPEN_POPUP':
            return {
                ...state,
                [`${popupType}Opened`]: true
            };
        case 'CLOSE_POPUP':
            return {
                ...state,
                [`${popupType}Opened`]: false
            };
        default:
            return state;
    }
};

export default reducer;