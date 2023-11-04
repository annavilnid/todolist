export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    error: null as null | string,
    status: 'loading' as RequestStatusType
}

export type SetAppStatus = ReturnType<typeof SetAppStatusAC>
export type SetAppError = ReturnType<typeof SetAppErrorAC>

type InitialStateType = typeof initialState

type ActionsType =
    SetAppStatus
    | SetAppError
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.payload.status}
        case "APP/SET-ERROR":
            return {...state, error: action.payload.error}
        default:
            return state
    }
}

export const SetAppStatusAC = (payload: {
    status: RequestStatusType,
}) => ({type: "APP/SET-STATUS", payload} as const)

export const SetAppErrorAC = (payload: {
    error: null | string,
}) => ({type: "APP/SET-ERROR", payload} as const)



