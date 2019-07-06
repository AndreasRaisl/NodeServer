const Logger = require('./logger');

const myLogger = new Logger();
myLogger.on('message', (data) => {
  console.log(`Listener called: `, data);
});

myLogger.log('Andreas');
myLogger.log('Halyna');
myLogger.log('Daniel');


