import {deleteItem, getItem, getItems, setItem} from "./common";

const key = 'contract'

export function getContracts() {
    return getItems(key)
}


export function deleteContract(id) {
    deleteItem(key, id)
}

export function setContract(contract) {
    return setItem(key, contract)
}

export function getContract(id) {
    return getItem(key, id)
}
