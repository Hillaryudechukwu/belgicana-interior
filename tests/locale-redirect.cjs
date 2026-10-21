const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const { NextRequest } = require('next/server');
const filename = path.resolve(__dirname, '../app/api/locale/route.ts');
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const route = new Module(filename, module);
route.filename = filename;
route.paths = Module._nodeModulePaths(path.dirname(filename));
route._compile(compiled, filename);
function request(returnTo, locale = 'pt') {
  const url = new URL('https://0.0.0.0:10000/api/locale');
  url.searchParams.set('locale', locale);
  url.searchParams.set('returnTo', returnTo);
  return new NextRequest(url);
}
for (const locale of ['en', 'pt']) {
  const response = route.exports.GET(request('/contact?source=nav#form', locale));
  assert.equal(response.status, 303);
  assert.equal(response.headers.get('location'), '/contact?source=nav#form');
  assert.match(response.headers.get('set-cookie'), new RegExp(`locale=${locale}`));
  assert.match(response.headers.get('cache-control'), /no-store/);
}
for (const unsafe of ['https://example.com', '//example.com', '/\\example.com', '/.//example.com', 'https://[invalid']) {
  assert.equal(route.exports.GET(request(unsafe)).headers.get('location'), '/', unsafe);
}
assert.equal(route.exports.GET(request('/contact', 'fr')).status, 400);
console.log('Locale redirects passed: relative public-site navigation, cookies, invalid locale, and external redirect protection.');
