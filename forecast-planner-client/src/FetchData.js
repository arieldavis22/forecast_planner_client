export const seeFriends = (cUser) => {
    return fetch('http://localhost:3000/seefriends', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            currentUser: cUser
        })
    })
}

export const addFriends = (cUser, friend) => {
    return fetch('http://localhost:3000/addfriend', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            currentUser: cUser,
            friend: friend
        })
    })
}

export const signUp = (state) => {
    return fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(state)
    })
}

export const login = (state) => {
    return fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(state)
    })
}

export const autoLog = () => {
    return fetch('http://localhost:3000/autologin', {
        credentials: 'include'
    })
}

export const allUsers = () => {
    return fetch('http://localhost:3000/users')
}

export const getEvents = (cUser) => {
    return fetch("http://localhost:3000/getevents", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            currentUser: cUser
            //refactor, just use session[:id]
        })
    })
}

export const logout = () => {
    return fetch('http://localhost:3000/logout', {
        method: "POST",
        credentials: 'include'
    })
}

export const createEvent = (state) => {
    return fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(state)
    })
}

export const delEvent = (eventID) => {
    //fetch delete
    return fetch(`http://localhost:3000/events/${eventID}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const editEvent = (matchID, state) => {
    return fetch(`http://localhost:3000/events/${matchID}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(state)
    })
}