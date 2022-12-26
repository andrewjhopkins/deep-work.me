import { timeSettingsDefault } from "../context/Context"
import { action } from "./reducerActions"

const reducer = (state, action) => {
    switch (action.type) {
        case action.start_timer:
            return {
                ...state, timerRunning: true, timeLeft: action.timeLeft, toastMessage: "Timer started", toastShow: action.toastShow, toastColor: "blue"
            }
        case action.stop_timer:
            return {
                ...state, timerRunning: false, timeLeft: action.timeLeft, toastMessage: "Timer stopped", toastShow: action.toastShow, toastColor: "indigo"
            }
        case action.reset_timer:
            return {
                ...state, timeLeft: state.timeSettings[action.timerMode].initialTime, toastMessage: "Timer reset", toastShow: action.toastShow, toastColor: "red"
            }
        case action.timer_complete:
            return {
                ...state, timerRunning: false, toastMessage: `${state.timeSettings[state.timerMode].name} complete!`, toastShow: true, toastColor: "green"
            }
        case action.change_timer_mode:
            let timeLeft: number = state.timerMode != action.timerMode ? state.timeSettings[action.timerMode].initialTime : action.timeLeft;
            return {
                ...state, timerRunning: false, timeLeft: timeLeft, timerMode: action.timerMode, toastMessage: `Changed to ${state.timeSettings[action.timerMode].name}`, toastShow: action.toastShow, toastColor: "blue"
            }
        case action.hide_toast:
            return {
                ...state, toastShow: false
            }
        case action.toggle_show_settings:
            return {
                ...state, showSettings: !state.showSettings
            }
        case action.update_time_settings:
            localStorage.setItem("deep-work:settings:time", JSON.stringify(action.timeSettings));
            return {
                ...state, timeLeft: action.timeSettings[state.timerMode].initialTime, timeSettings: action.timeSettings
            }
        case action.default_time_settings:
            localStorage.setItem("deep-work:settings:time", JSON.stringify(timeSettingsDefault));
            return {
                ...state, timeLeft: timeSettingsDefault[state.timerMode].initialTime, timeSettings: structuredClone(timeSettingsDefault)
            }
        case action.update_task_list:
            localStorage.setItem("deep-work:taskitems", JSON.stringify(action.taskItems));
            return {
                ...state, taskItems: action.taskItems
            }
        case action.update_background_effect:
            localStorage.setItem("deep-work:settings:backgroundEffect", JSON.stringify(action.backgroundEffect));
            return {
                ...state, backgroundEffect: action.backgroundEffect
            }
        default:
            return state;
    }
}

export default reducer;