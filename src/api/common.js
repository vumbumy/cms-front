const moment = require('moment')

export function setItems(key, items) {
    let jsonStr = JSON.stringify(items)
    console.log(jsonStr)

    localStorage.setItem(key, jsonStr)
}

 function getAllItems(key) {
    let jsonStr = localStorage.getItem(key)
    if(jsonStr == null)
        return []

    return JSON.parse(jsonStr)
}

export function getItems(key) {
    let items = getAllItems(key)

    return items.filter(item => !item.delete)
}

function newItemNo(key) {
    let lastNo = 0

    let items = getAllItems(key)

    items.forEach((e) => lastNo = Math.max(lastNo, e.no))

    return lastNo + 1
}

export function postItem(key, item) {
    let items = getItems(key)

    // TODO: 임시 번호 발급
    item.no = newItemNo(key)
    item.created = moment().unix()
    item.updated = moment().unix()

    items.push(item)

    setItems(key, items)

    return item.no
}

export function putItem(key, item) {
    let items = getItems(key)

    item.updated = moment().unix()

    let updated = items.map(t => t.no === item.no ? item : t)

    setItems(key, updated)

    return item.no
}

export function deleteItem(key, no) {
    let items = getItems(key)

    let index = items.findIndex(t => t.no === no)

    items[index].delete = true

    setItems(key, items)
}

export function setItem(key, item) {
    if(!item.no || item.no === 0)
        return postItem(key, item)
    else
        return putItem(key, item)
}

export function getItem(key, no) {
    let items = getItems(key)

    no = parseInt(no)

    return items.find((item) => item.no === no)
}
