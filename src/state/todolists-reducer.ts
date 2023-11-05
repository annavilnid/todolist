import {v1} from "uuid";
import {TaskType, todolistsAPI, TodolistType, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {SetAppStatusAC, SetAppStatus, RequestStatusType} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/utils-error";
import {AxiosError} from "axios";

type Filter = "all" | "completed" | "active"

const initialState: Array<TodolistType & {filter: Filter, entityStatus: RequestStatusType}> = []

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    payload: {
        todolistId: string,
    }
}

export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    payload: {
        todolist: TodolistType,
    }
}

export type ChangeTitleTodolistActionType = {
    type: "TODOLIST/CHANGE-TODOLIST-TITLE",
    payload: {
        todolistId: string,
        title: string,
    }
}

export type ChangeFilterTodolistActionType = {
    type: "TODOLIST/CHANGE-TODOLIST-FILTER",
    payload: {
        todolistId: string,
        filter: Filter,
    }
}

export type SetTodolistActionType = ReturnType<typeof SetTodolistAC>

export type SetEntityStatusType = ReturnType<typeof SetEntityStatusAC>


type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTitleTodolistActionType
    | ChangeFilterTodolistActionType
    | SetTodolistActionType
    | SetAppStatus
    | SetEntityStatusType

export const todolistsReducer = (state: Array<TodolistType & {filter: Filter, entityStatus: RequestStatusType}> = initialState, action: ActionType): Array<TodolistType & {filter: Filter, entityStatus: RequestStatusType}> => {
    switch (action.type) {
        case "TODOLIST/SET-TODOLISTS":
            return action.payload.todolists.map(t=>({...t, filter: "all", entityStatus: "idle"}))
        case "REMOVE-TODOLIST":
            return state.filter(todolist => todolist.id !== action.payload.todolistId)
        case "ADD-TODOLIST":
            return [{...action.payload.todolist, filter: "all", entityStatus: "idle"}, ...state]
        case "TODOLIST/CHANGE-TODOLIST-TITLE":
            return state.map(todolist => todolist.id === action.payload.todolistId ? {...todolist, title: action.payload.title}: todolist)
        case 'TODOLIST/CHANGE-TODOLIST-FILTER':
            return state.map(todolist => todolist.id === action.payload.todolistId ? {...todolist, filter: action.payload.filter}: todolist)
        case "TODOLIST/SET-ENTITY-STATUS":
            return state.map(todolist => todolist.id === action.payload.todolistId ? {...todolist, entityStatus: action.payload.entityStatus}: todolist)
        default:
            return state
    }
}


export const RemoveTodolistAC = (payload: {todolistId: string}): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", payload}
}

export const AddTodolistAC = (payload: {todolist: TodolistType}): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", payload }
}

export const ChangeTitleTodolistAC = (payload: { todolistId: string, title: string}): ChangeTitleTodolistActionType => {
    return {type: "TODOLIST/CHANGE-TODOLIST-TITLE", payload}
}

export const ChangeFilterTodolistAC = (payload: {todolistId: string, filter: Filter}): ChangeFilterTodolistActionType => {
    return {type: "TODOLIST/CHANGE-TODOLIST-FILTER", payload}
}

export const SetTodolistAC = (payload: {todolists: TodolistType[]}) => ({type: "TODOLIST/SET-TODOLISTS", payload} as const)

export const SetEntityStatusAC = (payload: {todolistId: string, entityStatus: RequestStatusType}) => ({type: "TODOLIST/SET-ENTITY-STATUS", payload} as const)

export const SetTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC({status: "loading"}))
    todolistsAPI.getTodolists()
        .then((resData) => {
                dispatch(SetTodolistAC({todolists: resData.data}))
                dispatch(SetAppStatusAC({status: "succeeded"}))
        })
        .catch((e: AxiosError<{ message: string }>) => {
            const error = e.response?.data ? e.response?.data?.message : e.message
            handleServerNetworkError({message: error}, dispatch)
            dispatch(SetAppStatusAC({status: "failed"}))
        })
}

export const RemoveTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(SetEntityStatusAC({todolistId, entityStatus: "loading"}))
    dispatch(SetAppStatusAC({status: "loading"}))
    todolistsAPI.deleteTodolist(todolistId)
        .then((resData) => {
            if (resData.data.resultCode === 0) {
                dispatch(RemoveTodolistAC({todolistId}))
                dispatch(SetAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(resData.data, dispatch)
                dispatch(SetAppStatusAC({status: "failed"}))
            }
        })
        .catch((e: AxiosError<{message: string}>) => {
            const error = e.response?.data ? e.response?.data?.message : e.message
            handleServerNetworkError({message: error},dispatch)
            dispatch(SetAppStatusAC({status: "failed"}))
        })
        .finally(()=> {
            dispatch(SetEntityStatusAC({todolistId, entityStatus: "idle"}))
        })
}

export const AddTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC({status: "loading"}))
    todolistsAPI.createTodolist(title)
        .then((resData) => {
            if (resData.data.resultCode === 0 ) {
                dispatch(AddTodolistAC({todolist: resData.data.data.item}))
                dispatch(SetAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError<{ item: TodolistType }>(resData.data, dispatch)
                dispatch(SetAppStatusAC({status: "failed"}))
            }
        })
        .catch((e: AxiosError<{message: string}>) => {
            const error = e.response?.data ? e.response?.data?.message : e.message
            handleServerNetworkError({message: error},dispatch)
            dispatch(SetAppStatusAC({status: "failed"}))
        })
}

export const ChangeTitleTodolistTC = (id: string, title: string) => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC({status: "loading"}))
    todolistsAPI.updateTodolist(id, title)
        .then((resData) => {
            if (resData.data.resultCode === 0 ) {
                dispatch(ChangeTitleTodolistAC({todolistId: id, title}))
                dispatch(SetAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(resData.data, dispatch)
                dispatch(SetAppStatusAC({status: "failed"}))
            }
        })
        .catch((e: AxiosError<{ message: string }>) => {
            const error = e.response?.data ? e.response?.data?.message : e.message
            handleServerNetworkError({message: error}, dispatch)
            dispatch(SetAppStatusAC({status: "failed"}))
        })
}