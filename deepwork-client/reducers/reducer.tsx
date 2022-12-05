import { timeSettingsDefault } from "../context/PomodoroContext"

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
                ...state, timeLeft: state.timeSettings[action.timerMode].initialTime, toastMessage: "Timer reset", toastShow: action.toastShow, toastColor: "red"
            }
        case "timer_complete":
            return {
                ...state, timerRunning: false, toastMessage: `${state.timeSettings[state.timerMode].name} complete!`, toastShow: true, toastColor: "green"
            }
        case "change_timer_mode":
            let timeLeft: number = state.timerMode != action.timerMode ? state.timeSettings[action.timerMode].initialTime : action.timeLeft;
            return {
                ...state, timerRunning: false, timeLeft: timeLeft, timerMode: action.timerMode, toastMessage: `Changed to ${state.timeSettings[action.timerMode].name}`, toastShow: action.toastShow, toastColor: "blue"
            }
        case "hide_toast":
            return {
                ...state, toastShow: false
            }
        case "toggle_show_settings":
            return {
                ...state, showSettings: !state.showSettings
            }
        case "update_time_settings":
            return {
                ...state, timeLeft: action.timeSettings[state.timerMode].initialTime, timeSettings: action.timeSettings
            }
        case "default_time_settings":
            return {
                ...state, timeLeft: timeSettingsDefault[state.timerMode].initialTime, timeSettings: structuredClone(timeSettingsDefault)
            }
        default:
            return state;
    }
}

export default reducer;