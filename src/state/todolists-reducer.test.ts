import {
    AddTodolistAC,
    ChangeFilterTodolistAC,
    ChangeTitleTodolistAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolists-reducer"
import {v1} from "uuid"
import {Filter, TodolistType} from "../App"

let todolistId1: string
let todolistId2: string
let startState: TodolistType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test("correct todolist should be removed", () => {
    const payload = {todolistId: todolistId1}
    const endState = todolistsReducer(startState, RemoveTodolistAC(payload))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
    let newTodolistTitle = "New Todolist"
    const payload = {todolistId: v1(), todolistTitle: newTodolistTitle}
    const endState = todolistsReducer(startState, AddTodolistAC(payload))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test("correct todolist should change its name", () => {
    let newTodolistTitle = "New Todolist"
    const payload = {
        todolistId: todolistId2,
        todolistTitle: newTodolistTitle,
    }
    const endState = todolistsReducer(startState, ChangeTitleTodolistAC(payload))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)
})

test("correct filter of todolist should be changed", () => {
    let newFilter: Filter = "completed"
    const payload = {
        todolistId: todolistId2,
        filter: newFilter,
    }
    const endState = todolistsReducer(startState, ChangeFilterTodolistAC(payload))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})
