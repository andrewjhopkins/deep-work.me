const reducer = (state = {}, action) => {
    switch (action.type) {
        case "start_timer":
            return {
                ...state, timerRunning: true, timeLeft: action.timeLeft
            }
        case "stop_timer":
            return {
                ...state, timerRunning: false, timeLeft: action.timeLeft
            }
        default:
            return state;
    }
}

export default reducer;