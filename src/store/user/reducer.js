const INIT_STATE = {
    user: null
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                user: action.payload
            };
        case 'UPDATE_USER_DATA':
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            };
        case 'UNSET_USER_DATA':
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
};

export default reducer;