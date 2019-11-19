

import { ManageApis, ManageControllers, TravelApis } from './api'

export function apiVerify(apis: ManageApis, controllers: ManageControllers) {
    let verifyPath = {}
    let verifyOperationId = {}
    Object.keys(apis).forEach(apiItem => {
        const items: TravelApis = apis[apiItem]
        items.forEach(item => {
            const { path, method, operationId } = item
            if (!verifyPath[path]) {
                verifyPath[path] = {}
            }
            if (!verifyPath[path][method]) {
                verifyPath[path][method] = operationId
            } else {
                throw `apis path and method: ${path},${method} already exist`
            }
        })
    })

    Object.keys(controllers).forEach(data => {
        if (!verifyOperationId) {
            verifyOperationId[data] = controllers[data]
        } else {
            throw `controllers operationId:${data} already exist`
        }
    })

    
}