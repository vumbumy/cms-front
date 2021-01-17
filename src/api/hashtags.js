import {deleteItem, getItem, getItems, setItem} from "./common";

const key = 'hashtags'

export function getHashtags() {
    return getItems(key)
}

export function deleteHashtag(no) {
    deleteItem(key, no)
}

export function setHashtag(contract) {
    return setItem(key, contract)
}

export function getHashtag(no) {
    return getItem(key, no)
}
