(function() {
  var safejson = {};

  // Determines wether actions should be deferred for processing
  safejson.defer = true;

  // Determine our environment
  var isBrowser = true;

  // Function to use for deferred calls
  var deferFn = null;

  if (typeof module !== 'undefined' && module.exports) {
    isBrowser = false;
    deferFn = process.nextTick;
  } else {
    deferFn = window.setTimeout;
  }

  /**
   * Defer a function call momentairly.
   * @param {Function} fn
   */
  function deferred(fn) {
    if(safejson.defer === true) {
      deferFn(fn);
    } else {
      fn();
    }
  }


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

    deferred(function() {
      try {
        return callback(null, JSON.stringify.apply(null, args));
      } catch (e) {
        return callback(e, null);
      }
    });
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

    deferred(function() {
      try {
        return callback(null, JSON.parse.apply(null, args));
      } catch (e) {
        return callback(e, null);
      }
    });
  };


  // Apply appropriate export for environment
  if (isBrowser === false) {
    module.exports = safejson;
  } else {
    window.safejson = safejson;
  }
})();
