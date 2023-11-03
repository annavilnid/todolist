import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolist-api";

export default {
    title: 'Tasks API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "7d2646f0-2300-44f6-baf0-e7f47ef63256"
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.getTasks(todolistId)
            .then((resData) =>
                setState(resData.data)
            )}, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "7d2646f0-2300-44f6-baf0-e7f47ef63256"
    const title = 'newTask'
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.createTask(todolistId, title)
            .then((resData) =>
                setState(resData.data)
            )}, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "7d2646f0-2300-44f6-baf0-e7f47ef63256"
    const taskId = "c6717985-824e-4ec8-992e-b8e29c2e5ba3"
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((resData) =>
                setState(resData.data)
            )}, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "7d2646f0-2300-44f6-baf0-e7f47ef63256"
    const taskId = "c6717985-824e-4ec8-992e-b8e29c2e5ba3"
    const todoItem = {
        title: "Complete Project",
        description: "Finish the project by the deadline",
        status: 1, // Например, 1 может обозначать "в работе"
        priority: 2, // Например, 2 может обозначать "средний приоритет"
        startDate: new Date(), // Текущая дата и время
        deadline: new Date("2023-12-31T23:59:59"), // Пример дедлайна: 31 декабря 2023 года
    };
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.updateTask(todolistId, taskId, todoItem)
            .then((resData) =>
                setState(resData.data)
            )}, [])
    return <div>{JSON.stringify(state)}</div>
}