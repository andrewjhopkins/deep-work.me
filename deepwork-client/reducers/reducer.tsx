const defaultPomodoroTime = 1500;
const defaultShortBreakTime = 300;
const defaultLongBreakTime = 900;

const defaultTimes = {
    "pomodoro": 1500,
    "short-break": 300,
    "long-break": 900
}

const reducer = (state, action) => {
    switch (action.type) {
        case "start_timer":
            return {
                ...state, timerRunning: true, timeLeft: action.timeLeft > 0 ? action.timeLeft : defaultTimes[action.timerMode] 
            }
        case "stop_timer":
            return {
                ...state, timerRunning: false, timeLeft: action.timeLeft > 0 ? action.timeLeft : defaultTimes[action.timerMode] 
            }
        case "change_timer_mode":
            let timeLeft: number = state.timerMode != action.timerMode ? defaultTimes[action.timerMode] : action.timeLeft;
            return {
                ...state, timerRunning: action.timerRunning, timeLeft: timeLeft, timerMode: action.timerMode
            }
        default:
            return state;
    }
}

export default reducer;