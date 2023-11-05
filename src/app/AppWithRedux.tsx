import {useSelector} from "react-redux";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import theme from "../themes/theme";
import Container from '@mui/material/Container';
import {AppRootStateType, useAppDispatch} from "../state/store";
import {RequestStatusType} from "./app-reducer";
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorSnackbar} from "../components/ ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {TodolistList} from "../features/TodolistList/TodolistList";
import {Routes, Route, Navigate} from "react-router-dom";


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
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const error = useSelector<AppRootStateType, null | string>(state => state.app.error)
    const dispatch = useAppDispatch()

    // useEffect(() => {
    //     dispatch(SetTodolistsTC())
    // }, [dispatch])

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                {error && <ErrorSnackbar />}
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
                    {status === "loading" && <LinearProgress color="inherit"/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path="/" element={<TodolistList/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>} />
                        <Route path='*' element={<Navigate to={"/404"} />} />
                    </Routes>
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default AppWithRedux;