var child = require('child_process');
var test = require('tape');
var http = require('http');

test('chrome', function(test) {
  test.plan(2);

  var server = http.createServer();

  server.on('listening', function() {
    test.pass('server listening');
    
    var ps = child.spawn('google-chrome', ['http://localhost:8000/']);

    ps.on('close', function(code, signal) {
      test.pass('browser closed');
      server.close();
    });

    ps.stderr.pipe(process.stderr);
    ps.stdout.pipe(process.stderr);

    server.on('request', function(request, response) {
      test.comment('server request ' + request.url);

      if (request.url === '/') {
        ps.kill();
      }
    });
  });

  server.listen(8000);
});
