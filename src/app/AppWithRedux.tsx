import {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import "./App.css";
import {Todolist} from "../Todolist";
import {AddItemForm} from "../AddItemForm";
import { ThemeProvider } from "@mui/material/styles";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import theme from "../themes/theme";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    AddTodolistTC,
    ChangeFilterTodolistAC,
    ChangeTitleTodolistAC, ChangeTitleTodolistTC,
    RemoveTodolistTC,
    SetTodolistsTC
} from "../state/todolists-reducer";
import {
    RemoveTaskTC,
    AddTaskTC, UpdateTaskTC
} from "../state/tasks-reducer";
import {AppRootStateType, useAppDispatch} from "../state/store";
import { TaskType, TodolistType, UpdateTaskModelType} from "../api/todolist-api";
import {RequestStatusType} from "./app-reducer";
import LinearProgress from "@mui/material/LinearProgress";

// export type TaskType = {
//     id: string;
//     title: string;
//     isDone: boolean;
// };
//
// export type TodolistType = {
//     id: string;
//     title: string;
//     filter: Filter;
// };

export type Filter = "all" | "completed" | "active"

function AppWithRedux() {
    const todolists = useSelector<AppRootStateType, Array<TodolistType & {filter: Filter}>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, {[key: string]: Array<TaskType>}>(state => state.tasks)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(SetTodolistsTC())
    }, [dispatch])

    const removeTask = useCallback((todolistId: string, taskId: string)=> {
        dispatch(RemoveTaskTC(todolistId, taskId))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string)=> {
        dispatch(AddTaskTC(todolistId, title))
    }, [dispatch])

    const changeTask = useCallback((todolistId: string, taskId: string, updatedModelField: UpdateTaskModelType)=> {
        dispatch(UpdateTaskTC(todolistId, taskId, updatedModelField))
    }, [dispatch])

    const addItem = useCallback((title: string)=> {
        dispatch(AddTodolistTC(title))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, filter: Filter)=> {
        dispatch(ChangeFilterTodolistAC({todolistId, filter}))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string)=> {
        dispatch(RemoveTodolistTC(todolistId))
    }, [dispatch])

    // const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string)=> {
    //     dispatch(UpdateTaskTC(todolistId, taskId, {title}))
    // }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string)=> {
        dispatch(ChangeTitleTodolistTC(todolistId, title))
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
                    {status === "loading" && <LinearProgress color="inherit" />}
                </AppBar>
                <Container fixed>
                    <Grid container style={{padding: "10px"}}>
                        <AddItemForm
                            addItem={addItem}
                        />
                    </Grid>
                    <Grid container spacing={3}>
                        {todolists?.map(todolist => {

                            return <Grid key={todolist.id} item>
                                <Paper style={{padding: "20px"}}>
                                    <Todolist
                                        title={todolist.title}
                                        tasks={tasks[todolist.id]}
                                        filter={todolist.filter}
                                        todolistId={todolist.id}
                                        removeTask={removeTask}
                                        addTask={addTask}
                                        changeTask={changeTask}
                                        changeFilter={changeFilter}
                                        removeTodolist={removeTodolist}
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