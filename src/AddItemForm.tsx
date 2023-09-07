import {ChangeEvent, FC, useState} from "react";
import Button from '@mui/material/Button';

type Props = {
    addItem: (taskTitle: string) => void;
};

export const AddItemForm: FC<Props> = ({ addItem }) => {
    const [error, setError] = useState<string | null>(null)
    const [title, setTitle] = useState<string>("")
    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }
    function onKeyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        setError(null)
        e.key === "Enter" && addTaskHandler()
    }
    function addTaskHandler() {
        if (title.trim() !== "") {
            addItem(title.trim());
            setTitle("")
        } else {
            setError("Title is required")
        }
    }
    return (
        <div>
            <input
                className={error ? "error" : "" }
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
            />
            <Button variant="contained" color="primary" size="small"onClick={addTaskHandler}>+</Button>
            {/*<button onClick={addTaskHandler}>+</button>*/}
            {error && <div className="error-message">error</div>}
        </div>
    )
}