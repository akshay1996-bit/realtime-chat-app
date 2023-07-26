const users = []

const addNewUser = (id,username,room) => {
    const user = {id,username,room}
    users.push(user)
    return user
}

const getActiveUser = (id) => {
    return users.find(user=> id === user.id)
}

module.exports = {
    addNewUser,
    getActiveUser
}