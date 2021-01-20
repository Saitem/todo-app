import axios from 'axios'

const baseUrl = 'http://localhost:5000/api'
// const baseUrl = 'https://beetroot-todo-api.herokuapp.com/api'
export const signup = (path, user) => {
    return axios.post(baseUrl + path, user)
    .then(res => {
        return res
    }).catch(() => {
        return 400
    })

}

export const signin = async (path, user) => {
    return axios.post(baseUrl + path, user)
        .then(res => {
            if(res.status === 200) {
                return res.data
            }
        }).catch(err => {
            console.log(err)
        })
}

export const getTodo = (path, token) => {
    return axios.get(baseUrl + path, { headers: { 'access_token': token } })
        .then(res => {
            if(res.status === 200)
                return res.data
        }).catch(err => {
            console.log(err)
        })
}

export const createTodo = (path, todo, token) => {
    return axios.post(baseUrl + path, todo, { headers: { 'access_token': token } })
        .then(res => {
            if(res.status === 200) 
                return res.data
        }).catch(err => {
            console.log(err)
        })
}


export const editTodo = (path, todo, token) => {
    return axios.put(baseUrl + path, todo, { headers: { 'access_token': token } })
        .then(res => {
            if(res.status === 201) {
                // console.log(res.data)
                return res.data
            }
        })
        .catch(err => console.log(err))
}

export const deleteTodo = (path, token) => {
    return axios.delete(baseUrl + path, { headers: { 'access_token': token } })
        .then(res => {
            if(res.status === 200) {
                return true
            } else {
                return false
            }
        })
}
