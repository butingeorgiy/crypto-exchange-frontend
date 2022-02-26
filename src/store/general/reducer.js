const INIT_STATE = {
    dashboardItems: null,
    initDataLoading: true
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'STOP_INIT_LOADING':
            return {
                ...state,
                initDataLoading: false
            };
        case 'SET_DASHBOARD_ITEMS':
            return {
                ...state,
                dashboardItems: action.payload
            };
        default:
            return state;
    }
};

export default reducer;