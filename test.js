#!/usr/bin/env node

var mapnik = require('mapnik'),
    fs = require('fs'),
    sm = new (require('sphericalmercator'))();

var t = sm.bbox(100, 100, 10);
var map = new mapnik.Map(256, 256);
var image = new mapnik.Image(256, 256);

console.log('creating datasource');

var jit = new mapnik.Datasource({
    type: 'jit',
    url: 'http://localhost:20010/roads.json'
});

console.log(jit);
console.log(jit.describe());

map.bufferSize = 0;
map.fromString(fs.readFileSync('test.xml', 'utf-8'),
    function(err, m) {
    m.extent = sm.bbox(37493, 50104, 17);
    m.renderFileSync('/tmp/0_0_0.png');
});
