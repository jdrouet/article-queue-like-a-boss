const http = require('http');
const Queue = require('bull');

const execute = require('../common/execute');
const port = process.env.PORT || 3000;

const queue = new Queue('message', 'redis://127.0.0.1:6379');

const handleRequest = (req, res) => {
  queue.add({ content: 'trolololo' }).then((job) => {
    execute('option-bull/result-bull.txt', 'store', job.id);
    res.end(`{"status": ${job.id}}`);
  });
};

const server = http.createServer(handleRequest);

server.listen(port, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`server is listening on ${port}`);
});
