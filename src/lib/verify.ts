

import { ManageApis, ManageControllers, travelersApis } from "./api";

export function apiVerify(apis: ManageApis, controllers: ManageControllers) {
    let verifyPath = {};
    let verifyOperationId = {};
    Object.keys(apis).forEach(apiItem => {
        const items: travelersApis = apis[apiItem];
        items.forEach(item => {
            const { path, method, operationId } = item;
            if (!verifyPath[path]) {
                verifyPath[path] = {};
            }
            if (!verifyPath[path][method]) {
                verifyPath[path][method] = operationId;
            } else {
                throw `apis path and method: ${path},${method} already exist`;
            }
        });
    });

    Object.keys(controllers).forEach(data => {
        if (!verifyOperationId[data]) {
            verifyOperationId[data] = controllers[data];
        } else {
            throw `controllers operationId:${data} already exist`;
        }
    });

    
}