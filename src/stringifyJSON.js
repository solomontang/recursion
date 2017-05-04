// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  if (Array.isArray(obj)) {
    return stringifyArr(obj);
  } else if(typeof obj === 'object' && obj !== null) {
    return stringifyObj(obj);
  } else if (typeof obj === 'string') {
    return stringifyStr(obj);
  }
  return String(obj);
}

var stringifyArr = function(arr) {
  var stringify = arr.reduce(function(string, ele) {
    return string + stringifyJSON(ele) + ',';
  },'[')
  //strip last character (comma) if not default;
  if (stringify !== '[') {
    stringify = stringify.slice(0,-1);
  }

  return stringify + ']';
}

var stringifyStr = function(str) {
  return '"' + str + '"';
}

var stringifyObj = function(obj) {
  var stringify = Object.keys(obj).reduce(function(string, ele) {
    if (typeof obj[ele] === 'function' || obj[ele] === undefined) { //handle unstringifiableValues
      return string;
    }
    return string + '"' + String(ele) + '"' + ':' + stringifyJSON(obj[ele]) + ',';
  },"{");
  //strip last character (comma) if not default;
  if( stringify !== "{") {
    stringify = stringify.slice(0, -1);
  }

  return stringify + '}';
}