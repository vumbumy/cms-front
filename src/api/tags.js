import {deleteItem, getItems, postItem} from "./common";

const key = 'tags'

export function getTags() {
    return getItems(key)
}

export function getTagsName(tagsNo) {
    let tags = getTags()

    return tagsNo.map(tagNo => tags.find(tag => tag.no === tagNo).name)
}

export function deleteTag(no) {
    deleteItem(key, no)
}

export function setTags(tagsName) {
    let tags = getTags()

    let tagNoList = []

    for(let tagName of tagsName){
        let foundTag = tags.find(t => t.name === tagName)

        if(foundTag === undefined)
            tagNoList.push(postItem(key, {name: tagName}))
        else
            tagNoList.push(foundTag.no)
    }

    return tagNoList
}
