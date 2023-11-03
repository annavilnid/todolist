import {
    TasksStateType,
    tasksReducer,
    removeTaskAC,
    addTaskAC,
    //changeTaskStatusAC
    // AddTaskTC
} from "./tasks-reducer"
import {AddTodolistAC} from "./todolists-reducer";
import {v1} from "uuid";

let startState: TasksStateType

beforeEach(() => {

    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", status: 0, priority: 0, description: "test", addedDate: new Date(), startDate: new Date(), deadline: new Date(), todoListId: "todolistId1", order: 0},
            {id: "2", title: "JS", status: 0, priority: 0, description: "test", addedDate: new Date(), startDate: new Date(), deadline: new Date(), todoListId: "todolistId1", order: 0},
            {id: "3", title: "React", status: 0, priority: 0, description: "test", addedDate: new Date(), startDate: new Date(), deadline: new Date(), todoListId: "todolistId1", order: 0},
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: 0, priority: 0, description: "test", addedDate: new Date(), startDate: new Date(), deadline: new Date(), todoListId: "todolistId2", order: 0},
            {id: "2", title: "milk", status: 0, priority: 0, description: "test", addedDate: new Date(), startDate: new Date(), deadline: new Date(), todoListId: "todolistId2", order: 0},
            {id: "3", title: "tea", status: 0, priority: 0, description: "test", addedDate: new Date(),  startDate: new Date(), deadline: new Date(), todoListId: "todolistId2", order: 0},
        ]
    }
})


test("correct task should be deleted from correct array", () => {
    const payload = {
        todolistId: "todolistId2",
        taskId: "2"
    }
    const action = removeTaskAC(payload)
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "3", title: "tea", isDone: false}
        ]
    })
})

test.skip("correct task should be added to correct array", () => {
    const payload = {
        todolistId: "todolistId2",
        title: "juice",
    }
    //const action = AddTaskAC(payload)
    // const endState = tasksReducer(startState, action)
    //
    // expect(endState["todolistId1"].length).toBe(3)
    // expect(endState["todolistId2"].length).toBe(4)
    // expect(endState["todolistId2"][0].id).toBeDefined()
    // expect(endState["todolistId2"][0].title).toBe("juice")
    // expect(endState["todolistId2"][0].isDone).toBe(false)
})

// test("status of specified task should be changed", () => {
//     const payload = {
//         todolistId: "todolistId2",
//         taskId: "2",
//         completed: false,
//     }
//     const action = changeTaskStatusAC(payload)
//     const endState = tasksReducer(startState, action)
//
//     expect(startState["todolistId2"][1].completed).toBe(true)
//     expect(endState["todolistId2"][1].completed).toBe(false)
// })

test("title of specified task should be changed", () => {
    const payload = {
        todolistId: "todolistId2",
        taskId: "3",
        title: "coffee",
    }
    // const action = changeTaskTitleAC(payload)
    // const endState = tasksReducer(startState, action)
    //
    // expect(startState["todolistId2"][2].title).toBe("tea")
    // expect(endState["todolistId2"][2].title).toBe("coffee")
})

test("new array should be added when new todolist is added", () => {
    const payload = {
        todolistId: v1(),
        title: "new todolist"
    }
    // const action = AddTodolistAC(payload)
    // const endState = tasksReducer(startState, action)
    // const keys = Object.keys(endState)
    // const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2")
    // if (!newKey) {
    //     throw Error("new key should be added")
    // }
    //
    // expect(keys.length).toBe(3)
    // expect(endState[newKey]).toEqual([])
})


