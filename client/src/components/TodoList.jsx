import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react'
import Todo from './Todo'



const TodoList = (props) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '20%',
            margin: 'auto',
            backgroundColor: theme.palette.background.paper,
        },
    }))
    
    const classes = useStyles();
    console.log(props.todos)

    return (
        <List dense className={classes.root}>
            <h5>Completed</h5>
            {
                // <h5>Completed</h5>
                props.todos.map(todo => 
                    (
                        todo.isDone === true ?
                        <div>
                            <Todo 
                                key={todo.id} 
                                todo={todo} 
                                isThisDone={props.isThisDone} 
                                deleteOne={props.deleteOne}
                            />
                        </div>
                            :
                            ''
                     
                    )
                )
            }
            <h5>In progress</h5>
            {
                // <h5>Completed</h5>
                props.todos.map(todo => 
                    (
                        todo.isDone === false ?
                        <div>
                            <Todo  
                                key={todo.id} 
                                todo={todo} 
                                isThisDone={props.isThisDone} 
                                deleteOne={props.deleteOne}
                            />
                        </div>
                            :
                            ''
                     
                    )
                )
            }
        </List>
    )
}


export default TodoList