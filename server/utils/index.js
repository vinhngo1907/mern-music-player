const rp = require('request-promise');
const request = require('request');

async function getHeaders() {
    const options = {
        url: 'https://zingmp3.vn/',
        method: 'GET',
    };

    // Return new promise
    return new Promise(function (resolve, reject) {
        // Do async job
        request.get(options, function (err, response, body) {
            if (err) {
                reject(err);
            } else {
                resolve(response.headers);
            }
        })
    })
}

exports.isEmpty = function (obj) {
    return Object.keys(obj).length === 0;
}

exports.pageQuery = function (page) {
    return page ? `&page=${page}` : '';
}

exports.getRedisKey = function (req) {
    const pageQuery = req.query.page && `?page=${req.query.page}`;
    const key = `${req.params.id || req.params.type}${pageQuery || ''}`;
    return key;
}