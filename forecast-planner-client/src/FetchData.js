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