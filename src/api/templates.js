import {deleteItem, getItem, getItems, setItem} from "./common";

const key = 'template'

export function getTemplates() {
    return getItems(key)
}

export function deleteTemplate(no) {
    deleteItem(key, no)
}

export function setTemplate(template) {
    return setItem(key, template)
}

export function getTemplate(no) {
    return getItem(key, no)
}
