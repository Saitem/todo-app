import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import './main.scss'

const Todo = (props) => {
    // const [checked, setChecked] = useState(null)
    // console.log(checked)
    return (
        <ListItem 
            className="list-item" 
            key={props.todo} 
            button
        >
            {props.todo.isDone === false 
                ? <ListItemText primary={props.todo.todo} />
                : <ListItemText style={{'textDecoration': 'line-through'}} primary={props.todo.todo} />
            }
            {/* <ListItemSecondaryAction> */}
            <Checkbox
                edge="end"
                onChange={
                    () => props.isThisDone(props.todo._id)
                }
                checked={props.todo.isDone}
                // inputProps={{ 'aria-labelledby': labelId }}
            />
            {/* </ListItemSecondaryAction> */}
            {/* <input 
                type="checkbox"
                // value={true}
                onChange={
                    () => props.isThisDone(props.todo._id)
                }
                checked={props.todo.isDone}
            /> */}
            
            <Button
                variant="contained"
                onClick={() => props.deleteOne(props.todo._id)} 
            >Delete</Button>
        </ListItem>
    )
}


export default Todo