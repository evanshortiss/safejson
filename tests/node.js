var assert = require('assert'),
  safejson = require('../safejson.js');


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

var VALID_JSON_STRING = JSON.stringify(VALID_OBJECT);

describe('Test the safejson library', function() {

  it('Should stringify witout any errors', function() {
    safejson.stringify(VALID_OBJECT, function(err, str) {
      assert.equal(err, null);
      assert(typeof str === 'string');
    });
  });

  it('Should fail to stringify due to circular reference', function() {
    safejson.stringify(CIRCULAR_OBJECT, function(err, str) {
      assert.notEqual(err, null);
      assert.equal(str, null);
    });
  });


  it('Should parse to an Object', function() {
    safejson.parse(VALID_JSON_STRING, function(err, json) {
      assert.equal(err, null);
      assert.notEqual(json, null);
      assert.equal(json.age, VALID_OBJECT.age);
    });
  });
});