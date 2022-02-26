const INIT_STATE = {
    directions: null
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'SET_DIRECTIONS':
            return {
                ...state,
                directions: action.payload
            };
        default:
            return state;
    }
};

export default reducer;