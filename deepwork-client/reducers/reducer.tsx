const defaultWorkTime = 1500;
const defaultBreakTime = 300;

const reducer = (state = {}, action) => {
    switch (action.type) {
        case "start_timer":
            return {
                ...state, timerRunning: true, timeLeft: action.timeLeft > 0 ? action.timeLeft : defaultWorkTime 
            }
        case "stop_timer":
            return {
                ...state, timerRunning: false, timeLeft: action.timeLeft > 0 ? action.timeLeft : defaultWorkTime
            }
        case "change_timer_mode":
            return {
                ...state, timerRunning: false, timeLeft: action.timeLeft > 0 ? action.timeLeft : defaultWorkTime, timerMode: action.timerMode
            }
        default:
            return state;
    }
}

export default reducer;