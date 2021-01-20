import React, { useState, useEffect } from 'react'
import './App.css';
import { TodoInput } from './components/Input'
import TodoList from './components/TodoList'
import { getTodo, signup, signin, createTodo, editTodo, deleteTodo} from './api/api'
// import { Header } from './components/layout/Header'
import { SignUp } from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import { Error404 } from './components/Error404'
import { Header } from './components/Header'
import { 
  Route, 
  BrowserRouter as Router,
  Redirect,
  useHistory 
} from 'react-router-dom'
import Calendar from 'react-calendar';
import Modal from 'react-modal'

// import { withRouter } from 'react-router'
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
 

function App() {
  const [value, setValue] = useState('')
  const [todos, setTodo] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [date, setDate] = useState(new Date())


  const history = useHistory()

  const getTodos = async () => {
    let data = await getTodo(`/todo/${getFormLocalStorage('token').user.username}`, getFormLocalStorage('token').token)
    setTodo(data)
  }

  const crtTodo = async (value) => {
    // let date = await date
    if(value) {
      const todo = {
        todo: value,
        isDone: false,
        deadline: await date
      }
      console.log(date)
      const newTodo = await createTodo(`/todo/${getFormLocalStorage('token').user.username}`, todo, getFormLocalStorage('token').token)

      setTodo([...todos, newTodo])
    } else {
      alert('Write something')
    }
  }

  useEffect(() => {
    if(getFormLocalStorage('token'))
      getTodos()
  }, [])

  const toTodo = () => {
    history.push('/home')
  }

  const signUp = async (func) => {
    let user = { 
      username,
      password,
    }
    const res = await signup('/user/signup', user)
    if(res.status === 200 && func !== undefined) {
      func()
      setUsername('')
      setPassword('')
    }
  }

  const addToLocalStorage = value => localStorage.setItem('token', JSON.stringify(value))
  
  const getFormLocalStorage = value =>  JSON.parse(localStorage.getItem(value))
  

  const signIn = async () => {
    let user = { 
      username,
      password
    }
    
    if(username.trim() !== '' && password.trim() !== '') {
      console.log('helloworld')
      const res = await signin('/user/signin', user)
      try {
        if(res.token !== undefined) {
          await addToLocalStorage(res)
          setUsername('')
          setPassword('')
          setErr('')
          getTodos()
        }
      } catch {
        setErr('Error')
      }
    }
  }

  const edit = async id => {
    const todo = todos.find(todo => todo._id === id)
    if(todo.isDone === false)
      todo.isDone = true
    else
      todo.isDone = false
    
    const edited = await editTodo(`/todo/${getFormLocalStorage('token').user.username}/${id}`, todo, getFormLocalStorage('token').token)
    let updatedTodos = todos.map(el => {
      console.log(id)
      if(id === el._id) {
        el = edited
        return el
      }
      return el
    })
    
    setTodo(updatedTodos)
  }

  const deleteOne = async id => {
    const result = await deleteTodo(`/todo/${getFormLocalStorage('token').user.username}/${id}`, getFormLocalStorage('token').token)
    if(result) 
      getTodos()
  }

  const logOut = (func) => {
    localStorage.clear('token')
    func()
    window.location.reload();
  }

  const [modalIsOpen, setIsOpen] = useState(false);
  // let subtitle;
  function openModal() {
    setIsOpen(true);
  }
 
  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // }
 
  function closeModal(){
    setIsOpen(false);
  }
 
  console.log(date)


  return (
    <Router>
      <div className="App">
        <Header
          logOut={logOut}
        />
        <Route path='/home'>
            {getFormLocalStorage('token') ?
              <>
                <TodoInput 
                  value={value}
                  setValue={v => setValue(v)}
                  addValue={arg => (
                    crtTodo(value)
                  )}
                  openModal={openModal}
                />
                <TodoList 
                  todos={todos} 
                  isThisDone={edit}
                  deleteOne={deleteOne}
                />
                {/* <button onClick={openModal}>Open Modal</button> */}
                <Modal
                  isOpen={modalIsOpen}
                  ariaHideApp={false}
                  onRequestClose={closeModal}
                  style={customStyles}
                > 
                <Calendar
                  value={date}  
                  onChange={e => setDate}
                   
              /> 
              </Modal>
              </>
               :
              <Redirect to='/signIn'>
                <SignUp
                  username={username}
                  setUsername={un => setUsername(un)}
                  password={password}
                  setPassword={pw => setPassword(pw)}
                  signUp={signUp}
                />
              </Redirect> 
            }
        </Route>          
        <Route path='/signUp' exact>
          <SignUp
              username={username}
              setUsername={un => setUsername(un)}
              password={password}
              setPassword={pw => setPassword(pw)}
              signUp={signUp}
            />
        </Route>
        <Route path='/signIn' exact>
          <SignIn
              username={username}
              setUsername={un => setUsername(un)}
              password={password}
              setPassword={pw => setPassword(pw)}
              signIn={signIn}
              error={err}
            />
        </Route>

        <Route path='/error404' exact>
          <Error404 />
        </Route>
      </div>
    </Router>
  );
}

export default App;
