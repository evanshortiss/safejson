
var DEFAULT_SPACES = 0,
  DEFAULT_REPLACER = null,
  DEFAULT_REVIVER = null;


/**
 * Set how many spaces stringified JSON should use.
 * @param {Number} spaces
 */
exports.setDefaultSpaces = function(spaces) {
  if(typeof spaces !== 'number') {
    throw new Error('The spaces parameter should be a Number');
  }

  DEFAULT_SPACES = spaces;
};


/**
 * Set the default reviver function for parsing.
 * @param {Function} reviver
 */
exports.setDefaultReviver = function(reviver) {
  if(typeof reviver !== 'function') {
    throw new Error('The reviver parameter should be a Function');
  }

  DEFAULT_REVIVER = reviver;
};


/**
 * Set the default replacer function for stringifying.
 * @param {Function} replacer
 */
exports.setDefaultReplacer = function(replacer) {
  if(typeof replacer !== 'function') {
    throw new Error('The replacer parameter should be a Function');
  }

  DEFAULT_REPLACER = replacer;
};


/**
 * Stringify JSON and catch any possible exceptions.
 * @param {Object}    json
 * @param {Function}  [replacer]
 * @param {Number}    [spaces]
 * @param {Function}  callback
 */
exports.stringify = function(json, replacer, spaces, callback) {
  if (arguments.length === 2) {
    callback = replacer;

    replacer = DEFAULT_REPLACER;
    spaces = DEFAULT_SPACES;
  } else if(arguments.length === 3) {
    callback = spaces;

    spaces = DEFAULT_SPACES;
  }

  var str =  null;
  try {
    str = JSON.stringify(json, replacer, spaces);
  } catch(e) {
    return callback(e, null);
  }

  return callback(null, str);
};

/**
 * Parse string of JSON and catch any possible exceptions.
 * @param {String}    json
 * @param {Function}  [reviver]
 * @param {Function}  callback
 */
exports.parse = function(json, reviver, callback) {
  if (arguments.length === 2) {
    callback = reviver;

    reviver = DEFAULT_REVIVER;
  }

  try {
    json = JSON.parse(json, reviver);
  } catch(e) {
    return callback(e, null);
  }

  return callback(null, json);
};