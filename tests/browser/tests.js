(function() {
  mocha.globals(['safejson', 'expect']);

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

  describe('Test the safejson library functions.', function() {

    it('Should stringify a valid object witout any errors.', function() {
      safejson.stringify(VALID_OBJECT, function(err, str) {
        expect(err).to.be(null);
        expect(str).to.be.a('string');
        expect(str).to.be(JSON.stringify(VALID_OBJECT));
      });
    });


    it('Should fail to stringify an object due to circular reference.', function() {
      safejson.stringify(CIRCULAR_OBJECT, function(err, str) {
        expect(err).to.not.be(null);
        expect(str).to.be(null);
      });
    });


    it('Should parse a JSON string to an Object.', function() {
      safejson.parse(VALID_JSON_STRING, function(err, json) {
        expect(err).to.be(null);
        expect(json).to.be.an('object');
      });
    });
  });
})();
