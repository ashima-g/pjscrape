var scraper = function() {
  seen = [];
  var replacer = function(key, value) {
    if (value != null && typeof value == "object") {
      if (seen.indexOf(value) >= 0) {
        return;
      }
      seen.push(value);
    }
    return value;
  };

  keys = Object.keys(WSI);
  for(i = 0; i < keys.length; i++){
    var testObj = WSI[keys[i]];
    try{
      var result = JSON.stringify(testObj);
    }
    catch(e){
      try{
        WSI[keys[i]] = JSON.parse(JSON.stringify(testObj,replacer));
      }
      catch(err){
        delete WSI[keys[i]];
      }
      continue;
    }
  }
  return WSI;
};

pjs.config({
    delayBetweenRuns: 50,
    log: 'stdout',
    format: 'json',
    writer: 'file',
    outFile: 'scrape_output.json'
});

pjs.addSuite({
    url:['http://www.williams-sonoma.com/products/outdoor-greek-key-embroidered-pillow-22-x-22-emerald/',
    'http://www.williams-sonoma.com/products/trellis-hand-knotted-rug-swatch-blue-ivory/'
    ],
    scraper: scraper
});
