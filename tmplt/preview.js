const request = require('request');
const extractor = require('unfluff');

const preview =async (url) => {
    let data = "";
    return new Promise(resolve => {
        request(url, (err, resp, html) => {
            if (!err && resp.statusCode == 200){
                resolve(data = extractor(html));
            }
        });
    });
}

module.exports = preview;