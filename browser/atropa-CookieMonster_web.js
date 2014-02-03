(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CookieMonster = require('../src/atropa-CookieMonster.js');

try {
    Object.keys(CookieMonster).forEach(
        function (prop) {
            if(!atropa[prop]) {
                atropa[prop] = CookieMonster[prop];
            }
        }
    );
} catch (ignore) {
    atropa = require('../src/atropa-CookieMonster.js');
}

Object.keys(CookieMonster.data).filter(
    function (prop) {
        return prop !== 'requirements';
    }
).forEach(
    function (prop) {
        atropa.data[prop] = CookieMonster.data[prop];
    }
);

},{"../src/atropa-CookieMonster.js":3}],2:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global XPathResult */
// end header

/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = {};
/**
 * Checks whether this class has been marked as unsupported and throws an 
 *  error if it has.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @param {String} className The name of the class.
 * @param {String} errorMessage Optional. A custom error message. Defaults to
 *  atropa.data[className].error
 */
atropa.supportCheck = function (className, errorMessage) {
    "use strict";
    className = String(className);
    errorMessage = errorMessage || atropa.data[className].error;
    errorMessage = String(errorMessage);
    
    if(atropa.data[className].support === 'unsupported') {
        throw new Error(errorMessage);
    }
};
/**
 * Pushes a requirement check into atropa.data.requirements. The test
 *  tests whether the class is supported in this environment. Sets
 *  atropa.data[className]'s support to unsupported and error to errorMessage
 *  if the requirementFn returns false. The requirement checks will all be run
 *  after the library has loaded.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @param {String} className The name of the class.
 * @param {Function} requirementFn A function to test whether or not the class
 *  is supported in this environment. If supported, returns true otherwise
 *  return false.
 * @param {String} errorMessage The error message to use when this class or its
 *  methods are called in unsupported environments. Defaults to:
 *  'The atropa.' + className + ' class is unsupported in this environment.';
 */
atropa.requires = function (className, requirementFn, errorMessage) {
    "use strict";
    var check = function () {
        var test = false;
        if(typeof className !== 'string') {
            throw new Error('atropa.requires requires the class name to be ' +
                'specified');
        }
        
        if(atropa.data[className] === undefined) {
            atropa.data[className] = {};
            
            if(typeof requirementFn !== 'function') {
                requirementFn = false;
            }
            errorMessage = errorMessage || 'The atropa.' + className +
                    ' class is unsupported in this environment.';
            try {
                test = requirementFn();
            } catch (e) {
                test = false;
            }
            
            atropa.data[className].error = errorMessage;
            
            if(test === false) {
                atropa.data[className].support = 'unsupported';
            }
        }
    };
    
    atropa.data.requirements.push(check);
};
/**
 * Container for gobal data related to the classes and functions.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for gobal data related to the classes and functions.
 */
atropa.data = {};

atropa.data.requirements = [];

atropa.nop = function nop () {
    "use strict";
    return null;
};
module.exports = atropa;


},{}],3:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

atropa.requires(
    'CookieMonster',
    function () {
        "use strict";
        var supported = true;
        
        [
            document.cookie
        ].forEach(function (prerequisite) {
            if(prerequisite === undefined) {
                supported = false;
            }
        });
        return supported;
    }
);

/**
 * This is a cookie handler.
 * @example
 * // cookie object
 * var cookieObj = {"key" : "cookieName", "val" : "cookieVal"}
 * // cookie string 
 * var cookieString = cookieName=cookieVal;
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130223
 * @class This represents a cookie handler
 * @returns {CookieMonster} A cookie handler.
 * @requires atropa.data
 */
atropa.CookieMonster = function CookieMonster() {
    'use strict';
    var currentCookies, getCookieCallback;
    
    /**
     * This holds the current cookie object array.
     * @private
     * @type Array
     * @fieldOf atropa.CookieMonster-
     */
    currentCookies = [];
    /**
     * Converts a cookie string into an object.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130223
     * @methodOf atropa.CookieMonster#
     * @param {String} cookie A cookie represented as a string
     * <code>cookieName=cookieVal;</code>
     * @returns {cookieObj} Returns a cookie object.
     * @example
     * var cookieMonster = new atropa.CookieMonster();
     * var cookieObj = cookieMonster.cookie2obj('atropa=hial atropa!!;');
     * console.log(cookieObj);
     */
    this.cookie2obj = function cookie2obj(cookie) {
        var cookieObj = {};
        if (!cookie) {
            return false;
        }
        cookieObj.key = cookie.substr(0, cookie.indexOf("=")).trim();
        cookieObj.val = cookie.substr(cookie.indexOf("=") + 1);
        if(cookieObj.val.substr(-1) === ';') {
            cookieObj.val = cookieObj.val.substr(0, cookieObj.val.length - 1);
        }
        return cookieObj;
    };
    /**
     * Converts a cookie object to a cookie string.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.CookieMonster#
     * @param {Object} cookieObj A cookie object
     * @returns {String} Returns a cookie string.
     * @example
     * var cookieMonster = new atropa.CookieMonster();
     * // creating a cookie
     * cookieMonster.setCookie('atropa', 'hial atropa!!');
     * console.log(document.cookie);
     * 
     * // getting a cookie object
     * var cookieObj = cookieMonster.getCookie('atropa');
     * console.log(cookieObj);
     * 
     * // convert the cookie object to a string
     * console.log(cookieMonster.bakeCookie(cookieObj));
     */
    this.bakeCookie = function bakeCookie(cookieObj) {
        var cookie = '', key, val;
        
        key = cookieObj.key;
        val = cookieObj.val;
        cookie = key + '=' + val + ';';
        return cookie;
    };
    /**
     * Filter cookies based on user specified callback.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130223
     * @methodOf atropa.CookieMonster#
     * @param {function} callback The callback function will be passed
     *  two arguments. The first is a cookie object from the current
     *  document. The second argument is the value supplied for
     *  <code>args</code> if the callback function returns <code>true</code>
     *  then the cookie object will be included in the return results.
     * @param {Array} args Arguments to pass to the callback
     * function.
     * @returns {Array} An array of cookie objects.
     * @example
     * var cookieMonster = new atropa.CookieMonster();
     * // creating a few cookies
     * cookieMonster.setCookie('atropa', 'hial atropa!!');
     * cookieMonster.setCookie('katjii', 'munching');
     * console.log(document.cookie);
     * 
     * // filter cookies
     * function cookieFilter(cookieObj, cookieValue) {
     *     if(cookieObj.val === cookieValue) {
     *         return true;
     *     } else {
     *         return false;
     *     }
     * }
     * var cookieObjArray = cookieMonster.inspectCookies(
     *     cookieFilter, 'munching');
     * console.log(cookieObjArray);
     */
    this.inspectCookies = function inspectCookies(callback, args) {
        var testCookie, cookies, jar = [];
        cookies = this.getCookies();
        while (cookies.length > 0) {
            testCookie = cookies.shift();
            if (callback(testCookie, args) === true) {
                jar.push(testCookie);
            }
        }
        return jar;
    };
    /**
     * Internal callback function used while getting the current
     * cookies.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130223
     * @private
     * @methodOf atropa.CookieMonster-
     * @param {cookieObj} testCookie A cookie object
     * @param {String} args argument used in comparison function
     * @returns {Boolean} If cookie key is exactly equal to the argument
     * then the callback returns true.
     */
    getCookieCallback = function getCookieCallback(testCookie, args) {
        var out;
        if (testCookie.key === args) {
            out = true;
        } else {
            out = false;
        }
        return out;
    };
    /**
     * Gets a user requested cookie.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130223
     * @methodOf atropa.CookieMonster#
     * @param {String} whichKey The cookies key (name)
     * @returns {cookieObj|false} Returns a cookie object if
     *  a cookie with the specified key is found or false if
     *  it is not found.
     * @example
     * var cookieMonster = new atropa.CookieMonster();
     * // creating a cookie
     * cookieMonster.setCookie('atropa', 'hial atropa!!');
     * console.log(document.cookie);
     * // get a specific cookie
     * var cookieObj = cookieMonster.getCookie('atropa');
     * console.log(cookieObj.key);
     * console.log(cookieObj.val);
     */
    this.getCookie = function getCookie(whichKey) {
        var result = this.inspectCookies(getCookieCallback, whichKey.trim());
        return result[0] || false;
    };
    /**
     * Get all cookies.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.CookieMonster#
     * @returns {Array} An array whose elements are cookie objects.
     * @example
     * var cookieMonster = new atropa.CookieMonster();
     * // creating a cookie
     * cookieMonster.setCookie('atropa', 'hial atropa!!');
     * // get all cookie objects in an array
     * console.log(cookieMonster.getCookies());
     */
    this.getCookies = function getCookies() {
        var n, l, cookieArray, cookieObj;
        currentCookies = [];
        cookieArray = document.cookie.split(";");
        for (n = 0, l = cookieArray.length; n < l; n++) {
            cookieObj = false;
            if (cookieArray[n]) {
                cookieObj = this.cookie2obj(cookieArray[n]);
                if (cookieObj) {
                    currentCookies.push(cookieObj);
                }
            }
        }
        return currentCookies;
    };
    /**
     * Removes a specified cookie by user submitted string.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130223
     * @methodOf atropa.CookieMonster#
     * @param {String} whichKey The cookies key (name) that
     * will be deleted.
     * @example
     * var cookieMonster = new atropa.CookieMonster();
     * // creating the cookie to delete
     * cookieMonster.setCookie('atropa', 'hial atropa!!');
     * console.log(document.cookie);
     * // delete a cookie
     * cookieMonster.deleteCookie('atropa');
     * console.log(document.cookie);
     */
    this.deleteCookie = function deleteCookie(whichKey) {
        var cookieObj = {};
        cookieObj.key = whichKey;
        cookieObj.val = ';expires=Thu, 2 Aug 2001 20:47:11 UTC';
        document.cookie = this.bakeCookie(cookieObj);
    };
    /**
     * Removes a specified cookie by user submitted cookieObj.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.CookieMonster#
     * @param {cookieObj} cookieObj A cookie object.
     * @example
     * var cookieMonster = new atropa.CookieMonster();
     * // creating the cookie to delete
     * cookieMonster.setCookie('atropa', 'hial atropa!!');
     * console.log(document.cookie);
     * // delete a cookie
     * cookieMonster.deleteCookieObj(
     *     {key : 'atropa', val : 'does not matter'});
     * console.log(document.cookie);
     */
    this.deleteCookieObj = function deleteCookieObj(cookieObj) {
        this.deleteCookie(cookieObj.key);
    };
    /**
     * Sets a cookie per user specifications as strings. The cookie
     * will expire when the browser is closed.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.CookieMonster#
     * @param {String} whichKey The key (name) of the new cookie
     * @param {String} setTo The value of the new cookie.
     * @example
     * var cookieMonster = new atropa.CookieMonster();
     * // set a cookie
     * cookieMonster.setCookie('atropa', 'hial');
     * console.log(document.cookie);
     */
    this.setCookie = function setCookie(whichKey, setTo) {
        var newCookie = {};
        newCookie.key = whichKey;
        newCookie.val = setTo;
        document.cookie = this.bakeCookie(newCookie);
    };
    /**
     * Sets a cookie per user specifications as an object.
     * The cookie will expire when the browser is closed.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.CookieMonster#
     * @param {cookieObj} cookieObj A cookie object.
     * @example
     * var cookieMonster = new atropa.CookieMonster();
     * // set a cookie
     * cookieMonster.setCookieObj({key : 'atropa', val : 'hial atropa!!'});
     * console.log(document.cookie);
     */
    this.setCookieObj = function setCookieObj(cookieObj) {
        return this.setCookie(cookieObj.key, cookieObj.val);
    };
    
    atropa.supportCheck('CookieMonster');
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":2}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGthc3RvclxcRG9jdW1lbnRzXFxHaXRIdWJcXGF0cm9wYS1Db29raWVNb25zdGVyXFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvR2l0SHViL2F0cm9wYS1Db29raWVNb25zdGVyL2Rldi9icm93c2VyTWFpbi5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvR2l0SHViL2F0cm9wYS1Db29raWVNb25zdGVyL25vZGVfbW9kdWxlcy9hdHJvcGEtaGVhZGVyL3NyYy9hdHJvcGEtaGVhZGVyLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9HaXRIdWIvYXRyb3BhLUNvb2tpZU1vbnN0ZXIvc3JjL2F0cm9wYS1Db29raWVNb25zdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQ29va2llTW9uc3RlciA9IHJlcXVpcmUoJy4uL3NyYy9hdHJvcGEtQ29va2llTW9uc3Rlci5qcycpO1xyXG5cclxudHJ5IHtcclxuICAgIE9iamVjdC5rZXlzKENvb2tpZU1vbnN0ZXIpLmZvckVhY2goXHJcbiAgICAgICAgZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICAgICAgaWYoIWF0cm9wYVtwcm9wXSkge1xyXG4gICAgICAgICAgICAgICAgYXRyb3BhW3Byb3BdID0gQ29va2llTW9uc3Rlcltwcm9wXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICk7XHJcbn0gY2F0Y2ggKGlnbm9yZSkge1xyXG4gICAgYXRyb3BhID0gcmVxdWlyZSgnLi4vc3JjL2F0cm9wYS1Db29raWVNb25zdGVyLmpzJyk7XHJcbn1cclxuXHJcbk9iamVjdC5rZXlzKENvb2tpZU1vbnN0ZXIuZGF0YSkuZmlsdGVyKFxyXG4gICAgZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICByZXR1cm4gcHJvcCAhPT0gJ3JlcXVpcmVtZW50cyc7XHJcbiAgICB9XHJcbikuZm9yRWFjaChcclxuICAgIGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgYXRyb3BhLmRhdGFbcHJvcF0gPSBDb29raWVNb25zdGVyLmRhdGFbcHJvcF07XHJcbiAgICB9XHJcbik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgWFBhdGhSZXN1bHQgKi9cbi8vIGVuZCBoZWFkZXJcblxuLyoqXG4gKiBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxuICovXG52YXIgYXRyb3BhID0ge307XG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoaXMgY2xhc3MgaGFzIGJlZW4gbWFya2VkIGFzIHVuc3VwcG9ydGVkIGFuZCB0aHJvd3MgYW4gXG4gKiAgZXJyb3IgaWYgaXQgaGFzLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMzA4XG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lIFRoZSBuYW1lIG9mIHRoZSBjbGFzcy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBlcnJvck1lc3NhZ2UgT3B0aW9uYWwuIEEgY3VzdG9tIGVycm9yIG1lc3NhZ2UuIERlZmF1bHRzIHRvXG4gKiAgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5lcnJvclxuICovXG5hdHJvcGEuc3VwcG9ydENoZWNrID0gZnVuY3Rpb24gKGNsYXNzTmFtZSwgZXJyb3JNZXNzYWdlKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgY2xhc3NOYW1lID0gU3RyaW5nKGNsYXNzTmFtZSk7XG4gICAgZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlIHx8IGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uZXJyb3I7XG4gICAgZXJyb3JNZXNzYWdlID0gU3RyaW5nKGVycm9yTWVzc2FnZSk7XG4gICAgXG4gICAgaWYoYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5zdXBwb3J0ID09PSAndW5zdXBwb3J0ZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgIH1cbn07XG4vKipcbiAqIFB1c2hlcyBhIHJlcXVpcmVtZW50IGNoZWNrIGludG8gYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLiBUaGUgdGVzdFxuICogIHRlc3RzIHdoZXRoZXIgdGhlIGNsYXNzIGlzIHN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50LiBTZXRzXG4gKiAgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXSdzIHN1cHBvcnQgdG8gdW5zdXBwb3J0ZWQgYW5kIGVycm9yIHRvIGVycm9yTWVzc2FnZVxuICogIGlmIHRoZSByZXF1aXJlbWVudEZuIHJldHVybnMgZmFsc2UuIFRoZSByZXF1aXJlbWVudCBjaGVja3Mgd2lsbCBhbGwgYmUgcnVuXG4gKiAgYWZ0ZXIgdGhlIGxpYnJhcnkgaGFzIGxvYWRlZC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDMwOFxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZSBUaGUgbmFtZSBvZiB0aGUgY2xhc3MuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXF1aXJlbWVudEZuIEEgZnVuY3Rpb24gdG8gdGVzdCB3aGV0aGVyIG9yIG5vdCB0aGUgY2xhc3NcbiAqICBpcyBzdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4gSWYgc3VwcG9ydGVkLCByZXR1cm5zIHRydWUgb3RoZXJ3aXNlXG4gKiAgcmV0dXJuIGZhbHNlLlxuICogQHBhcmFtIHtTdHJpbmd9IGVycm9yTWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZSB0byB1c2Ugd2hlbiB0aGlzIGNsYXNzIG9yIGl0c1xuICogIG1ldGhvZHMgYXJlIGNhbGxlZCBpbiB1bnN1cHBvcnRlZCBlbnZpcm9ubWVudHMuIERlZmF1bHRzIHRvOlxuICogICdUaGUgYXRyb3BhLicgKyBjbGFzc05hbWUgKyAnIGNsYXNzIGlzIHVuc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuJztcbiAqL1xuYXRyb3BhLnJlcXVpcmVzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSwgcmVxdWlyZW1lbnRGbiwgZXJyb3JNZXNzYWdlKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIGNoZWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdGVzdCA9IGZhbHNlO1xuICAgICAgICBpZih0eXBlb2YgY2xhc3NOYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhdHJvcGEucmVxdWlyZXMgcmVxdWlyZXMgdGhlIGNsYXNzIG5hbWUgdG8gYmUgJyArXG4gICAgICAgICAgICAgICAgJ3NwZWNpZmllZCcpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZihhdHJvcGEuZGF0YVtjbGFzc05hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0gPSB7fTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYodHlwZW9mIHJlcXVpcmVtZW50Rm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICByZXF1aXJlbWVudEZuID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2UgfHwgJ1RoZSBhdHJvcGEuJyArIGNsYXNzTmFtZSArXG4gICAgICAgICAgICAgICAgICAgICcgY2xhc3MgaXMgdW5zdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4nO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0ZXN0ID0gcmVxdWlyZW1lbnRGbigpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRlc3QgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5lcnJvciA9IGVycm9yTWVzc2FnZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYodGVzdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLnN1cHBvcnQgPSAndW5zdXBwb3J0ZWQnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucHVzaChjaGVjayk7XG59O1xuLyoqXG4gKiBDb250YWluZXIgZm9yIGdvYmFsIGRhdGEgcmVsYXRlZCB0byB0aGUgY2xhc3NlcyBhbmQgZnVuY3Rpb25zLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBnb2JhbCBkYXRhIHJlbGF0ZWQgdG8gdGhlIGNsYXNzZXMgYW5kIGZ1bmN0aW9ucy5cbiAqL1xuYXRyb3BhLmRhdGEgPSB7fTtcblxuYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzID0gW107XG5cbmF0cm9wYS5ub3AgPSBmdW5jdGlvbiBub3AgKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHJldHVybiBudWxsO1xufTtcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbmF0cm9wYS5yZXF1aXJlcyhcclxuICAgICdDb29raWVNb25zdGVyJyxcclxuICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICB2YXIgc3VwcG9ydGVkID0gdHJ1ZTtcclxuICAgICAgICBcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZVxyXG4gICAgICAgIF0uZm9yRWFjaChmdW5jdGlvbiAocHJlcmVxdWlzaXRlKSB7XHJcbiAgICAgICAgICAgIGlmKHByZXJlcXVpc2l0ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XHJcbiAgICB9XHJcbik7XHJcblxyXG4vKipcclxuICogVGhpcyBpcyBhIGNvb2tpZSBoYW5kbGVyLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBjb29raWUgb2JqZWN0XHJcbiAqIHZhciBjb29raWVPYmogPSB7XCJrZXlcIiA6IFwiY29va2llTmFtZVwiLCBcInZhbFwiIDogXCJjb29raWVWYWxcIn1cclxuICogLy8gY29va2llIHN0cmluZyBcclxuICogdmFyIGNvb2tpZVN0cmluZyA9IGNvb2tpZU5hbWU9Y29va2llVmFsO1xyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAyMjNcclxuICogQGNsYXNzIFRoaXMgcmVwcmVzZW50cyBhIGNvb2tpZSBoYW5kbGVyXHJcbiAqIEByZXR1cm5zIHtDb29raWVNb25zdGVyfSBBIGNvb2tpZSBoYW5kbGVyLlxyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLmRhdGFcclxuICovXHJcbmF0cm9wYS5Db29raWVNb25zdGVyID0gZnVuY3Rpb24gQ29va2llTW9uc3RlcigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHZhciBjdXJyZW50Q29va2llcywgZ2V0Q29va2llQ2FsbGJhY2s7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBob2xkcyB0aGUgY3VycmVudCBjb29raWUgb2JqZWN0IGFycmF5LlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIEFycmF5XHJcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuQ29va2llTW9uc3Rlci1cclxuICAgICAqL1xyXG4gICAgY3VycmVudENvb2tpZXMgPSBbXTtcclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgYSBjb29raWUgc3RyaW5nIGludG8gYW4gb2JqZWN0LlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMjIzXHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXIjXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY29va2llIEEgY29va2llIHJlcHJlc2VudGVkIGFzIGEgc3RyaW5nXHJcbiAgICAgKiA8Y29kZT5jb29raWVOYW1lPWNvb2tpZVZhbDs8L2NvZGU+XHJcbiAgICAgKiBAcmV0dXJucyB7Y29va2llT2JqfSBSZXR1cm5zIGEgY29va2llIG9iamVjdC5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgY29va2llTW9uc3RlciA9IG5ldyBhdHJvcGEuQ29va2llTW9uc3RlcigpO1xyXG4gICAgICogdmFyIGNvb2tpZU9iaiA9IGNvb2tpZU1vbnN0ZXIuY29va2llMm9iaignYXRyb3BhPWhpYWwgYXRyb3BhISE7Jyk7XHJcbiAgICAgKiBjb25zb2xlLmxvZyhjb29raWVPYmopO1xyXG4gICAgICovXHJcbiAgICB0aGlzLmNvb2tpZTJvYmogPSBmdW5jdGlvbiBjb29raWUyb2JqKGNvb2tpZSkge1xyXG4gICAgICAgIHZhciBjb29raWVPYmogPSB7fTtcclxuICAgICAgICBpZiAoIWNvb2tpZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvb2tpZU9iai5rZXkgPSBjb29raWUuc3Vic3RyKDAsIGNvb2tpZS5pbmRleE9mKFwiPVwiKSkudHJpbSgpO1xyXG4gICAgICAgIGNvb2tpZU9iai52YWwgPSBjb29raWUuc3Vic3RyKGNvb2tpZS5pbmRleE9mKFwiPVwiKSArIDEpO1xyXG4gICAgICAgIGlmKGNvb2tpZU9iai52YWwuc3Vic3RyKC0xKSA9PT0gJzsnKSB7XHJcbiAgICAgICAgICAgIGNvb2tpZU9iai52YWwgPSBjb29raWVPYmoudmFsLnN1YnN0cigwLCBjb29raWVPYmoudmFsLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29va2llT2JqO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgYSBjb29raWUgb2JqZWN0IHRvIGEgY29va2llIHN0cmluZy5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5Db29raWVNb25zdGVyI1xyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvb2tpZU9iaiBBIGNvb2tpZSBvYmplY3RcclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgYSBjb29raWUgc3RyaW5nLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBjb29raWVNb25zdGVyID0gbmV3IGF0cm9wYS5Db29raWVNb25zdGVyKCk7XHJcbiAgICAgKiAvLyBjcmVhdGluZyBhIGNvb2tpZVxyXG4gICAgICogY29va2llTW9uc3Rlci5zZXRDb29raWUoJ2F0cm9wYScsICdoaWFsIGF0cm9wYSEhJyk7XHJcbiAgICAgKiBjb25zb2xlLmxvZyhkb2N1bWVudC5jb29raWUpO1xyXG4gICAgICogXHJcbiAgICAgKiAvLyBnZXR0aW5nIGEgY29va2llIG9iamVjdFxyXG4gICAgICogdmFyIGNvb2tpZU9iaiA9IGNvb2tpZU1vbnN0ZXIuZ2V0Q29va2llKCdhdHJvcGEnKTtcclxuICAgICAqIGNvbnNvbGUubG9nKGNvb2tpZU9iaik7XHJcbiAgICAgKiBcclxuICAgICAqIC8vIGNvbnZlcnQgdGhlIGNvb2tpZSBvYmplY3QgdG8gYSBzdHJpbmdcclxuICAgICAqIGNvbnNvbGUubG9nKGNvb2tpZU1vbnN0ZXIuYmFrZUNvb2tpZShjb29raWVPYmopKTtcclxuICAgICAqL1xyXG4gICAgdGhpcy5iYWtlQ29va2llID0gZnVuY3Rpb24gYmFrZUNvb2tpZShjb29raWVPYmopIHtcclxuICAgICAgICB2YXIgY29va2llID0gJycsIGtleSwgdmFsO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGtleSA9IGNvb2tpZU9iai5rZXk7XHJcbiAgICAgICAgdmFsID0gY29va2llT2JqLnZhbDtcclxuICAgICAgICBjb29raWUgPSBrZXkgKyAnPScgKyB2YWwgKyAnOyc7XHJcbiAgICAgICAgcmV0dXJuIGNvb2tpZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEZpbHRlciBjb29raWVzIGJhc2VkIG9uIHVzZXIgc3BlY2lmaWVkIGNhbGxiYWNrLlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMjIzXHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXIjXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gd2lsbCBiZSBwYXNzZWRcclxuICAgICAqICB0d28gYXJndW1lbnRzLiBUaGUgZmlyc3QgaXMgYSBjb29raWUgb2JqZWN0IGZyb20gdGhlIGN1cnJlbnRcclxuICAgICAqICBkb2N1bWVudC4gVGhlIHNlY29uZCBhcmd1bWVudCBpcyB0aGUgdmFsdWUgc3VwcGxpZWQgZm9yXHJcbiAgICAgKiAgPGNvZGU+YXJnczwvY29kZT4gaWYgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHJldHVybnMgPGNvZGU+dHJ1ZTwvY29kZT5cclxuICAgICAqICB0aGVuIHRoZSBjb29raWUgb2JqZWN0IHdpbGwgYmUgaW5jbHVkZWQgaW4gdGhlIHJldHVybiByZXN1bHRzLlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJncyBBcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgY2FsbGJhY2tcclxuICAgICAqIGZ1bmN0aW9uLlxyXG4gICAgICogQHJldHVybnMge0FycmF5fSBBbiBhcnJheSBvZiBjb29raWUgb2JqZWN0cy5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgY29va2llTW9uc3RlciA9IG5ldyBhdHJvcGEuQ29va2llTW9uc3RlcigpO1xyXG4gICAgICogLy8gY3JlYXRpbmcgYSBmZXcgY29va2llc1xyXG4gICAgICogY29va2llTW9uc3Rlci5zZXRDb29raWUoJ2F0cm9wYScsICdoaWFsIGF0cm9wYSEhJyk7XHJcbiAgICAgKiBjb29raWVNb25zdGVyLnNldENvb2tpZSgna2F0amlpJywgJ211bmNoaW5nJyk7XHJcbiAgICAgKiBjb25zb2xlLmxvZyhkb2N1bWVudC5jb29raWUpO1xyXG4gICAgICogXHJcbiAgICAgKiAvLyBmaWx0ZXIgY29va2llc1xyXG4gICAgICogZnVuY3Rpb24gY29va2llRmlsdGVyKGNvb2tpZU9iaiwgY29va2llVmFsdWUpIHtcclxuICAgICAqICAgICBpZihjb29raWVPYmoudmFsID09PSBjb29raWVWYWx1ZSkge1xyXG4gICAgICogICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAqICAgICB9IGVsc2Uge1xyXG4gICAgICogICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgKiAgICAgfVxyXG4gICAgICogfVxyXG4gICAgICogdmFyIGNvb2tpZU9iakFycmF5ID0gY29va2llTW9uc3Rlci5pbnNwZWN0Q29va2llcyhcclxuICAgICAqICAgICBjb29raWVGaWx0ZXIsICdtdW5jaGluZycpO1xyXG4gICAgICogY29uc29sZS5sb2coY29va2llT2JqQXJyYXkpO1xyXG4gICAgICovXHJcbiAgICB0aGlzLmluc3BlY3RDb29raWVzID0gZnVuY3Rpb24gaW5zcGVjdENvb2tpZXMoY2FsbGJhY2ssIGFyZ3MpIHtcclxuICAgICAgICB2YXIgdGVzdENvb2tpZSwgY29va2llcywgamFyID0gW107XHJcbiAgICAgICAgY29va2llcyA9IHRoaXMuZ2V0Q29va2llcygpO1xyXG4gICAgICAgIHdoaWxlIChjb29raWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGVzdENvb2tpZSA9IGNvb2tpZXMuc2hpZnQoKTtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKHRlc3RDb29raWUsIGFyZ3MpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBqYXIucHVzaCh0ZXN0Q29va2llKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gamFyO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSW50ZXJuYWwgY2FsbGJhY2sgZnVuY3Rpb24gdXNlZCB3aGlsZSBnZXR0aW5nIHRoZSBjdXJyZW50XHJcbiAgICAgKiBjb29raWVzLlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMjIzXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5Db29raWVNb25zdGVyLVxyXG4gICAgICogQHBhcmFtIHtjb29raWVPYmp9IHRlc3RDb29raWUgQSBjb29raWUgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYXJncyBhcmd1bWVudCB1c2VkIGluIGNvbXBhcmlzb24gZnVuY3Rpb25cclxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSBJZiBjb29raWUga2V5IGlzIGV4YWN0bHkgZXF1YWwgdG8gdGhlIGFyZ3VtZW50XHJcbiAgICAgKiB0aGVuIHRoZSBjYWxsYmFjayByZXR1cm5zIHRydWUuXHJcbiAgICAgKi9cclxuICAgIGdldENvb2tpZUNhbGxiYWNrID0gZnVuY3Rpb24gZ2V0Q29va2llQ2FsbGJhY2sodGVzdENvb2tpZSwgYXJncykge1xyXG4gICAgICAgIHZhciBvdXQ7XHJcbiAgICAgICAgaWYgKHRlc3RDb29raWUua2V5ID09PSBhcmdzKSB7XHJcbiAgICAgICAgICAgIG91dCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGEgdXNlciByZXF1ZXN0ZWQgY29va2llLlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMjIzXHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXIjXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gd2hpY2hLZXkgVGhlIGNvb2tpZXMga2V5IChuYW1lKVxyXG4gICAgICogQHJldHVybnMge2Nvb2tpZU9ianxmYWxzZX0gUmV0dXJucyBhIGNvb2tpZSBvYmplY3QgaWZcclxuICAgICAqICBhIGNvb2tpZSB3aXRoIHRoZSBzcGVjaWZpZWQga2V5IGlzIGZvdW5kIG9yIGZhbHNlIGlmXHJcbiAgICAgKiAgaXQgaXMgbm90IGZvdW5kLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBjb29raWVNb25zdGVyID0gbmV3IGF0cm9wYS5Db29raWVNb25zdGVyKCk7XHJcbiAgICAgKiAvLyBjcmVhdGluZyBhIGNvb2tpZVxyXG4gICAgICogY29va2llTW9uc3Rlci5zZXRDb29raWUoJ2F0cm9wYScsICdoaWFsIGF0cm9wYSEhJyk7XHJcbiAgICAgKiBjb25zb2xlLmxvZyhkb2N1bWVudC5jb29raWUpO1xyXG4gICAgICogLy8gZ2V0IGEgc3BlY2lmaWMgY29va2llXHJcbiAgICAgKiB2YXIgY29va2llT2JqID0gY29va2llTW9uc3Rlci5nZXRDb29raWUoJ2F0cm9wYScpO1xyXG4gICAgICogY29uc29sZS5sb2coY29va2llT2JqLmtleSk7XHJcbiAgICAgKiBjb25zb2xlLmxvZyhjb29raWVPYmoudmFsKTtcclxuICAgICAqL1xyXG4gICAgdGhpcy5nZXRDb29raWUgPSBmdW5jdGlvbiBnZXRDb29raWUod2hpY2hLZXkpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5pbnNwZWN0Q29va2llcyhnZXRDb29raWVDYWxsYmFjaywgd2hpY2hLZXkudHJpbSgpKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0WzBdIHx8IGZhbHNlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogR2V0IGFsbCBjb29raWVzLlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXIjXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IEFuIGFycmF5IHdob3NlIGVsZW1lbnRzIGFyZSBjb29raWUgb2JqZWN0cy5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgY29va2llTW9uc3RlciA9IG5ldyBhdHJvcGEuQ29va2llTW9uc3RlcigpO1xyXG4gICAgICogLy8gY3JlYXRpbmcgYSBjb29raWVcclxuICAgICAqIGNvb2tpZU1vbnN0ZXIuc2V0Q29va2llKCdhdHJvcGEnLCAnaGlhbCBhdHJvcGEhIScpO1xyXG4gICAgICogLy8gZ2V0IGFsbCBjb29raWUgb2JqZWN0cyBpbiBhbiBhcnJheVxyXG4gICAgICogY29uc29sZS5sb2coY29va2llTW9uc3Rlci5nZXRDb29raWVzKCkpO1xyXG4gICAgICovXHJcbiAgICB0aGlzLmdldENvb2tpZXMgPSBmdW5jdGlvbiBnZXRDb29raWVzKCkge1xyXG4gICAgICAgIHZhciBuLCBsLCBjb29raWVBcnJheSwgY29va2llT2JqO1xyXG4gICAgICAgIGN1cnJlbnRDb29raWVzID0gW107XHJcbiAgICAgICAgY29va2llQXJyYXkgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7XCIpO1xyXG4gICAgICAgIGZvciAobiA9IDAsIGwgPSBjb29raWVBcnJheS5sZW5ndGg7IG4gPCBsOyBuKyspIHtcclxuICAgICAgICAgICAgY29va2llT2JqID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChjb29raWVBcnJheVtuXSkge1xyXG4gICAgICAgICAgICAgICAgY29va2llT2JqID0gdGhpcy5jb29raWUyb2JqKGNvb2tpZUFycmF5W25dKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb29raWVPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29va2llcy5wdXNoKGNvb2tpZU9iaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDb29raWVzO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhIHNwZWNpZmllZCBjb29raWUgYnkgdXNlciBzdWJtaXR0ZWQgc3RyaW5nLlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMjIzXHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXIjXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gd2hpY2hLZXkgVGhlIGNvb2tpZXMga2V5IChuYW1lKSB0aGF0XHJcbiAgICAgKiB3aWxsIGJlIGRlbGV0ZWQuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGNvb2tpZU1vbnN0ZXIgPSBuZXcgYXRyb3BhLkNvb2tpZU1vbnN0ZXIoKTtcclxuICAgICAqIC8vIGNyZWF0aW5nIHRoZSBjb29raWUgdG8gZGVsZXRlXHJcbiAgICAgKiBjb29raWVNb25zdGVyLnNldENvb2tpZSgnYXRyb3BhJywgJ2hpYWwgYXRyb3BhISEnKTtcclxuICAgICAqIGNvbnNvbGUubG9nKGRvY3VtZW50LmNvb2tpZSk7XHJcbiAgICAgKiAvLyBkZWxldGUgYSBjb29raWVcclxuICAgICAqIGNvb2tpZU1vbnN0ZXIuZGVsZXRlQ29va2llKCdhdHJvcGEnKTtcclxuICAgICAqIGNvbnNvbGUubG9nKGRvY3VtZW50LmNvb2tpZSk7XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZGVsZXRlQ29va2llID0gZnVuY3Rpb24gZGVsZXRlQ29va2llKHdoaWNoS2V5KSB7XHJcbiAgICAgICAgdmFyIGNvb2tpZU9iaiA9IHt9O1xyXG4gICAgICAgIGNvb2tpZU9iai5rZXkgPSB3aGljaEtleTtcclxuICAgICAgICBjb29raWVPYmoudmFsID0gJztleHBpcmVzPVRodSwgMiBBdWcgMjAwMSAyMDo0NzoxMSBVVEMnO1xyXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IHRoaXMuYmFrZUNvb2tpZShjb29raWVPYmopO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhIHNwZWNpZmllZCBjb29raWUgYnkgdXNlciBzdWJtaXR0ZWQgY29va2llT2JqLlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXIjXHJcbiAgICAgKiBAcGFyYW0ge2Nvb2tpZU9ian0gY29va2llT2JqIEEgY29va2llIG9iamVjdC5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgY29va2llTW9uc3RlciA9IG5ldyBhdHJvcGEuQ29va2llTW9uc3RlcigpO1xyXG4gICAgICogLy8gY3JlYXRpbmcgdGhlIGNvb2tpZSB0byBkZWxldGVcclxuICAgICAqIGNvb2tpZU1vbnN0ZXIuc2V0Q29va2llKCdhdHJvcGEnLCAnaGlhbCBhdHJvcGEhIScpO1xyXG4gICAgICogY29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKTtcclxuICAgICAqIC8vIGRlbGV0ZSBhIGNvb2tpZVxyXG4gICAgICogY29va2llTW9uc3Rlci5kZWxldGVDb29raWVPYmooXHJcbiAgICAgKiAgICAge2tleSA6ICdhdHJvcGEnLCB2YWwgOiAnZG9lcyBub3QgbWF0dGVyJ30pO1xyXG4gICAgICogY29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKTtcclxuICAgICAqL1xyXG4gICAgdGhpcy5kZWxldGVDb29raWVPYmogPSBmdW5jdGlvbiBkZWxldGVDb29raWVPYmooY29va2llT2JqKSB7XHJcbiAgICAgICAgdGhpcy5kZWxldGVDb29raWUoY29va2llT2JqLmtleSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGEgY29va2llIHBlciB1c2VyIHNwZWNpZmljYXRpb25zIGFzIHN0cmluZ3MuIFRoZSBjb29raWVcclxuICAgICAqIHdpbGwgZXhwaXJlIHdoZW4gdGhlIGJyb3dzZXIgaXMgY2xvc2VkLlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXIjXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gd2hpY2hLZXkgVGhlIGtleSAobmFtZSkgb2YgdGhlIG5ldyBjb29raWVcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzZXRUbyBUaGUgdmFsdWUgb2YgdGhlIG5ldyBjb29raWUuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGNvb2tpZU1vbnN0ZXIgPSBuZXcgYXRyb3BhLkNvb2tpZU1vbnN0ZXIoKTtcclxuICAgICAqIC8vIHNldCBhIGNvb2tpZVxyXG4gICAgICogY29va2llTW9uc3Rlci5zZXRDb29raWUoJ2F0cm9wYScsICdoaWFsJyk7XHJcbiAgICAgKiBjb25zb2xlLmxvZyhkb2N1bWVudC5jb29raWUpO1xyXG4gICAgICovXHJcbiAgICB0aGlzLnNldENvb2tpZSA9IGZ1bmN0aW9uIHNldENvb2tpZSh3aGljaEtleSwgc2V0VG8pIHtcclxuICAgICAgICB2YXIgbmV3Q29va2llID0ge307XHJcbiAgICAgICAgbmV3Q29va2llLmtleSA9IHdoaWNoS2V5O1xyXG4gICAgICAgIG5ld0Nvb2tpZS52YWwgPSBzZXRUbztcclxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSB0aGlzLmJha2VDb29raWUobmV3Q29va2llKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgYSBjb29raWUgcGVyIHVzZXIgc3BlY2lmaWNhdGlvbnMgYXMgYW4gb2JqZWN0LlxyXG4gICAgICogVGhlIGNvb2tpZSB3aWxsIGV4cGlyZSB3aGVuIHRoZSBicm93c2VyIGlzIGNsb3NlZC5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5Db29raWVNb25zdGVyI1xyXG4gICAgICogQHBhcmFtIHtjb29raWVPYmp9IGNvb2tpZU9iaiBBIGNvb2tpZSBvYmplY3QuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGNvb2tpZU1vbnN0ZXIgPSBuZXcgYXRyb3BhLkNvb2tpZU1vbnN0ZXIoKTtcclxuICAgICAqIC8vIHNldCBhIGNvb2tpZVxyXG4gICAgICogY29va2llTW9uc3Rlci5zZXRDb29raWVPYmooe2tleSA6ICdhdHJvcGEnLCB2YWwgOiAnaGlhbCBhdHJvcGEhISd9KTtcclxuICAgICAqIGNvbnNvbGUubG9nKGRvY3VtZW50LmNvb2tpZSk7XHJcbiAgICAgKi9cclxuICAgIHRoaXMuc2V0Q29va2llT2JqID0gZnVuY3Rpb24gc2V0Q29va2llT2JqKGNvb2tpZU9iaikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNldENvb2tpZShjb29raWVPYmoua2V5LCBjb29raWVPYmoudmFsKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ0Nvb2tpZU1vbnN0ZXInKTtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIl19
