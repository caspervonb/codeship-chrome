var child = require('child_process');
var test = require('tape');
var http = require('http');

test('chrome', function(test) {
  var server = http.createServer();

  server.on('listening', function() {
    var ps = child.spawn('/usr/bin/google-chrome', ['http://localhost:8000']);

    server.on('request', function() {
      test.end('request made');
    });
  });

  server.listen(8000);
});
