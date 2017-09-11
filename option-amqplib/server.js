const http = require('http');
const amqp = require('amqplib/callback_api');
const execute = require('../common/execute');
const port = process.env.PORT || 3000;

let id = 0;

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    const q = 'message';

    ch.assertQueue(q, {durable: false});

    const server = http.createServer((req, res) => {
      const job = { id: ++id, content: 'trolololo' };
      ch.sendToQueue(q, new Buffer(JSON.stringify(job)));
      execute('option-amqplib/result-amqplib.txt', 'store', job.id);
      res.end(`{"status": ${job.id}}`);
    });

    server.listen(port, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`server is listening on ${port}`);
    });
  });
});

