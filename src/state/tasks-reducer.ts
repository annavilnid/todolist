import {TaskType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

const initialState: TasksStateType = {}

type RemoveTaskType = {
    type: "REMOVE-TASK",
    payload: {
        todolistId: string,
        taskId: string,
    }
}

type AddTaskType = {
    type: "ADD-TASK",
    payload: {
        todolistId: string,
        taskTitle: string,
    }
}

type ChangeTaskStatusType = {
    type: "CHANGE-TASK-STATUS",
    payload: {
        todolistId: string,
        taskId: string,
        isDone: boolean,
    }
}


type ChangeTaskTitleType = {
    type: "CHANGE-TASK-TITLE",
    payload: {
        todolistId: string,
        taskId: string,
        taskTitle: string,
    }
}

export type TasksStateType = {
    [key: string] : TaskType[]
}

type ActionType =
    RemoveTaskType
    | AddTaskType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            const filteredTasks = state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            return {...state, [action.payload.todolistId]: filteredTasks}
        case "ADD-TASK":
            const newTask = {id: v1(), title: action.payload.taskTitle, isDone: false}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        case "CHANGE-TASK-STATUS":
            const taskWithNewStatus = state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, isDone: action.payload.isDone} : task)
            return {...state, [action.payload.todolistId]: taskWithNewStatus}
        case "CHANGE-TASK-TITLE":
            const taskWithNewTitle = state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, title: action.payload.taskTitle} : task)
            return {...state, [action.payload.todolistId]: taskWithNewTitle}
        case "ADD-TODOLIST":
            return {...state, [action.payload.todolistId]: []}
        case "REMOVE-TODOLIST":
            const newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        default:
            return state
    }
}

export const removeTaskAC = (payload: {
    todolistId: string
    taskId: string,
}): RemoveTaskType => ({
    type: "REMOVE-TASK",
    payload,
})


export const addTaskAC = (payload: {
    todolistId: string
    taskTitle: string,
}): AddTaskType => ({
    type: "ADD-TASK",
    payload,
})

export const changeTaskStatusAC = (payload: {
    todolistId: string
    taskId: string
    isDone: boolean,
}): ChangeTaskStatusType => ({
    type: "CHANGE-TASK-STATUS",
    payload,
})

export const changeTaskTitleAC = (payload: {
    todolistId: string
    taskId: string
    taskTitle: string,
}): ChangeTaskTitleType => ({
    type: "CHANGE-TASK-TITLE",
    payload,
})