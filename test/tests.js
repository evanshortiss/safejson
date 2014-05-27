var assert = require('assert'),
  safejson = require('../src/index.js');


// Valid JSON object that will stringify
var VALID_OBJECT = {
  name: 'evan',
  age: 23
};

// Invalid JSON object, has a circular reference
var CIRCULAR_OBJECT = {
  name: 'evan',
  age: 23
};
CIRCULAR_OBJECT.cref = CIRCULAR_OBJECT;

var VALID_STRING = JSON.stringify(VALID_OBJECT);

// Perform all calls synchronously
safejson.defer = false;

describe('#parse()', function () {

  it('Should successfully parse a JSON string.', function () {
    safejson.parse(VALID_STRING, function(err, res) {
      assert.equal(err, null);
      assert.equal(typeof res, 'object');
      assert.equal(res.name, 'evan');
    });
  });

  it('Should return a parse error due to malformed JSON string.', function () {
    var str = VALID_STRING + 'NONSENSE+123123';

    safejson.parse(str, function(err, res) {
      assert.notEqual(err, null);
      assert.equal(res, null);
    });
  });

  it('Should return JSON modified with reviver function.', function () {
    safejson.parse(VALID_STRING, function (p, v) {
      if (p === 'name') {
        return 'NAME REMOVED';
      } else {
        return v;
      }
    }, function(err, res) {
      assert.equal(err, null);
      assert.equal(typeof res, 'object');
      assert.equal(res.name, 'NAME REMOVED');
    });
  });

});

describe('#stringify', function() {

  it('Should successfully stringify a JSON object.', function () {
    safejson.stringify(VALID_OBJECT, function(err, res) {
      assert.equal(err, null);
      assert.equal(typeof res, 'string');
    });
  });

  it('Should return an error due to circular reference.', function () {
    safejson.stringify(CIRCULAR_OBJECT, function(err, res) {
      assert.notEqual(err, null);
      assert.equal(res, null);
    });
  });

  it('Should return JSON with specified indentation.', function () {
    safejson.stringify(VALID_OBJECT, null, 4, function(err, res) {
      assert.equal(err, null);
      assert.equal(res, JSON.stringify(VALID_OBJECT, null, 4));
    });
  });

  it('Should return JSON modified with replacer function.', function () {
    safejson.stringify(VALID_OBJECT, function (p, v) {
      if (p === 'name') {
        return 'NAME REMOVED';
      } else {
        return v;
      }
    }, function(err, res) {
      assert.equal(err, null);
      assert.equal(typeof res, 'string');
      assert.equal(JSON.parse(res).name, 'NAME REMOVED');
    });
  });
});
