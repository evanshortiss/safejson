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

  function validStringify(done) {
    safejson.stringify(VALID_OBJECT, function(err, str) {
      expect(err).to.be(null);
      expect(str).to.be.a('string');
      expect(str).to.be(JSON.stringify(VALID_OBJECT));

      if(done) {
        done();
      }
    });
  }

  function circularStringify(done) {
    safejson.stringify(CIRCULAR_OBJECT, function(err, str) {
      expect(err).to.not.be(null);
      expect(str).to.be(null);

      if(done) {
        done();
      }
    });
  }

  function validParse(done) {
    safejson.parse(VALID_JSON_STRING, function(err, json) {
      expect(err).to.be(null);
      expect(json).to.be.an('object');

      if(done) {
        done();
      }
    });
  }

  describe('Test the safejson library functions.', function() {

    it('Should stringify witout any errors', function() {
      validStringify();
    });
    it('Should fail to stringify due to circular reference', function() {
      circularStringify();
    });
    it('Should parse to an Object', function() {
      validParse();
    });

    // Defer calls
    safejson.defer = true;

    it('Should stringify witout any errors', validStringify);
    it('Should fail to stringify due to circular reference', circularStringify);
    it('Should parse to an Object', validParse);
  });
})();
