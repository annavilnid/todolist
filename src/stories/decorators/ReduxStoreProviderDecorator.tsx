import React from 'react'
import {Provider} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {combineReducers, legacy_createStore} from "redux";
import { tasksReducer } from "../../state/tasks-reducer";
import {todolistsReducer} from "../../state/todolists-reducer";
import {v1} from "uuid";
import {appReducer, RequestStatusType} from "../../app/app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: new Date(), order: 1 },
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: new Date(), order: 2}
    ] ,
    tasks: {
        "todolistId1": [
            {id: v1(), title: "HTML&CSS", status: 0, priority: 0, description: "test", addedDate: new Date(), completed: true, startDate: new Date(), deadline: new Date(), todoListId: "todolistId1", order: 0},
            {id: v1(), title: "JS", status: 0, priority: 0, description: "test", addedDate: new Date(), completed: false, startDate: new Date(), deadline: new Date(), todoListId: "todolistId1", order: 0},
        ],
        "todolistId2": [
            {id: v1(), title: "Milk", status: 0, priority: 0, description: "test", addedDate: new Date(), completed: false, startDate: new Date(), deadline: new Date(), todoListId: "todolistId2", order: 0},
            {id: v1(), title: "React Book", status: 0, priority: 0, description: "test", addedDate: new Date(), completed: true, startDate: new Date(), deadline: new Date(), todoListId: "todolistId2", order: 0},
        ]
    },
    app: {status: 'loading'}
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
