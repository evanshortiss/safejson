(function() {
  var safejson = {};

  /**
   * Stringify JSON and catch any possible exceptions.
   * @param {Object}    json
   * @param {Function}  [replacer]
   * @param {Number}    [spaces]
   * @param {Function}  callback
   */
  safejson.stringify = function(json, replacer, spaces, callback) {
    var args = Array.prototype.slice.call(arguments);
    callback = args.splice(args.length - 1, args.length)[0];

    try {
      return callback(null, JSON.stringify.apply(null, args));
    } catch (e) {
      return callback(e, null);
    }
  };


  /**
   * Parse string of JSON and catch any possible exceptions.
   * @param {String}    json
   * @param {Function}  [reviver]
   * @param {Function}  callback
   */
  safejson.parse = function(json, reviver, callback) {
    var args = Array.prototype.slice.call(arguments);
    callback = args.splice(args.length - 1, args.length)[0];

    try {
      return callback(null, JSON.parse.apply(null, args));
    } catch (e) {
      return callback(e, null);
    }
  };


  // Apply appropriate export for environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = safejson;
  } else {
    window.safejson = safejson;
  }
})();