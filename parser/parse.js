var parser = require("./parser.md").parser;

var a = '';
a += 'Aa1' + "\n";
a += '<!---fragment.include   src="a"/--->'+ "\n";
a += 'def'+ "\n";
a += '<!--- fragment.include   src="b"   thing="c"--->'+ "\n";
a += 'bog'+ "\n";
a += '<!---/fragment.include --->'+ "\n";
a += 'ghi'+ "\n";

var b = parser.parse(a);

console.log("RESULT", b);

raw = '';
b.forEach(function(item){
  raw += item.raw;
});

console.log("OLDRAW:", "\n" + raw);

raw = '';
b.forEach(function(item){
  if( item.type === 'frgtag' ){
    raw += item.raw1 + "\n" + "XXX" + "\n" + item.raw3;
  }else{
    raw += item.raw;
  }
});

console.log("NEWRAW:", "\n" + raw);