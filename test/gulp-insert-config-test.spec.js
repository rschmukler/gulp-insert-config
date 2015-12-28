var expect = require('expect.js');
var File = require('vinyl');

var insertCfg = require('../');

describe('gulp-insert-config', function() {
  it('works on a simple cfg', function(done) {
    buildCfg({ name: 'Bob' }, function(err, result) {
      expect(result).to.be('{"name":"Bob"}');
      done();
    });
  });
  it('resolves nested envs', function(done) {
    buildCfg({ name: 'Bob', test: { name: 'Steve', age: 22 } }, 'test', function(err, result) {
      expect(result).to.be('{"name":"Steve","age":22}');
      done();
    });
  });
  it('is space tollerant for finding the compile string', function(done) {
    buildCfg({ name: 'Bob' }, 'test', '{{TEST}}', function(err, result) {
      expect(result).to.be('{"name":"Bob"}');
      done();
    });
  });
});

function buildCfg(cfg, env, str, cb) {
  if (!cb) {
    if (str) {
      cb = str;
      str = undefined;
    } else {
      cb = env;
    }
  }
  str = str || '{{ TEST }}';

  var file = new File({
    path: 'test-file.txt',
    cwd: 'test/',
    base: 'test/',
    contents: new Buffer(str)
  });
  
  var stream = insertCfg(cfg, 'TEST', { env: env });
  stream.on('data', function(result) {
    cb(null, result.contents.toString());
  });
  stream.write(file);
  stream.end();
}
