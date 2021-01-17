import {deleteItem, getItem, getItems, setItem} from "./common";

const key = 'order'

export function getOrders() {
    return getItems(key)
}

export function deleteOrder(no) {
    deleteItem(key, no)
}

export function setOrder(contract) {
    return setItem(key, contract)
}

export function getOrder(no) {
    return getItem(key, no)
}

export function newOrder() {
    return {
        no: 0,
        name: null,
        productSKU: null,
        contractNo: 0,
        tags: []
    }
}
