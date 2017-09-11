const Queue = require('bull');
const execute = require('../common/execute');

const queue = new Queue('message', 'redis://127.0.0.1:6379');

queue.process((job) => execute('option-bull/result-bull.txt', 'execute', job.id));
