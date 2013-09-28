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
