function setItems(key, items) {
    let jsonStr = JSON.stringify(items)

    localStorage.setItem(key, jsonStr)
}

 function getAllItems(key) {
    let jsonStr = localStorage.getItem(key)
     console.log(jsonStr)

    if(jsonStr == null)
        return []

    return JSON.parse(jsonStr)
}

export function getItems(key) {
    let items = getAllItems(key)

    return items.filter(item => !item.delete)
}

function newItemId(key) {
    let lastId = 0

    let items = getAllItems(key)

    items.forEach((e) => lastId = Math.max(lastId, e.id))

    return lastId + 1
}

function postItem(key, item) {
    let items = getItems(key)

    // TODO: 임시 ID 발급
    item.id = newItemId(key)

    items.push(item)

    setItems(key, items)

    return item.id
}

function putItem(key, item) {
    let items = getItems(key)

    let updated = items.map(t => t.id === item.id ? item : t)

    setItems(key, updated)

    return item.id
}

export function deleteItem(key, id) {
    let items = getItems(key)

    let index = items.findIndex(t => t.id === id)
    // if (index !== -1) items.splice(index, 1);

    items[index].delete = true

    setItems(key, items)
}

export function setItem(key, item) {
    if(!item.id || item.id === 0)
        return postItem(key, item)
    else
        return putItem(key, item)
}

export function getItem(key, id) {
    let items = getItems(key)

    return items.find((item) => item.id === id)
}
