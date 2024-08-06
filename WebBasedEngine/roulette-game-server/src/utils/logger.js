// utils/logger.js

function info(message) {
    console.log(`Info: ${message}`);
}

function error(message) {
    console.error(`Error: ${message}`);
}

function debug(message) {
    if (process.env.DEBUG_MODE === 'true') {
        console.log(`Debug: ${message}`);
    }
}

module.exports = {
    info,
    error,
    debug
};
