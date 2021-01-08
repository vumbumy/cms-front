function setTemplates(templates) {
    let jsonStr = JSON.stringify(templates)

    console.log(jsonStr)

    localStorage.setItem('template', jsonStr)
}

export function getTemplates() {
    let jsonStr = localStorage.getItem("template")
    if(jsonStr == null)
        return []

    return JSON.parse(jsonStr)
}

function newTemplateId() {
    let lastId = 0

    let templates = getTemplates()

    templates.forEach((e) => lastId = Math.max(lastId, e.id))

    return lastId + 1
}

function addTemplate(template) {
    let templates = getTemplates()

    // TODO: 임시 ID 발급
    template.id = newTemplateId()

    templates.push(template)

    setTemplates(templates)

    return template.id
}

function updateTemplate(template) {
    let templates = getTemplates()

    let updated = templates.map(t => {
        return t.id === template.id ? template : t
    })

    setTemplates(updated)

    return template.id
}

export function setTemplate(template) {
    if(!template.id || template.id === 0)
        return addTemplate(template)
    else
        return updateTemplate(template)
}

export function getTemplate(id) {
    let templates = getTemplates()

    return templates.find((e) => e.id === id)
}
