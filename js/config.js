// config js contains code and settings that are used throughout the
// application. It also contains code blocks that do not really belong 
// anywhere else such as system type extensions.


// extend array prototype with a equals function.
// the function checks the arrays are exactly the same.

Array.prototype.equals = function (array, strict) {
    if (!array)
        return false;

    if (arguments.length == 1)
        strict = true;

    if (this.length != array.length)
        return false;

    for (var i = 0; i < this.length; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i], strict))
                return false;
        }
        else if (strict && this[i] != array[i]) {
            return false;
        }
        else if (!strict) {
            return this.sort().equals(array.sort(), true);
        }
    }
    return true;
}

// extend array prototype with a compare function.
// the function checks the arrays contain all the same values ( but in any order )

Array.prototype.compare = function(testArr) {
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if (this[i].compare) { 
            if (!this[i].compare(testArr[i])) return false;
        }
        if (this[i] !== testArr[i]) return false;
    }
    return true;
}

// functional currying. Fun times :)

var autoCurry = (function () {
 
    var toArray = function toArray(arr, from) {
        return Array.prototype.slice.call(arr, from || 0);
    },
 
    curry = function curry(fn /* variadic number of args */) {
        var args = toArray(arguments, 1);
        return function curried() {
            return fn.apply(this, args.concat(toArray(arguments)));
        };
    };
 
    return function autoCurry(fn, numArgs) {
        numArgs = numArgs || fn.length;
        return function autoCurried() {
            if (arguments.length < numArgs) {
                return numArgs - arguments.length > 0 ?
                    autoCurry(curry.apply(this, [fn].concat(toArray(arguments))),
                              numArgs - arguments.length) :
                    curry.apply(this, [fn].concat(toArray(arguments)));
            }
            else {
                return fn.apply(this, arguments);
            }
        };
    };
 
}());

Function.prototype.autoCurry = function(n) { return autoCurry(this, n); }

function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};