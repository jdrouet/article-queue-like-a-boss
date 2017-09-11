const fs = require('fs');

module.exports = (filename, action, id) => {
  fs.appendFileSync(filename, `${action},${id},${Date.now()}\n`);
  return Promise.resolve();
};
