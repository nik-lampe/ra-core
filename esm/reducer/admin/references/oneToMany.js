var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { CRUD_GET_MANY_REFERENCE_SUCCESS, } from '../../../actions/dataActions';
var initialState = {};
var oneToManyReducer = function (previousState, action) {
    if (previousState === void 0) { previousState = initialState; }
    var _a;
    switch (action.type) {
        case CRUD_GET_MANY_REFERENCE_SUCCESS:
            return __assign({}, previousState, (_a = {}, _a[action.meta.relatedTo] = {
                ids: action.payload.data.map(function (record) { return record.id; }),
                total: action.payload.total,
            }, _a));
        default:
            return previousState;
    }
};
export var getIds = function (state, relatedTo) {
    return state.admin.references.oneToMany[relatedTo] &&
        state.admin.references.oneToMany[relatedTo].ids;
};
export var getTotal = function (state, relatedTo) {
    return state.admin.references.oneToMany[relatedTo] &&
        state.admin.references.oneToMany[relatedTo].total;
};
export var getReferences = function (state, reference, relatedTo) {
    var ids = getIds(state, relatedTo);
    if (typeof ids === 'undefined') {
        return undefined;
    }
    if (!state.admin.resources[reference]) {
        // eslint-disable-next-line no-console
        console.error("Invalid Resource \"" + reference + "\"\n" +
            ("You are trying to display or edit a field of a resource called \"" + reference + "\", ") +
            'but it has not been declared.\n' +
            "Declare this resource in the Admin or check the 'reference' prop of ReferenceArrayField and ReferenceManyField.", { ids: ids });
    }
    return ids
        .map(function (id) {
        var resource = state.admin.resources[reference];
        if (!resource) {
            return;
        }
        return resource.data[id];
    })
        .filter(function (r) { return typeof r !== 'undefined'; })
        .reduce(function (prev, record) {
        prev[record.id] = record; // eslint-disable-line no-param-reassign
        return prev;
    }, {});
};
export var getReferencesByIds = function (state, reference, ids) {
    if (ids.length === 0) {
        return {};
    }
    if (!state.admin.resources[reference]) {
        // eslint-disable-next-line no-console
        console.error("Invalid Resource \"" + reference + "\"\n" +
            ("You are trying to display or edit a field of a resource called \"" + reference + "\", ") +
            'but it has not been declared.\n' +
            "Declare this resource in the Admin or check the 'reference' prop of ReferenceArrayField.", { ids: ids });
    }
    var references = ids
        .map(function (id) {
        var resource = state.admin.resources[reference];
        if (!resource) {
            return;
        }
        return resource.data[id];
    })
        .filter(function (r) { return typeof r !== 'undefined'; })
        .reduce(function (prev, record) {
        prev[record.id] = record; // eslint-disable-line no-param-reassign
        return prev;
    }, {});
    return Object.keys(references).length > 0 ? references : null;
};
export var nameRelatedTo = function (reference, id, resource, target, filter) {
    if (filter === void 0) { filter = {}; }
    var keys = Object.keys(filter);
    if (!keys.length) {
        return resource + "_" + reference + "@" + target + "_" + id;
    }
    return resource + "_" + reference + "@" + target + "_" + id + "?" + keys
        .map(function (key) { return key + "=" + JSON.stringify(filter[key]); })
        .join('&');
};
export default oneToManyReducer;
