import {deleteItem, getItem, getItems, setItem} from "./common";

const key = 'category'

export function getCategories() {
    return getItems(key)
}

export function deleteCategory(no) {
    deleteItem(key, no)
}

export function setCategory(contract) {
    return setItem(key, contract)
}

export function getCategory(no) {
    return getItem(key, no)
}
