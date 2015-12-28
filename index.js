var extend = require('extend');
var replace = require('gulp-replace');

const DEFAULT_ENV = 'development';
const KNOWN_ENVS = [ 'production', 'prod', 'development', 'dev', 'test' ];

module.exports = function insertConfig(cfg, lookupStr, opts) {
  opts = opts || {};
  var env = opts.env || process.env.NODE_ENV || DEFAULT_ENV;

  cfg = cfgForEnv(cfg, env);

  var searchRegex = new RegExp('{{\\s*' + lookupStr + '\\s*}}', 'g');
  return replace(searchRegex, JSON.stringify(cfg));
};

function cfgForEnv(cfg, env) {
  var builtCfg = extend(true, {}, cfg);
  if (builtCfg[env]) extend(builtCfg, builtCfg[env]);
  KNOWN_ENVS.forEach(function(name) {
    delete builtCfg[name];
  });
  return builtCfg;
}
