export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.payload.status}
        default:
            return state
    }
}

export const ChangeStatusAC = (payload: {
    status: RequestStatusType,
}) => ({type: "APP/SET-STATUS", payload} as const)


type ActionsType = ReturnType<typeof ChangeStatusAC>

