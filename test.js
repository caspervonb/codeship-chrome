var child = require('child_process');
var test = require('tape');
var http = require('http');


test('firefox', function(test) {
  test.timeoutAfter(15000);
  var server = http.createServer();

  server.on('listening', function() {
    var ps = child.spawn('firefox', ['http://localhost:8000/']);

    ps.on('close', function(code, signal) {
      console.log('browser closed %s %s', code, signal);
    });

    ps.stderr.pipe(process.stderr);
    ps.stdout.pipe(process.stderr);

    server.on('request', function(request, response) {
      test.comment(request.url);
      test.end();
    });
  });

  server.listen(8000);
});

test('chrome', function(test) {
  test.timeoutAfter(15000);
  var server = http.createServer();

  server.on('listening', function() {
    var ps = child.spawn('google-chrome', ['http://localhost:8000/']);

    ps.on('close', function(code, signal) {
      console.log('browser closed %s %s', code, signal);
    });

    ps.stderr.pipe(process.stderr);
    ps.stdout.pipe(process.stderr);

    server.on('request', function() {
      test.comment(request.url);
      test.end();
    });
  });

  server.listen(8000);
});
