var child = require('child_process');
var test = require('tape');
var http = require('http');

test('chrome', function(test) {
  var server = http.createServer();

  server.on('listening', function() {
    test.comment('server listening');

    var ps = child.spawn('google-chrome', ['http://localhost:8000/']);

    ps.on('close', function(code, signal) {
      test.comment('browser closed');
      server.close();
    });

    ps.stderr.pipe(process.stderr);
    ps.stdout.pipe(process.stderr);

    server.on('request', function(request, response) {
      test.comment('server request ' + request.url);

      if (request.url === '/') {
        ps.kill();
        test.end();
      }
    });
  });

  server.listen(8000);
});
