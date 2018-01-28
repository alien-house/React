export function addCounter(num) {
    return {
        type: 'ADD_COUNTER',
        payload: num
    }
}
export function resetCounter(num) {
    return {
        type: 'RESET_COUNTER',
    }
}
export function setButton(num) {
    return {
        type: 'SET_BUTTON',
        payload: num
    }
}