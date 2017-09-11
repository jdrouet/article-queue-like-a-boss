const execute = require('../common/execute');

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, ch) => {
    const q = 'message';
    ch.assertQueue(q, {durable: false});
    ch.consume(q, (msg) => {
      const job = JSON.parse(msg.content.toString());
      execute('option-amqplib/result-amqplib.txt', 'execute', job.id);
    }, {noAck: true});
  });
});