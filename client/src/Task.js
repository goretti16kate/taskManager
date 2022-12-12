import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import './Task.css';
import DeleteIcon from "@mui/icons-material/Delete";


const Task = ({content, onClick}) => {
    return (
        <List className="todo-list">
            <ListItem>
                <ListItemAvatar />
            <ListItemText primary={content} />
            </ListItem>
            <DeleteIcon fontSize="large" style={{opacity:0.7}} onClick={onClick}/>
        </List>
    )
};

export default Task;