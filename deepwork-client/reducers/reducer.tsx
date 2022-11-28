const defaultTimes = {
    "pomodoro": 1500,
    "short-break": 300,
    "long-break": 900
}

const displayNames = {
    "pomodoro": "Pomodoro",
    "short-break": "Short Break",
    "long-break": "Long Break",
}

const reducer = (state, action) => {
    switch (action.type) {
        case "start_timer":
            return {
                ...state, timerRunning: true, timeLeft: action.timeLeft, toastMessage: "Timer started", toastShow: action.toastShow
            }
        case "stop_timer":
            return {
                ...state, timerRunning: false, timeLeft: action.timeLeft, toastMessage: "Timer stopped", toastShow: action.toastShow
            }
        case "reset_timer":
            return {
                ...state, timeLeft: defaultTimes[action.timerMode], toastMessage: "Timer reset", toastShow: action.toastShow
            }
        case "change_timer_mode":
            let timeLeft: number = state.timerMode != action.timerMode ? defaultTimes[action.timerMode] : action.timeLeft;
            return {
                ...state, timerRunning: false, timeLeft: timeLeft, timerMode: action.timerMode, toastMessage: `Changed to ${displayNames[action.timerMode]}`, toastShow: action.toastShow
            }
        case "hide_toast":
            return {
                ...state, toastShow: false
            }
        default:
            return state;
    }
}

export default reducer;