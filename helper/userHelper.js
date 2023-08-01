const users = []

const newUser = (id, username, room) => {
    const user =  {
        id,
        username,
        room
    }
    users.push(user)
    return user
}

const getUsersOfRoom = (roomId) => {
    return users.filter((item) => item.room === roomId)
}

const exitRoom = (id) => {
    const index = users.findIndex((user)=> user.id === id)

    if(id !== -1){
        return users.splice(index,1)[0]
    }
}

const getActiveUsers = (id) => {
    return users.find(user => user.id === id)
}

module.exports = {
    newUser,
    getUsersOfRoom,
    exitRoom,
    getActiveUsers
}