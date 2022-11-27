const reducer = (state = {}, action) => {

    console.log(action.type);

    switch (action.type) {
        case "start_timer":
            return {
                ...state, timerRunning: true
            }
        case "stop_timer":
            return {
                ...state, timerRunning: false
            }
        default:
            return state;
    }
}

export default reducer;