import {useReducer} from "react";
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import { ThemeProvider } from "@mui/material/styles";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import theme from "./themes/theme";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    AddTodolistAC,
    ChangeFilterTodolistAC,
    todolistsReducer,
    ChangeTitleTodolistAC,
    RemoveTodolistAC
} from "./state/todolists-reducer";
import {removeTaskAC, addTaskAC, tasksReducer, changeTaskStatusAC, changeTaskTitleAC} from "./state/tasks-reducer";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

export type TodolistType = {
    id: string;
    title: string;
    filter: Filter;
};

export type Filter = "all" | "completed" | "active"

function AppWithReducer() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: "Rest API", isDone: true},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    })

    function removeTask(todolistId: string, taskId: string) {
        dispatchToTasks(removeTaskAC({todolistId, taskId}))
    }

    function addTask(todolistId: string, taskTitle: string) {
        dispatchToTasks(addTaskAC({todolistId, taskTitle}))
    }

    function changeTasksStatus(todolistId: string, taskId: string, isDone: boolean) {
        dispatchToTasks(changeTaskStatusAC({todolistId, taskId, isDone}))
    }

    function addItem(todolistTitle: string) {
        const action = AddTodolistAC({todolistTitle})
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    function changeFilter(todolistId: string, filter: Filter) {
        dispatchToTodolists(ChangeFilterTodolistAC({todolistId, filter}))
    }

    function removeTodolist(todolistId: string) {
        dispatchToTodolists(RemoveTodolistAC({todolistId}))
        dispatchToTasks(RemoveTodolistAC({todolistId}))
    }

    function changeTaskTitle(todolistId: string, taskId: string, taskTitle: string) {
        dispatchToTasks(changeTaskTitleAC({todolistId, taskId, taskTitle}))
    }

    function changeTodolistTitle(todolistId: string, todolistTitle: string) {
        dispatchToTodolists(ChangeTitleTodolistAC({todolistId, todolistTitle}))
    }


    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="success"
                            aria-label="menu"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6">
                            {"Todolist"}
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container style={{padding: "10px"}}>
                        <AddItemForm
                            addItem={addItem}
                        />
                    </Grid>
                    <Grid container spacing={3}>
                        {todolists.map(todolist => {
                            let taskForTodolist = tasks[todolist.id]

                            if (todolist.filter === "completed") {
                                taskForTodolist = tasks[todolist.id].filter(task => task.isDone)
                            }

                            if (todolist.filter === "active") {
                                taskForTodolist = tasks[todolist.id].filter(task => !task.isDone)
                            }

                            return <Grid key={todolist.id} item>
                                <Paper style={{padding: "20px"}}>
                                    <Todolist
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
                                </Paper>
                            </Grid>
                        })}
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default AppWithReducer;
