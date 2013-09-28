var atropa = require('../src/atropa-CookieMonster.js');
var fs = require('fs');
var path = require('path');
var specPath = path.resolve(__dirname, '../browser/tests/atropa-CookieMonster.test.js');
var specCode = fs.readFileSync(specPath, "utf8");
eval(specCode);
