import {
    TasksStateType,
    tasksReducer,
    removeTaskAC,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC
} from "./tasks-reducer"
import {AddTodolistAC} from "./todolists-reducer";
import {v1} from "uuid";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
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

test("correct task should be added to correct array", () => {
    const payload = {
        todolistId: "todolistId2",
        taskTitle: "juice",
    }
    const action = addTaskAC(payload)
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(4)
    expect(endState["todolistId2"][0].id).toBeDefined()
    expect(endState["todolistId2"][0].title).toBe("juice")
    expect(endState["todolistId2"][0].isDone).toBe(false)
})

test("status of specified task should be changed", () => {
    const payload = {
        todolistId: "todolistId2",
        taskId: "2",
        isDone: false,
    }
    const action = changeTaskStatusAC(payload)
    const endState = tasksReducer(startState, action)

    expect(startState["todolistId2"][1].isDone).toBe(true)
    expect(endState["todolistId2"][1].isDone).toBe(false)
})

test("title of specified task should be changed", () => {
    const payload = {
        todolistId: "todolistId2",
        taskId: "3",
        taskTitle: "coffee",
    }
    const action = changeTaskTitleAC(payload)
    const endState = tasksReducer(startState, action)

    expect(startState["todolistId2"][2].title).toBe("tea")
    expect(endState["todolistId2"][2].title).toBe("coffee")
})

test("new array should be added when new todolist is added", () => {
    const payload = {
        todolistId: v1(),
        todolistTitle: "new todolist"
    }
    const action = AddTodolistAC(payload)
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2")
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})


