import router from "./router";

const routes = router.options.routes

export function searchChildren(name) {
    for(let route of routes){
        if(route.name === name)
            return route.children
    }

    return []
}

const divider = {name: null}

export const defaultMenus = [
    routes[0],
    divider,
    routes[3],
    // routes[4],
    // routes[5],
    // routes[6],
    divider,
    routes[1],
    routes[2],
]
