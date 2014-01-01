
  
/* vsdoc for _global_ */

(function (window) {
    

    window._global_ = {
        /// <summary></summary>
        /// <returns type="_global_"/>
                
    };

    var $x = window._global_;
    $x.__namespace = "true";
    $x.__typeName = "_global_";
})(this);

  

  
/* vsdoc for atropa */

(function (window) {
    

    window.atropa = {
        /// <summary></summary>
        /// <field name="data" type="">Container for gobal data related to the classes and functions.</field>
        /// <returns type="atropa"/>
                
        supportCheck: function(className, errorMessage) {
            /// <summary>Checks whether this class has been marked as unsupported and throws an 
            ///  error if it has.</summary>
            /// <param name="className" type="String">The name of the class.</param>
            /// <param name="errorMessage" type="String">Optional. A custom error message. Defaults to
            ///  atropa.data[className].error</param>
        }, 
        
        requires: function(className, requirementFn, errorMessage) {
            /// <summary>Pushes a requirement check into atropa.data.requirements. The test
            ///  tests whether the class is supported in this environment. Sets
            ///  atropa.data[className]&apos;s support to unsupported and error to errorMessage
            ///  if the requirementFn returns false. The requirement checks will all be run
            ///  after the library has loaded.</summary>
            /// <param name="className" type="String">The name of the class.</param>
            /// <param name="requirementFn" type="Function">A function to test whether or not the class
            ///  is supported in this environment. If supported, returns true otherwise
            ///  return false.</param>
            /// <param name="errorMessage" type="String">The error message to use when this class or its
            ///  methods are called in unsupported environments. Defaults to:
            ///  &apos;The atropa.&apos; + className + &apos; class is unsupported in this environment.&apos;;</param>
        }
        
    };

    var $x = window.atropa;
    $x.__namespace = "true";
    $x.__typeName = "atropa";
})(this);

  

  
  
/* vsdoc for atropa.CookieMonster */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.CookieMonster = function(){
        /// <summary></summary>
        /// <returns type="atropa.CookieMonster"/>
    };

    var $x = window.atropa.CookieMonster;
    $x.prototype = {
                
        cookie2obj: function(cookie) {
            /// <summary>Converts a cookie string into an object.</summary>
            /// <param name="cookie" type="String">A cookie represented as a string
            /// &lt;code&gt;cookieName=cookieVal;&lt;/code&gt;</param>
            /// <returns type="cookieObj">Returns a cookie object.</returns>
        }, 
        
        bakeCookie: function(cookieObj) {
            /// <summary>Converts a cookie object to a cookie string.</summary>
            /// <param name="cookieObj" type="Object">A cookie object</param>
            /// <returns type="String">Returns a cookie string.</returns>
        }, 
        
        inspectCookies: function(callback, args) {
            /// <summary>Filter cookies based on user specified callback.</summary>
            /// <param name="callback" type="function">The callback function will be passed
            ///  two arguments. The first is a cookie object from the current
            ///  document. The second argument is the value supplied for
            ///  &lt;code&gt;args&lt;/code&gt; if the callback function returns &lt;code&gt;true&lt;/code&gt;
            ///  then the cookie object will be included in the return results.</param>
            /// <param name="args" type="Array">Arguments to pass to the callback
            /// function.</param>
            /// <returns type="Array">An array of cookie objects.</returns>
        }, 
        
        getCookie: function(whichKey) {
            /// <summary>Gets a user requested cookie.</summary>
            /// <param name="whichKey" type="String">The cookies key (name)</param>
            /// <returns type="cookieObj|false">Returns a cookie object if
            ///  a cookie with the specified key is found or false if
            ///  it is not found.</returns>
        }, 
        
        getCookies: function() {
            /// <summary>Get all cookies.</summary>
            /// <returns type="Array">An array whose elements are cookie objects.</returns>
        }, 
        
        "delete": function(whichKey) {
            /// <summary>Deletes a specified cookie by user submitted string.</summary>
            /// <param name="whichKey" type="String">The cookies key (name) that
            /// will be deleted.</param>
        }, 
        
        "delete": function(cookieObj) {
            /// <summary>Deletes a specified cookie by user submitted cookieObj.</summary>
            /// <param name="cookieObj" type="cookieObj">A cookie object.</param>
        }, 
        
        setCookie: function(whichKey, setTo) {
            /// <summary>Sets a cookie per user specifications as strings. The cookie
            /// will expire when the browser is closed.</summary>
            /// <param name="whichKey" type="String">The key (name) of the new cookie</param>
            /// <param name="setTo" type="String">The value of the new cookie.</param>
        }, 
        
        setCookieObj: function(cookieObj) {
            /// <summary>Sets a cookie per user specifications as an object.
            /// The cookie will expire when the browser is closed.</summary>
            /// <param name="cookieObj" type="cookieObj">A cookie object.</param>
        }
        
    };

    $x.__class = "true";
    $x.__typeName = "atropa.CookieMonster";
})(this);


  
/* vsdoc for atropa.data */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.data = {
        /// <summary></summary>
        /// <returns type="atropa.data"/>
                
    };

    var $x = window.atropa.data;
    $x.__namespace = "true";
    $x.__typeName = "atropa.data";
})(this);

  

