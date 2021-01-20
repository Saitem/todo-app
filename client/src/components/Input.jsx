import React from 'react'
import { Button } from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';
import { Input } from '@material-ui/core';

export const TodoInput = (props) => {

    return (
        <div>
            <Input
                // margin="normal"
                
                required
                // id="email"
                label="Todo"
                name="text"
                value={props.value}
                onChange={e => props.setValue(e.target.value)}
            />
            {/* <input 
                type="text"
                value={props.value}
                onChange={e => props.setValue(e.target.value)}
            /> */}
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => (
                    props.addValue(props.id, props.date), 
                    props.openModal()
                )}
            >Click</Button>
            
        </div>
    )
}
