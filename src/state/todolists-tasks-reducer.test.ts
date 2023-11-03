import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {AddTodolistAC, RemoveTodolistAC, todolistsReducer} from "./todolists-reducer";
import {TodolistType} from "../api/todolist-api";
import {Filter} from "../app/AppWithRedux";


test("ids should be equals", () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistType & {filter: Filter}> = []

    const payload = {title: "new todolist"}

    // const action = AddTodolistAC(payload)
    //
    // const endTasksState = tasksReducer(startTasksState, action)
    // const endTodolistsState = todolistsReducer(startTodolistsState, action)
    //
    // const keys = Object.keys(endTasksState)
    // const idFromTasks = keys[0]
    // const idFromTodolists = endTodolistsState[0].id
    //
    // expect(idFromTasks).toBe(action.payload.todolistId)
    // expect(idFromTodolists).toBe(action.payload.todolistId)
})

test("property with todolistId should be deleted", () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", status: 0, priority: 0, description: "test", addedDate: new Date(), startDate: new Date(), deadline: new Date(), todoListId: "todolistId1", order: 0},
            {id: "2", title: "JS", status: 0, priority: 0, description: "test", addedDate: new Date(), startDate: new Date(), deadline: new Date(), todoListId: "todolistId1", order: 0},
            {id: "3", title: "React", status: 0, priority: 0, description: "test", addedDate: new Date(), startDate: new Date(), deadline: new Date(), todoListId: "todolistId1", order: 0},
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: 0, priority: 0, description: "test", addedDate: new Date(), startDate: new Date(), deadline: new Date(), todoListId: "todolistId2", order: 0},
            {id: "2", title: "milk", status: 0, priority: 0, description: "test", addedDate: new Date(), startDate: new Date(), deadline: new Date(), todoListId: "todolistId2", order: 0},
            {id: "3", title: "tea", status: 0, priority: 0, description: "test", addedDate: new Date(), startDate: new Date(), deadline: new Date(), todoListId: "todolistId2", order: 0},
        ]
    }

    const payload =  {
        todolistId: "todolistId2",
    }

    const action = RemoveTodolistAC(payload)

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
