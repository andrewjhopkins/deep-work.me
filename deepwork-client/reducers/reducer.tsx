import { defaultTimes, displayNames } from "../utils/constants"

const reducer = (state, action) => {
    switch (action.type) {
        case "start_timer":
            return {
                ...state, timerRunning: true, timeLeft: action.timeLeft, toastMessage: "Timer started", toastShow: action.toastShow, toastColor: "blue"
            }
        case "stop_timer":
            return {
                ...state, timerRunning: false, timeLeft: action.timeLeft, toastMessage: "Timer stopped", toastShow: action.toastShow, toastColor: "indigo"
            }
        case "reset_timer":
            return {
                ...state, timeLeft: defaultTimes[action.timerMode], toastMessage: "Timer reset", toastShow: action.toastShow, toastColor: "red"
            }
        case "timer_complete":
            return {
                ...state, timerRunning: false, toastMessage: `${displayNames[state.timerMode]} complete!`, toastShow: true, toastColor: "green"
            }
        case "change_timer_mode":
            let timeLeft: number = state.timerMode != action.timerMode ? defaultTimes[action.timerMode] : action.timeLeft;
            return {
                ...state, timerRunning: false, timeLeft: timeLeft, timerMode: action.timerMode, toastMessage: `Changed to ${displayNames[action.timerMode]}`, toastShow: action.toastShow, toastColor: "blue"
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