const reducer = (state = {}, action) => {
    switch (action.type) {
        case "start_timer":
            return {
                ...state, timerRunning: true, timeLeft: action.timeLeft > 0 ? action.timeLeft : 1500
            }
        case "stop_timer":
            return {
                ...state, timerRunning: false, timeLeft: action.timeLeft > 0 ? action.timeLeft : 1500
            }
        default:
            return state;
    }
}

export default reducer;