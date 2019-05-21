const tmplt = require('./templating');
const fastify = require('fastify')({ logger: true });
const url = require('url');


fastify.get('/url', async (request, reply) => {
    const urlParts = url.parse(request.req.url, true);
    const params = urlParts.query;
    const link = params.link;
    const ct = await tmplt(link);
    console.log("ct => ", ct);
    const page = `
    <!DOCTYPE html>
    <html>
    <head>${ct.head}</head>
    <body>
    
        <div>${ct.content}</div>
    
    </body>
    </html>`;
    reply.header('Content-Type', 'text/html');
    reply.send(page);
});

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000)
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start();
