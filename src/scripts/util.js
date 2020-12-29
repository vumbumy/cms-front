const moment = require('moment')

export function dateToDateTime(date) {
    if(date == null) return ""
    return moment(date).format('YY.MM.DD HH:mm')
}

export function datesToString(dates) {
    if(dates == null) return ""

    let strArray = []

    for(let i=0; i<dates.length; i++)
        strArray.push(moment(dates[i]).format('YY.MM.DD'))

    return strArray.join(' ')
}
