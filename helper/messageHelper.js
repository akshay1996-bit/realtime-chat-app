const moment = require('moment')

const messageFormatter = (user,message) => {
    return {
        user,
        message,
        time: moment().format('hh:mm a')
    }
}

module.exports = messageFormatter