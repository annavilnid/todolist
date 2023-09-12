import {useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";
import './App.css';
import {Todolist} from "./Todolist";
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
    ChangeTitleTodolistAC,
    RemoveTodolistAC
} from "./state/todolists-reducer";
import {removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC} from "./state/tasks-reducer";
import {AppRootStateType} from "./state/store";

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

function AppWithRedux() {
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, {[key: string]: Array<TaskType>}>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((todolistId: string, taskId: string)=> {
        dispatch(removeTaskAC({todolistId, taskId}))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, taskTitle: string)=> {
        dispatch(addTaskAC({todolistId, taskTitle}))
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, isDone: boolean)=> {
        dispatch(changeTaskStatusAC({todolistId, taskId, isDone}))
    }, [dispatch])

    const addItem = useCallback((todolistTitle: string)=> {
        dispatch(AddTodolistAC({todolistTitle}))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, filter: Filter)=> {
        dispatch(ChangeFilterTodolistAC({todolistId, filter}))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string)=> {
        dispatch(RemoveTodolistAC({todolistId}))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, taskTitle: string)=> {
        dispatch(changeTaskTitleAC({todolistId, taskId, taskTitle}))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, todolistTitle: string)=> {
        dispatch(ChangeTitleTodolistAC({todolistId, todolistTitle}))
    }, [dispatch])


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

                            return <Grid key={todolist.id} item>
                                <Paper style={{padding: "20px"}}>
                                    <Todolist
                                        title={todolist.title}
                                        tasks={tasks[todolist.id]}
                                        filter={todolist.filter}
                                        todolistId={todolist.id}
                                        removeTask={removeTask}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
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

export default AppWithRedux;