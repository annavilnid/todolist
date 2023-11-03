import {v1} from "uuid";
import {todolistsAPI, TodolistType, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {ChangeStatusAC} from "../app/app-reducer";

type Filter = "all" | "completed" | "active"

const initialState: Array<TodolistType & {filter: Filter}> = []

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
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
        todolistId: string,
        title: string,
    }
}

export type ChangeFilterTodolistActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
        todolistId: string,
        filter: Filter,
    }
}

export type SetTodolistActionType = ReturnType<typeof SetTodolistAC>


type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTitleTodolistActionType
    | ChangeFilterTodolistActionType
    | SetTodolistActionType

export const todolistsReducer = (state: Array<TodolistType & {filter: Filter}> = initialState, action: ActionType): Array<TodolistType & {filter: Filter}> => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.payload.todolists.map(t=>({...t, filter: "all"}))
        case "REMOVE-TODOLIST":
            return state.filter(todolist => todolist.id !== action.payload.todolistId)
        case "ADD-TODOLIST":
            return [{...action.payload.todolist, filter: "all"}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(todolist => todolist.id === action.payload.todolistId ? {...todolist, title: action.payload.title}: todolist)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todolist => todolist.id === action.payload.todolistId ? {...todolist, filter: action.payload.filter}: todolist)
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
    return {type: "CHANGE-TODOLIST-TITLE", payload}
}

export const ChangeFilterTodolistAC = (payload: {todolistId: string, filter: Filter}): ChangeFilterTodolistActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", payload}
}

export const SetTodolistAC = (payload: {todolists: TodolistType[]}) => ({type: "SET-TODOLISTS", payload} as const)

export const SetTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(ChangeStatusAC({status: "loading"}))
    todolistsAPI.getTodolists()
        .then((resData) => {
            dispatch(SetTodolistAC({todolists: resData.data}))
            dispatch(ChangeStatusAC({status: "succeeded"}))
        })
}

export const RemoveTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then((resData) => {
            if (resData.data.resultCode === 0 ) {
                dispatch(RemoveTodolistAC({todolistId}))
            }
        })
}

export const AddTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
        .then((resData) => {
            if (resData.data.resultCode === 0 ) {
                dispatch(AddTodolistAC({todolist: resData.data.data.item}))
            }
        })
}

export const ChangeTitleTodolistTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(id, title)
        .then((resData) => {
            if (resData.data.resultCode === 0 ) {
                dispatch(ChangeTitleTodolistAC({todolistId: id, title}))
            }
        })
}