safejson
===

Concise library to parse and stringify JSON without the need for try catch. Simply use the standard pattern of providing a function with parameters and a callback that takes an error as the first parameter and result as the second.

## Trivial Example

```
// Valid JSON object that will stringify
var VALID_OBJECT = {
  name: 'evan',
  age: 23
};

var VALID_JSON_STRING = JSON.stringify(VALID_OBJECT);

// Invalid JSON object, has a circular reference
var CIRCULAR_OBJECT = {
  name: 'evan',
  age: 23
};
CIRCULAR_OBJECT.cref = CIRCULAR_OBJECT;


var safejson = require('safejson');

safejson.parse(VALID_JSON_STRING, function(err, json) {
  // err is null as no error would have occured due to valid input
  // json is a valid JSON object
});

safejson.stringify(VALID_OBJECT, function(err, json) {
  // err would be null as the object is valid json
  // json is a valid json string
});

safejson.stringify(CIRCULAR_OBJECT, function(err, str) {
  // err would be defined as the object contained a circular reference
  // str would equal null
});
```


## Methods
#### safejson.stringify(value[, replacer [, space]], callback)
Does the job of JSON.stringify but handles exceptions for you. Supports all the usual JSON.stringify parameters, including the optional *replacer* and *spaces*. The last parameter must always be a callback function and is not optional.

#### safejson.parse(str[, reviver], callback)
Does the job of JSON.parse but handles exceptions for you. Supports all the usual JSON.parse parameters. The last parameter must always be a callback function and is not optional.


## Tests
Tests can be run using mocha on the _tests/node.js_ file. Browser tests can be run by opening the _tests/browser/index.html_ file.