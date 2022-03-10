const INIT_STATE = {
    user: null,
    transactionsHistory: null
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
        case 'SET_TRANSACTIONS_HISTORY':
            return {
                ...state,
                transactionsHistory: action.payload
            };
        case 'UNSET_TRANSACTIONS_HISTORY':
            return {
                ...state,
                transactionsHistory: null
            };
        default:
            return state;
    }
};

export default reducer;