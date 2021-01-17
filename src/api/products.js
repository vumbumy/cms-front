import {getItems, setItems} from "./common";

const key = 'product'

function postProduct(item) {
    let items = getItems(key)

    items.push(item)

    setItems(key, items)

    return item.sku
}

function putProduct(item) {
    let items = getItems(key)

    let updated = items.map(t => t.sku === item.sku ? item : t)

    setItems(key, updated)

    return item.sku
}

export function deleteProduct(sku) {
    let items = getItems(key)

    let index = items.findIndex(t => t.sku === sku)

    items[index].delete = true

    setItems(key, items)
}

export function isExistSKU(sku) {
    let item = getProduct(sku)

    return item !== undefined
}

export function setProduct(item) {
    if(isExistSKU(item.sku))
        return putProduct(item)
    else
        return postProduct(item)
}

export function getProduct(sku) {
    let items = getItems(key)

    return items.find((item) => item.sku === sku)
}

export function getProducts() {
    return getItems(key)
}

export function newProduct() {
    return {
        name: null,
        categoryNo: 0,
        contractNo: 0,
        sku: null,
        stock: 0,
        amount: 0,
        price: 0,
        dates1: [],
        page: false,
        pageHtml: null,
        tags: []
    }
}
