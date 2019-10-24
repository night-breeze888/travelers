

global.config = require('./server/config')


require('./server').listen(config.port, function () {
  console.log(`server listen ${config.port}，documentation open ${config.swagger.host}/swagger/`)
})

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err.stack);
});

process.on('unhandledRejection', function (err) {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', err);
});
