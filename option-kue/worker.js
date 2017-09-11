const kue = require('kue');
const queue = kue.createQueue();
const execute = require('../common/execute');

queue.process('message', (job, done) => execute('option-kue/result-kue.txt', 'execute', job.id).then(done));
