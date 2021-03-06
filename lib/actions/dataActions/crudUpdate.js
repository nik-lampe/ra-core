"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dataFetchActions_1 = require("../../dataFetchActions");
exports.crudUpdate = function (resource, id, data, previousData, basePath, redirectTo) {
    if (redirectTo === void 0) { redirectTo = 'show'; }
    return ({
        type: exports.CRUD_UPDATE,
        payload: { id: id, data: data, previousData: previousData },
        meta: {
            resource: resource,
            fetch: dataFetchActions_1.UPDATE,
            onSuccess: {
                notification: {
                    body: 'ra.notification.updated',
                    level: 'info',
                    messageArgs: {
                        smart_count: 1,
                    },
                },
                redirectTo: redirectTo,
                basePath: basePath,
            },
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning',
                },
            },
        },
    });
};
exports.CRUD_UPDATE = 'RA/CRUD_UPDATE';
exports.CRUD_UPDATE_LOADING = 'RA/CRUD_UPDATE_LOADING';
exports.CRUD_UPDATE_FAILURE = 'RA/CRUD_UPDATE_FAILURE';
exports.CRUD_UPDATE_SUCCESS = 'RA/CRUD_UPDATE_SUCCESS';
