function setTemplates(templates) {
    let jsonStr = JSON.stringify(templates)

    console.log(jsonStr)

    localStorage.setItem('template', jsonStr)
}

function getAllTemplates() {
    let jsonStr = localStorage.getItem("template")
    if(jsonStr == null)
        return []

    return JSON.parse(jsonStr)
}

export function getTemplates() {
    let templates = getAllTemplates()

    return templates.filter(template => !template.delete)
}

function newTemplateId() {
    let lastId = 0

    let templates = getAllTemplates()

    templates.forEach((e) => lastId = Math.max(lastId, e.id))

    return lastId + 1
}

function postTemplate(template) {
    let templates = getTemplates()

    // TODO: 임시 ID 발급
    template.id = newTemplateId()

    templates.push(template)

    setTemplates(templates)

    return template.id
}

function putTemplate(template) {
    let templates = getTemplates()

    let updated = templates.map(t => t.id === template.id ? template : t)

    setTemplates(updated)

    return template.id
}

export function deleteTemplate(id) {
    let templates = getTemplates()

    let index = templates.findIndex(t => t.id === id)
    // if (index !== -1) templates.splice(index, 1);

    templates[index].delete = true

    setTemplates(templates)
}

export function setTemplate(template) {
    if(!template.id || template.id === 0)
        return postTemplate(template)
    else
        return putTemplate(template)
}

export function getTemplate(id) {
    let templates = getTemplates()

    return templates.find((e) => e.id === id)
}
