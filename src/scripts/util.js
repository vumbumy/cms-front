const moment = require('moment')

export function dateToDateTime(date) {
    return moment(date).format('YY-MM-DD HH:mm')
}