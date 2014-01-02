;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"../src/atropa-CookieMonster.js":2}],2:[function(require,module,exports){
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
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
     * Deletes a specified cookie by user submitted string.
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
     * Deletes a specified cookie by user submitted cookieObj.
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

},{"atropa-header":3}],3:[function(require,module,exports){
var atropa = {};

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
var atropa;
atropa = {};
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


},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGthc3RvclxcRGVza3RvcFxcZXhwZXJpbWVudHNcXGF0cm9wYS1jb21wb25lbnRzXFxub2RlX21vZHVsZXNcXGF0cm9wYS1Db29raWVNb25zdGVyXFxkZXZcXGJyb3dzZXJNYWluLmpzIiwiQzpcXFVzZXJzXFxrYXN0b3JcXERlc2t0b3BcXGV4cGVyaW1lbnRzXFxhdHJvcGEtY29tcG9uZW50c1xcbm9kZV9tb2R1bGVzXFxhdHJvcGEtQ29va2llTW9uc3Rlclxcc3JjXFxhdHJvcGEtQ29va2llTW9uc3Rlci5qcyIsIkM6XFxVc2Vyc1xca2FzdG9yXFxEZXNrdG9wXFxleHBlcmltZW50c1xcYXRyb3BhLWNvbXBvbmVudHNcXG5vZGVfbW9kdWxlc1xcYXRyb3BhLWhlYWRlclxcc3JjXFxhdHJvcGEtaGVhZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQ29va2llTW9uc3RlciA9IHJlcXVpcmUoJy4uL3NyYy9hdHJvcGEtQ29va2llTW9uc3Rlci5qcycpO1xyXG5cclxudHJ5IHtcclxuICAgIE9iamVjdC5rZXlzKENvb2tpZU1vbnN0ZXIpLmZvckVhY2goXHJcbiAgICAgICAgZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICAgICAgaWYoIWF0cm9wYVtwcm9wXSkge1xyXG4gICAgICAgICAgICAgICAgYXRyb3BhW3Byb3BdID0gQ29va2llTW9uc3Rlcltwcm9wXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICk7XHJcbn0gY2F0Y2ggKGlnbm9yZSkge1xyXG4gICAgYXRyb3BhID0gcmVxdWlyZSgnLi4vc3JjL2F0cm9wYS1Db29raWVNb25zdGVyLmpzJyk7XHJcbn1cclxuXHJcbk9iamVjdC5rZXlzKENvb2tpZU1vbnN0ZXIuZGF0YSkuZmlsdGVyKFxyXG4gICAgZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICByZXR1cm4gcHJvcCAhPT0gJ3JlcXVpcmVtZW50cyc7XHJcbiAgICB9XHJcbikuZm9yRWFjaChcclxuICAgIGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgYXRyb3BhLmRhdGFbcHJvcF0gPSBDb29raWVNb25zdGVyLmRhdGFbcHJvcF07XHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqL1xyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbmF0cm9wYS5yZXF1aXJlcyhcclxuICAgICdDb29raWVNb25zdGVyJyxcclxuICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICB2YXIgc3VwcG9ydGVkID0gdHJ1ZTtcclxuICAgICAgICBcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZVxyXG4gICAgICAgIF0uZm9yRWFjaChmdW5jdGlvbiAocHJlcmVxdWlzaXRlKSB7XHJcbiAgICAgICAgICAgIGlmKHByZXJlcXVpc2l0ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XHJcbiAgICB9XHJcbik7XHJcblxyXG4vKipcclxuICogVGhpcyBpcyBhIGNvb2tpZSBoYW5kbGVyLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBjb29raWUgb2JqZWN0XHJcbiAqIHZhciBjb29raWVPYmogPSB7XCJrZXlcIiA6IFwiY29va2llTmFtZVwiLCBcInZhbFwiIDogXCJjb29raWVWYWxcIn1cclxuICogLy8gY29va2llIHN0cmluZyBcclxuICogdmFyIGNvb2tpZVN0cmluZyA9IGNvb2tpZU5hbWU9Y29va2llVmFsO1xyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAyMjNcclxuICogQGNsYXNzIFRoaXMgcmVwcmVzZW50cyBhIGNvb2tpZSBoYW5kbGVyXHJcbiAqIEByZXR1cm5zIHtDb29raWVNb25zdGVyfSBBIGNvb2tpZSBoYW5kbGVyLlxyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLmRhdGFcclxuICogQHNlZSA8YSBocmVmPVwiLi4vLi4vLi4vQXRyb3BhVG9vbGJveFRlc3RzLmh0bWw/c3BlYz1hdHJvcGEuQ29va2llTW9uc3RlclwiPnRlc3RzPC9hPlxyXG4gKi9cclxuYXRyb3BhLkNvb2tpZU1vbnN0ZXIgPSBmdW5jdGlvbiBDb29raWVNb25zdGVyKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgdmFyIGN1cnJlbnRDb29raWVzLCBnZXRDb29raWVDYWxsYmFjaztcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGhvbGRzIHRoZSBjdXJyZW50IGNvb2tpZSBvYmplY3QgYXJyYXkuXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgQXJyYXlcclxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5Db29raWVNb25zdGVyLVxyXG4gICAgICovXHJcbiAgICBjdXJyZW50Q29va2llcyA9IFtdO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhIGNvb2tpZSBzdHJpbmcgaW50byBhbiBvYmplY3QuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMzAyMjNcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjb29raWUgQSBjb29raWUgcmVwcmVzZW50ZWQgYXMgYSBzdHJpbmdcclxuICAgICAqIDxjb2RlPmNvb2tpZU5hbWU9Y29va2llVmFsOzwvY29kZT5cclxuICAgICAqIEByZXR1cm5zIHtjb29raWVPYmp9IFJldHVybnMgYSBjb29raWUgb2JqZWN0LlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBjb29raWVNb25zdGVyID0gbmV3IGF0cm9wYS5Db29raWVNb25zdGVyKCk7XHJcbiAgICAgKiB2YXIgY29va2llT2JqID0gY29va2llTW9uc3Rlci5jb29raWUyb2JqKCdhdHJvcGE9aGlhbCBhdHJvcGEhITsnKTtcclxuICAgICAqIGNvbnNvbGUubG9nKGNvb2tpZU9iaik7XHJcbiAgICAgKi9cclxuICAgIHRoaXMuY29va2llMm9iaiA9IGZ1bmN0aW9uIGNvb2tpZTJvYmooY29va2llKSB7XHJcbiAgICAgICAgdmFyIGNvb2tpZU9iaiA9IHt9O1xyXG4gICAgICAgIGlmICghY29va2llKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29va2llT2JqLmtleSA9IGNvb2tpZS5zdWJzdHIoMCwgY29va2llLmluZGV4T2YoXCI9XCIpKS50cmltKCk7XHJcbiAgICAgICAgY29va2llT2JqLnZhbCA9IGNvb2tpZS5zdWJzdHIoY29va2llLmluZGV4T2YoXCI9XCIpICsgMSk7XHJcbiAgICAgICAgaWYoY29va2llT2JqLnZhbC5zdWJzdHIoLTEpID09PSAnOycpIHtcclxuICAgICAgICAgICAgY29va2llT2JqLnZhbCA9IGNvb2tpZU9iai52YWwuc3Vic3RyKDAsIGNvb2tpZU9iai52YWwubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb29raWVPYmo7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhIGNvb2tpZSBvYmplY3QgdG8gYSBjb29raWUgc3RyaW5nLlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXIjXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29va2llT2JqIEEgY29va2llIG9iamVjdFxyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyBhIGNvb2tpZSBzdHJpbmcuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGNvb2tpZU1vbnN0ZXIgPSBuZXcgYXRyb3BhLkNvb2tpZU1vbnN0ZXIoKTtcclxuICAgICAqIC8vIGNyZWF0aW5nIGEgY29va2llXHJcbiAgICAgKiBjb29raWVNb25zdGVyLnNldENvb2tpZSgnYXRyb3BhJywgJ2hpYWwgYXRyb3BhISEnKTtcclxuICAgICAqIGNvbnNvbGUubG9nKGRvY3VtZW50LmNvb2tpZSk7XHJcbiAgICAgKiBcclxuICAgICAqIC8vIGdldHRpbmcgYSBjb29raWUgb2JqZWN0XHJcbiAgICAgKiB2YXIgY29va2llT2JqID0gY29va2llTW9uc3Rlci5nZXRDb29raWUoJ2F0cm9wYScpO1xyXG4gICAgICogY29uc29sZS5sb2coY29va2llT2JqKTtcclxuICAgICAqIFxyXG4gICAgICogLy8gY29udmVydCB0aGUgY29va2llIG9iamVjdCB0byBhIHN0cmluZ1xyXG4gICAgICogY29uc29sZS5sb2coY29va2llTW9uc3Rlci5iYWtlQ29va2llKGNvb2tpZU9iaikpO1xyXG4gICAgICovXHJcbiAgICB0aGlzLmJha2VDb29raWUgPSBmdW5jdGlvbiBiYWtlQ29va2llKGNvb2tpZU9iaikge1xyXG4gICAgICAgIHZhciBjb29raWUgPSAnJywga2V5LCB2YWw7XHJcbiAgICAgICAgXHJcbiAgICAgICAga2V5ID0gY29va2llT2JqLmtleTtcclxuICAgICAgICB2YWwgPSBjb29raWVPYmoudmFsO1xyXG4gICAgICAgIGNvb2tpZSA9IGtleSArICc9JyArIHZhbCArICc7JztcclxuICAgICAgICByZXR1cm4gY29va2llO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRmlsdGVyIGNvb2tpZXMgYmFzZWQgb24gdXNlciBzcGVjaWZpZWQgY2FsbGJhY2suXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMzAyMjNcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB3aWxsIGJlIHBhc3NlZFxyXG4gICAgICogIHR3byBhcmd1bWVudHMuIFRoZSBmaXJzdCBpcyBhIGNvb2tpZSBvYmplY3QgZnJvbSB0aGUgY3VycmVudFxyXG4gICAgICogIGRvY3VtZW50LiBUaGUgc2Vjb25kIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBzdXBwbGllZCBmb3JcclxuICAgICAqICA8Y29kZT5hcmdzPC9jb2RlPiBpZiB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gcmV0dXJucyA8Y29kZT50cnVlPC9jb2RlPlxyXG4gICAgICogIHRoZW4gdGhlIGNvb2tpZSBvYmplY3Qgd2lsbCBiZSBpbmNsdWRlZCBpbiB0aGUgcmV0dXJuIHJlc3VsdHMuXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcmdzIEFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBjYWxsYmFja1xyXG4gICAgICogZnVuY3Rpb24uXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IEFuIGFycmF5IG9mIGNvb2tpZSBvYmplY3RzLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBjb29raWVNb25zdGVyID0gbmV3IGF0cm9wYS5Db29raWVNb25zdGVyKCk7XHJcbiAgICAgKiAvLyBjcmVhdGluZyBhIGZldyBjb29raWVzXHJcbiAgICAgKiBjb29raWVNb25zdGVyLnNldENvb2tpZSgnYXRyb3BhJywgJ2hpYWwgYXRyb3BhISEnKTtcclxuICAgICAqIGNvb2tpZU1vbnN0ZXIuc2V0Q29va2llKCdrYXRqaWknLCAnbXVuY2hpbmcnKTtcclxuICAgICAqIGNvbnNvbGUubG9nKGRvY3VtZW50LmNvb2tpZSk7XHJcbiAgICAgKiBcclxuICAgICAqIC8vIGZpbHRlciBjb29raWVzXHJcbiAgICAgKiBmdW5jdGlvbiBjb29raWVGaWx0ZXIoY29va2llT2JqLCBjb29raWVWYWx1ZSkge1xyXG4gICAgICogICAgIGlmKGNvb2tpZU9iai52YWwgPT09IGNvb2tpZVZhbHVlKSB7XHJcbiAgICAgKiAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICogICAgIH0gZWxzZSB7XHJcbiAgICAgKiAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAqICAgICB9XHJcbiAgICAgKiB9XHJcbiAgICAgKiB2YXIgY29va2llT2JqQXJyYXkgPSBjb29raWVNb25zdGVyLmluc3BlY3RDb29raWVzKFxyXG4gICAgICogICAgIGNvb2tpZUZpbHRlciwgJ211bmNoaW5nJyk7XHJcbiAgICAgKiBjb25zb2xlLmxvZyhjb29raWVPYmpBcnJheSk7XHJcbiAgICAgKi9cclxuICAgIHRoaXMuaW5zcGVjdENvb2tpZXMgPSBmdW5jdGlvbiBpbnNwZWN0Q29va2llcyhjYWxsYmFjaywgYXJncykge1xyXG4gICAgICAgIHZhciB0ZXN0Q29va2llLCBjb29raWVzLCBqYXIgPSBbXTtcclxuICAgICAgICBjb29raWVzID0gdGhpcy5nZXRDb29raWVzKCk7XHJcbiAgICAgICAgd2hpbGUgKGNvb2tpZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0ZXN0Q29va2llID0gY29va2llcy5zaGlmdCgpO1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sodGVzdENvb2tpZSwgYXJncykgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGphci5wdXNoKHRlc3RDb29raWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBqYXI7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnRlcm5hbCBjYWxsYmFjayBmdW5jdGlvbiB1c2VkIHdoaWxlIGdldHRpbmcgdGhlIGN1cnJlbnRcclxuICAgICAqIGNvb2tpZXMuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMzAyMjNcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXItXHJcbiAgICAgKiBAcGFyYW0ge2Nvb2tpZU9ian0gdGVzdENvb2tpZSBBIGNvb2tpZSBvYmplY3RcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhcmdzIGFyZ3VtZW50IHVzZWQgaW4gY29tcGFyaXNvbiBmdW5jdGlvblxyXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IElmIGNvb2tpZSBrZXkgaXMgZXhhY3RseSBlcXVhbCB0byB0aGUgYXJndW1lbnRcclxuICAgICAqIHRoZW4gdGhlIGNhbGxiYWNrIHJldHVybnMgdHJ1ZS5cclxuICAgICAqL1xyXG4gICAgZ2V0Q29va2llQ2FsbGJhY2sgPSBmdW5jdGlvbiBnZXRDb29raWVDYWxsYmFjayh0ZXN0Q29va2llLCBhcmdzKSB7XHJcbiAgICAgICAgdmFyIG91dDtcclxuICAgICAgICBpZiAodGVzdENvb2tpZS5rZXkgPT09IGFyZ3MpIHtcclxuICAgICAgICAgICAgb3V0ID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvdXQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYSB1c2VyIHJlcXVlc3RlZCBjb29raWUuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMzAyMjNcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB3aGljaEtleSBUaGUgY29va2llcyBrZXkgKG5hbWUpXHJcbiAgICAgKiBAcmV0dXJucyB7Y29va2llT2JqfGZhbHNlfSBSZXR1cm5zIGEgY29va2llIG9iamVjdCBpZlxyXG4gICAgICogIGEgY29va2llIHdpdGggdGhlIHNwZWNpZmllZCBrZXkgaXMgZm91bmQgb3IgZmFsc2UgaWZcclxuICAgICAqICBpdCBpcyBub3QgZm91bmQuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGNvb2tpZU1vbnN0ZXIgPSBuZXcgYXRyb3BhLkNvb2tpZU1vbnN0ZXIoKTtcclxuICAgICAqIC8vIGNyZWF0aW5nIGEgY29va2llXHJcbiAgICAgKiBjb29raWVNb25zdGVyLnNldENvb2tpZSgnYXRyb3BhJywgJ2hpYWwgYXRyb3BhISEnKTtcclxuICAgICAqIGNvbnNvbGUubG9nKGRvY3VtZW50LmNvb2tpZSk7XHJcbiAgICAgKiAvLyBnZXQgYSBzcGVjaWZpYyBjb29raWVcclxuICAgICAqIHZhciBjb29raWVPYmogPSBjb29raWVNb25zdGVyLmdldENvb2tpZSgnYXRyb3BhJyk7XHJcbiAgICAgKiBjb25zb2xlLmxvZyhjb29raWVPYmoua2V5KTtcclxuICAgICAqIGNvbnNvbGUubG9nKGNvb2tpZU9iai52YWwpO1xyXG4gICAgICovXHJcbiAgICB0aGlzLmdldENvb2tpZSA9IGZ1bmN0aW9uIGdldENvb2tpZSh3aGljaEtleSkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmluc3BlY3RDb29raWVzKGdldENvb2tpZUNhbGxiYWNrLCB3aGljaEtleS50cmltKCkpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHRbMF0gfHwgZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYWxsIGNvb2tpZXMuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcclxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gQW4gYXJyYXkgd2hvc2UgZWxlbWVudHMgYXJlIGNvb2tpZSBvYmplY3RzLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBjb29raWVNb25zdGVyID0gbmV3IGF0cm9wYS5Db29raWVNb25zdGVyKCk7XHJcbiAgICAgKiAvLyBjcmVhdGluZyBhIGNvb2tpZVxyXG4gICAgICogY29va2llTW9uc3Rlci5zZXRDb29raWUoJ2F0cm9wYScsICdoaWFsIGF0cm9wYSEhJyk7XHJcbiAgICAgKiAvLyBnZXQgYWxsIGNvb2tpZSBvYmplY3RzIGluIGFuIGFycmF5XHJcbiAgICAgKiBjb25zb2xlLmxvZyhjb29raWVNb25zdGVyLmdldENvb2tpZXMoKSk7XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZ2V0Q29va2llcyA9IGZ1bmN0aW9uIGdldENvb2tpZXMoKSB7XHJcbiAgICAgICAgdmFyIG4sIGwsIGNvb2tpZUFycmF5LCBjb29raWVPYmo7XHJcbiAgICAgICAgY3VycmVudENvb2tpZXMgPSBbXTtcclxuICAgICAgICBjb29raWVBcnJheSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjtcIik7XHJcbiAgICAgICAgZm9yIChuID0gMCwgbCA9IGNvb2tpZUFycmF5Lmxlbmd0aDsgbiA8IGw7IG4rKykge1xyXG4gICAgICAgICAgICBjb29raWVPYmogPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGNvb2tpZUFycmF5W25dKSB7XHJcbiAgICAgICAgICAgICAgICBjb29raWVPYmogPSB0aGlzLmNvb2tpZTJvYmooY29va2llQXJyYXlbbl0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvb2tpZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb29raWVzLnB1c2goY29va2llT2JqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY3VycmVudENvb2tpZXM7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIGEgc3BlY2lmaWVkIGNvb2tpZSBieSB1c2VyIHN1Ym1pdHRlZCBzdHJpbmcuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMzAyMjNcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB3aGljaEtleSBUaGUgY29va2llcyBrZXkgKG5hbWUpIHRoYXRcclxuICAgICAqIHdpbGwgYmUgZGVsZXRlZC5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgY29va2llTW9uc3RlciA9IG5ldyBhdHJvcGEuQ29va2llTW9uc3RlcigpO1xyXG4gICAgICogLy8gY3JlYXRpbmcgdGhlIGNvb2tpZSB0byBkZWxldGVcclxuICAgICAqIGNvb2tpZU1vbnN0ZXIuc2V0Q29va2llKCdhdHJvcGEnLCAnaGlhbCBhdHJvcGEhIScpO1xyXG4gICAgICogY29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKTtcclxuICAgICAqIC8vIGRlbGV0ZSBhIGNvb2tpZVxyXG4gICAgICogY29va2llTW9uc3Rlci5kZWxldGVDb29raWUoJ2F0cm9wYScpO1xyXG4gICAgICogY29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKTtcclxuICAgICAqL1xyXG4gICAgdGhpcy5kZWxldGVDb29raWUgPSBmdW5jdGlvbiBkZWxldGVDb29raWUod2hpY2hLZXkpIHtcclxuICAgICAgICB2YXIgY29va2llT2JqID0ge307XHJcbiAgICAgICAgY29va2llT2JqLmtleSA9IHdoaWNoS2V5O1xyXG4gICAgICAgIGNvb2tpZU9iai52YWwgPSAnO2V4cGlyZXM9VGh1LCAyIEF1ZyAyMDAxIDIwOjQ3OjExIFVUQyc7XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gdGhpcy5iYWtlQ29va2llKGNvb2tpZU9iaik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIGEgc3BlY2lmaWVkIGNvb2tpZSBieSB1c2VyIHN1Ym1pdHRlZCBjb29raWVPYmouXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcclxuICAgICAqIEBwYXJhbSB7Y29va2llT2JqfSBjb29raWVPYmogQSBjb29raWUgb2JqZWN0LlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBjb29raWVNb25zdGVyID0gbmV3IGF0cm9wYS5Db29raWVNb25zdGVyKCk7XHJcbiAgICAgKiAvLyBjcmVhdGluZyB0aGUgY29va2llIHRvIGRlbGV0ZVxyXG4gICAgICogY29va2llTW9uc3Rlci5zZXRDb29raWUoJ2F0cm9wYScsICdoaWFsIGF0cm9wYSEhJyk7XHJcbiAgICAgKiBjb25zb2xlLmxvZyhkb2N1bWVudC5jb29raWUpO1xyXG4gICAgICogLy8gZGVsZXRlIGEgY29va2llXHJcbiAgICAgKiBjb29raWVNb25zdGVyLmRlbGV0ZUNvb2tpZU9iaihcclxuICAgICAqICAgICB7a2V5IDogJ2F0cm9wYScsIHZhbCA6ICdkb2VzIG5vdCBtYXR0ZXInfSk7XHJcbiAgICAgKiBjb25zb2xlLmxvZyhkb2N1bWVudC5jb29raWUpO1xyXG4gICAgICovXHJcbiAgICB0aGlzLmRlbGV0ZUNvb2tpZU9iaiA9IGZ1bmN0aW9uIGRlbGV0ZUNvb2tpZU9iaihjb29raWVPYmopIHtcclxuICAgICAgICB0aGlzLmRlbGV0ZUNvb2tpZShjb29raWVPYmoua2V5KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgYSBjb29raWUgcGVyIHVzZXIgc3BlY2lmaWNhdGlvbnMgYXMgc3RyaW5ncy4gVGhlIGNvb2tpZVxyXG4gICAgICogd2lsbCBleHBpcmUgd2hlbiB0aGUgYnJvd3NlciBpcyBjbG9zZWQuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB3aGljaEtleSBUaGUga2V5IChuYW1lKSBvZiB0aGUgbmV3IGNvb2tpZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNldFRvIFRoZSB2YWx1ZSBvZiB0aGUgbmV3IGNvb2tpZS5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgY29va2llTW9uc3RlciA9IG5ldyBhdHJvcGEuQ29va2llTW9uc3RlcigpO1xyXG4gICAgICogLy8gc2V0IGEgY29va2llXHJcbiAgICAgKiBjb29raWVNb25zdGVyLnNldENvb2tpZSgnYXRyb3BhJywgJ2hpYWwnKTtcclxuICAgICAqIGNvbnNvbGUubG9nKGRvY3VtZW50LmNvb2tpZSk7XHJcbiAgICAgKi9cclxuICAgIHRoaXMuc2V0Q29va2llID0gZnVuY3Rpb24gc2V0Q29va2llKHdoaWNoS2V5LCBzZXRUbykge1xyXG4gICAgICAgIHZhciBuZXdDb29raWUgPSB7fTtcclxuICAgICAgICBuZXdDb29raWUua2V5ID0gd2hpY2hLZXk7XHJcbiAgICAgICAgbmV3Q29va2llLnZhbCA9IHNldFRvO1xyXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IHRoaXMuYmFrZUNvb2tpZShuZXdDb29raWUpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBhIGNvb2tpZSBwZXIgdXNlciBzcGVjaWZpY2F0aW9ucyBhcyBhbiBvYmplY3QuXHJcbiAgICAgKiBUaGUgY29va2llIHdpbGwgZXhwaXJlIHdoZW4gdGhlIGJyb3dzZXIgaXMgY2xvc2VkLlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXIjXHJcbiAgICAgKiBAcGFyYW0ge2Nvb2tpZU9ian0gY29va2llT2JqIEEgY29va2llIG9iamVjdC5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgY29va2llTW9uc3RlciA9IG5ldyBhdHJvcGEuQ29va2llTW9uc3RlcigpO1xyXG4gICAgICogLy8gc2V0IGEgY29va2llXHJcbiAgICAgKiBjb29raWVNb25zdGVyLnNldENvb2tpZU9iaih7a2V5IDogJ2F0cm9wYScsIHZhbCA6ICdoaWFsIGF0cm9wYSEhJ30pO1xyXG4gICAgICogY29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKTtcclxuICAgICAqL1xyXG4gICAgdGhpcy5zZXRDb29raWVPYmogPSBmdW5jdGlvbiBzZXRDb29raWVPYmooY29va2llT2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0Q29va2llKGNvb2tpZU9iai5rZXksIGNvb2tpZU9iai52YWwpO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnQ29va2llTW9uc3RlcicpO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCJ2YXIgYXRyb3BhID0ge307XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG5cclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIFhQYXRoUmVzdWx0ICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqL1xyXG52YXIgYXRyb3BhO1xyXG5hdHJvcGEgPSB7fTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHRoaXMgY2xhc3MgaGFzIGJlZW4gbWFya2VkIGFzIHVuc3VwcG9ydGVkIGFuZCB0aHJvd3MgYW4gXHJcbiAqICBlcnJvciBpZiBpdCBoYXMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDMwOFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lIFRoZSBuYW1lIG9mIHRoZSBjbGFzcy5cclxuICogQHBhcmFtIHtTdHJpbmd9IGVycm9yTWVzc2FnZSBPcHRpb25hbC4gQSBjdXN0b20gZXJyb3IgbWVzc2FnZS4gRGVmYXVsdHMgdG9cclxuICogIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uZXJyb3JcclxuICovXHJcbmF0cm9wYS5zdXBwb3J0Q2hlY2sgPSBmdW5jdGlvbiAoY2xhc3NOYW1lLCBlcnJvck1lc3NhZ2UpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgY2xhc3NOYW1lID0gU3RyaW5nKGNsYXNzTmFtZSk7XHJcbiAgICBlcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2UgfHwgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5lcnJvcjtcclxuICAgIGVycm9yTWVzc2FnZSA9IFN0cmluZyhlcnJvck1lc3NhZ2UpO1xyXG4gICAgXHJcbiAgICBpZihhdHJvcGEuZGF0YVtjbGFzc05hbWVdLnN1cHBvcnQgPT09ICd1bnN1cHBvcnRlZCcpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgIH1cclxufTtcclxuLyoqXHJcbiAqIFB1c2hlcyBhIHJlcXVpcmVtZW50IGNoZWNrIGludG8gYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLiBUaGUgdGVzdFxyXG4gKiAgdGVzdHMgd2hldGhlciB0aGUgY2xhc3MgaXMgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuIFNldHNcclxuICogIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0ncyBzdXBwb3J0IHRvIHVuc3VwcG9ydGVkIGFuZCBlcnJvciB0byBlcnJvck1lc3NhZ2VcclxuICogIGlmIHRoZSByZXF1aXJlbWVudEZuIHJldHVybnMgZmFsc2UuIFRoZSByZXF1aXJlbWVudCBjaGVja3Mgd2lsbCBhbGwgYmUgcnVuXHJcbiAqICBhZnRlciB0aGUgbGlicmFyeSBoYXMgbG9hZGVkLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMDhcclxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZSBUaGUgbmFtZSBvZiB0aGUgY2xhc3MuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlcXVpcmVtZW50Rm4gQSBmdW5jdGlvbiB0byB0ZXN0IHdoZXRoZXIgb3Igbm90IHRoZSBjbGFzc1xyXG4gKiAgaXMgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuIElmIHN1cHBvcnRlZCwgcmV0dXJucyB0cnVlIG90aGVyd2lzZVxyXG4gKiAgcmV0dXJuIGZhbHNlLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXJyb3JNZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlIHRvIHVzZSB3aGVuIHRoaXMgY2xhc3Mgb3IgaXRzXHJcbiAqICBtZXRob2RzIGFyZSBjYWxsZWQgaW4gdW5zdXBwb3J0ZWQgZW52aXJvbm1lbnRzLiBEZWZhdWx0cyB0bzpcclxuICogICdUaGUgYXRyb3BhLicgKyBjbGFzc05hbWUgKyAnIGNsYXNzIGlzIHVuc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuJztcclxuICovXHJcbmF0cm9wYS5yZXF1aXJlcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUsIHJlcXVpcmVtZW50Rm4sIGVycm9yTWVzc2FnZSkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgY2hlY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRlc3QgPSBmYWxzZTtcclxuICAgICAgICBpZih0eXBlb2YgY2xhc3NOYW1lICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2F0cm9wYS5yZXF1aXJlcyByZXF1aXJlcyB0aGUgY2xhc3MgbmFtZSB0byBiZSAnICtcclxuICAgICAgICAgICAgICAgICdzcGVjaWZpZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoYXRyb3BhLmRhdGFbY2xhc3NOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0gPSB7fTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiByZXF1aXJlbWVudEZuICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlbWVudEZuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlIHx8ICdUaGUgYXRyb3BhLicgKyBjbGFzc05hbWUgK1xyXG4gICAgICAgICAgICAgICAgICAgICcgY2xhc3MgaXMgdW5zdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4nO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGVzdCA9IHJlcXVpcmVtZW50Rm4oKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGVzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLmVycm9yID0gZXJyb3JNZXNzYWdlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodGVzdCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uc3VwcG9ydCA9ICd1bnN1cHBvcnRlZCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucHVzaChjaGVjayk7XHJcbn07XHJcbi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGdvYmFsIGRhdGEgcmVsYXRlZCB0byB0aGUgY2xhc3NlcyBhbmQgZnVuY3Rpb25zLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGdvYmFsIGRhdGEgcmVsYXRlZCB0byB0aGUgY2xhc3NlcyBhbmQgZnVuY3Rpb25zLlxyXG4gKi9cclxuYXRyb3BhLmRhdGEgPSB7fTtcclxuXHJcbmF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cyA9IFtdO1xyXG5cclxuYXRyb3BhLm5vcCA9IGZ1bmN0aW9uIG5vcCAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuXHJcbiJdfQ==
;