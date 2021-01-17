import {deleteItem, getItem, getItems, setItem} from "./common";

const key = 'contract'

export function getContracts() {
    return getItems(key)
}

export function deleteContract(no) {
    deleteItem(key, no)
}

export function setContract(contract) {
    return setItem(key, contract)
}

export function getContract(no) {
    return getItem(key, no)
}
