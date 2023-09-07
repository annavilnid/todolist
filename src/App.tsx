import React, {useState} from "react";
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterType;
};

export type FilterType = "all" | "completed" | "active"

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<{[key: string]: Array<TaskType>}>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    function removeTask(todolistId: string, taskId: string) {
        tasks[todolistId] = tasks[todolistId].filter(task => task.id !== taskId)
        setTasks({...tasks})
    }

    function addTask(todolistId: string, taskTitle: string) {
        const newTask = {id: v1(), title: taskTitle, isDone: false};
        tasks[todolistId] = [newTask, ...tasks[todolistId]]
        setTasks({...tasks});
    }

    function changeTasksStatus(todolistId: string, taskId: string, isDone: boolean) {
        let task = tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks})
    }

    function addItem(title: string) {
        const todolistId = v1();
        const newTodolist = { id: todolistId, title: title, filter: "all" as FilterType };
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistId]: []});
    }

    function changeFilter(titleId: string, filter: FilterType) {
        let todolist = todolists.find(t => t.id === titleId)
        if (todolist) {
            todolist.filter = filter
        }
        setTodolists([...todolists])
    }

    function removeTodolist(todolistId: string) {
        const newTodolists = todolists.filter(t=> t.id !== todolistId)
        delete tasks[todolistId];
        setTodolists(newTodolists)
        setTasks({...tasks})
    }

    function changeTaskTitle(todolistId: string, taskId: string, newTitle: string) {
        let task = tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
        }
        setTasks({...tasks})
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
       const newTodolists = todolists.map(t => t.id === todolistId ? {...t, title: newTitle} : t)
       setTodolists(newTodolists)
    }


    return (
        <div className="App">
            <AddItemForm
                addItem={addItem}
            />
            {todolists.map(todolist => {
                let taskForTodolist = tasks[todolist.id]

                if (todolist.filter === "completed") {
                    taskForTodolist = tasks[todolist.id].filter(task => task.isDone)
                }

                if (todolist.filter === "active") {
                    taskForTodolist = tasks[todolist.id].filter(task => !task.isDone)
                }

                return <Todolist key={todolist.id}
                                 title={todolist.title}
                                 tasks={taskForTodolist}
                                 filter={todolist.filter}
                                 todolistId={todolist.id}
                                 removeTask={removeTask}
                                 addTask={addTask}
                                 changeTasksStatus={changeTasksStatus}
                                 changeFilter={changeFilter}
                                 removeTodolist={removeTodolist}
                                 changeTaskTitle={changeTaskTitle}
                                 changeTodolistTitle={changeTodolistTitle}
                />
            })}
        </div>
    );
}

export default App;
