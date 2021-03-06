const request = require('request');
const cheerio = require('cheerio');

const getContent = async (url) => {
    var content = "test";

    return new Promise(resolve => {
        request(url, (err, resp, html) => {
            if (!err && resp.statusCode == 200) {
                const $ = cheerio.load(html);



                resolve(content = {
                    head: $('head').html(),
                    content: $('.section-content').html()
                });
            }
        });
    })

}



module.exports = getContent;
