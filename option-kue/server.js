const http = require('http');
const kue = require('kue');
const execute = require('../common/execute');
const port = process.env.PORT || 3000;

const queue = kue.createQueue();

const handleRequest = (req, res) => {
  const job = queue
    .create('message', { content: 'trolololo' })
    .save((err) => {
      if (err) {
        console.error(error);
        res.end('{"status": "error"}');
      } else {
        execute('option-kue/result-kue.txt', 'store', job.id);
        res.end(`{"status": ${job.id}}`);
      }
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
