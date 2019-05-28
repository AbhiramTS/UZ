const tmplt = require('./templating');
const preview = require('./preview');
const fastify = require('fastify')({ logger: true });
const url = require('url');
const hash = require('object-hash');

fastify.register(require('fastify-cors'), { 
    // put your options here
    origin:"*"
  });

fastify.get('/url', async (request, reply) => {
    const urlParts = url.parse(request.req.url, true);
    const params = urlParts.query;
    const link = params.link;
    const ct = await tmplt(link);
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

fastify.get('/preview', async (request, reply) => {
    const urlParts = url.parse(request.req.url, true);
    const params = urlParts.query;
    const link = params.link;
    const ct = await preview(link);
    const data = {
        image : ct.image,
        title : ct.title,
        author : ct.author,
        publisher : ct.publisher,
        description : ct.description,
        content : ct.text
    }
    const hashedData = hash(data);
    const rply = {
        data : data,
        hash : hashedData
    }
   
    reply.header('Content-Type', 'application/json');
    reply.send(rply);
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
