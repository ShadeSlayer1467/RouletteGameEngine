// utils/helpers.js

function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function formatResponse(data, message = 'Operation successful') {
    return {
        data,
        message,
        timestamp: new Date().toISOString()
    };
}

module.exports = {
    isEmpty,
    formatResponse
};
