import React from 'react'
import { 
    Link, 
} from 'react-router-dom'

export const Header = () => {
    return (
        <header>
            <div className="signin">
                <Link to='/signin' className='link'>SignIn</Link>
            </div>
            <div className='signup'>
                {/* <span><b>Total: {total}$</b></span> */}
                <Link to='/signup' className="link">SignUp</Link>
            </div>
            <div className='todo'>
                {/* <span><b>Total: {total}$</b></span> */}
                <Link to='/' className="link">Todo</Link>
            </div>
        </header>
    )
}
