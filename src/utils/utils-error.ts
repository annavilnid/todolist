import { SetAppErrorAC, SetAppError, SetAppStatusAC, SetAppStatus } from '../app/app-reducer'
import { Dispatch } from 'redux'
import { ResponseType } from '../api/todolist-api'

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(SetAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(SetAppErrorAC({error: 'Some error occurred'}))
    }
    dispatch(SetAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(SetAppErrorAC({error: error.message}))
    dispatch(SetAppStatusAC({status: 'failed'}))
}

type ErrorUtilsDispatchType = Dispatch<SetAppError | SetAppStatus>
