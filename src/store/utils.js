export const updatedState = (oldState, newState) => {
    return {
        ...oldState,
        ...newState
    }
}