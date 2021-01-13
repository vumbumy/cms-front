import {deleteItem, getItem, getItems, setItem} from "./common";

const key = 'template'

export function getTemplates() {
    return getItems(key)
}

export function deleteTemplate(id) {
    deleteItem(key, id)
}

export function setTemplate(template) {
    return setItem(key, template)
}

export function getTemplate(id) {
    return getItem(key, id)
}
