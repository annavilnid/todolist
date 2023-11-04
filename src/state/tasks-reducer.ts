//import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {SetAppErrorAC, SetAppStatus, SetAppStatusAC} from "../app/app-reducer";
import {handleServerAppError} from "../utils/utils-error";

const initialState: TasksStateType = {}

type RemoveTaskType = {
    type: "TASKS/REMOVE-TASK",
    payload: {
        todolistId: string,
        taskId: string,
    }
}

type AddTaskType = {
    type: "TASKS/ADD-TASK",
    payload: {
        todolistId: string,
        task: TaskType,
    }
}

type ChangeTaskType = {
    type: "TASKS/CHANGE-TASK",
    payload: {
        newTask: TaskType
    }
}


// type ChangeTaskTitleType = {
//     type: "CHANGE-TASK-TITLE",
//     payload: {
//         todolistId: string,
//         taskId: string,
//         title: string,
//     }
// }

export type TasksStateType = {
    [key: string] : TaskType[]
}

type ActionType =
    RemoveTaskType
    | AddTaskType
    | ChangeTaskType
    // | ChangeTaskTitleType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTasksActionType
    | SetAppStatus

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "TASKS/SET-TASKS":
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        case "TASKS/REMOVE-TASK":
            const filteredTasks = state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            return {...state, [action.payload.todolistId]: filteredTasks}
        case "TASKS/ADD-TASK":
            const newTask = {...action.payload.task}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        case "TASKS/CHANGE-TASK":
            return {...state, [action.payload.newTask.todoListId]: state[action.payload.newTask.todoListId].map(t => t.id === action.payload.newTask.id ? action.payload.newTask :  t )}
        // case "CHANGE-TASK-TITLE":
        //     const taskWithNewTitle = state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, title: action.payload.title} : task)
        //     return {...state, [action.payload.todolistId]: taskWithNewTitle}
        case "ADD-TODOLIST":
            return {...state, [action.payload.todolist.id]: []}
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
    type: "TASKS/REMOVE-TASK",
    payload,
})


export const addTaskAC = (payload: {
    todolistId: string
    task: TaskType,
}): AddTaskType => ({
    type: "TASKS/ADD-TASK",
    payload,
})

export const changeTaskAC = (payload: {
    newTask: TaskType
}): ChangeTaskType => ({
    type: "TASKS/CHANGE-TASK",
    payload,
})

// export const changeTaskTitleAC = (payload: {
//     todolistId: string
//     taskId: string
//     title: string,
// }): ChangeTaskTitleType => ({
//     type: "CHANGE-TASK-TITLE",
//     payload,
// })

export const SetTasksAC = (payload: {
    todolistId: string,
    tasks: TaskType[]
}) => ({type: "TASKS/SET-TASKS", payload} as const)

export const SetTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then((resData)=> {
            const tasks = resData.data.items
            dispatch(SetTasksAC({todolistId, tasks}))
            dispatch(SetAppStatusAC({status: "succeeded"}))
        })
}

export const RemoveTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC({status: "loading"}))
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((resData)=> {
            dispatch(removeTaskAC({todolistId, taskId}))
            dispatch(SetAppStatusAC({status: "succeeded"}))
        })
}

export const AddTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC({status: "loading"}))
    todolistsAPI.createTask(todolistId, title)
        .then((resData)=> {
            if (resData.data.resultCode === 0 ) {
                const task = resData.data.data.item
                dispatch(addTaskAC({todolistId, task}))
                dispatch(SetAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError<{item: TaskType}>(resData.data, dispatch)
            }
        })
}

export const UpdateTaskTC = (todolistId: string, taskId: string, updatedModelField: UpdateTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })
        if (task) {
            todolistsAPI.updateTask(todolistId, taskId, {
                ...task, ...updatedModelField
            })
                .then((resData) => {
                console.log(resData.data.data.item)
                dispatch(changeTaskAC({newTask: resData.data.data.item}))
            })
        }
    }
}
// UpdateTaskModelType

export type SetTasksActionType = ReturnType<typeof SetTasksAC>