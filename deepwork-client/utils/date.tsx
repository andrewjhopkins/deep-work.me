export function serializeDate(date: Date) {
    let serialized = [date.getHours(), padStartWithZeros(date.getMinutes(), 2)].join(":");
    serialized += date.getHours() >= 12 ? "pm" : "am";
    return serialized;
}

function padStartWithZeros(value: number, totalStringSize: number) {
    return value.toString().padStart(totalStringSize, "0");
}

export function formatSecondsIntoMinutesAndSeconds(value: number) {
    const seconds = padStartWithZeros(value % 60, 2);
    const minutes = padStartWithZeros(Math.floor(value / 60), 2);
    return [minutes, seconds].join(":");
}