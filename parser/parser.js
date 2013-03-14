var util = require('util');
var _    = require('underscore');

popState = function(){
  this.popState();
}

popThenBeginState = function(name){
  return function(){
    this.popState();
    this.begin(name);
  }
}

beginState = function(name){
  return function(){
    this.begin(name);
  }
}

var yy = {};
yy.matchedrule = function(n, that, args){
  //args: yy,yy_,$avoiding_name_collisions,YY_START
  args = Array.prototype.slice.call(args);
  var yy = args[0];
  var yy_ = args[1];
  var $avoiding_name_collisions = args[2];
  var YY_START = args[3];
  
  var rule = psudo_jison_json.lex.rules[n];
  var fn  = rule[rule.length - 1];
  var tkn;
  var regex;
  if(typeof(fn) === "function"){
    tkn = rule[rule.length - 2];
    regex = rule[rule.length - 3];
  }else{
    tkn = fn;
    regex = rule[rule.length - 2];
    fn = null;
  }
  //TODO improve this logging;
  console.log( 'Matched Rule: ', n);
  console.log( '      |regex: ', regex);
  console.log( '      |match: ', JSON.stringify(yy_.yytext));
  console.log( '      |retrn: ', tkn);
  if(fn) fn.apply(that, args);
  return tkn;
}

yy.matchedbnf = function(key, n, that, argsarr){
  //that.$ = $$, that._$
  //args: yytext,yyleng,yylineno,yy,yystate,$$,_$
  var args = {
      yytext  :argsarr[0],
      yyleng  :argsarr[1],
      yylineno:argsarr[2],
      yy      :argsarr[3],
      yystate :argsarr[4],
      $$      :argsarr[5],
      _$      :argsarr[6]
  };
  
  var symbols = psudo_jison_json.bnf[key][n][0].split(' ');  
  var $$ = args.$$.slice(0);
  var parts = [];
  var symbols_temp = symbols.slice(0);
  while(symbols_temp.pop()){
    parts.unshift($$.pop());  
  }
  
  parts.unshift(null);
  
  var newargs = [parts, args];

  var fn      = psudo_jison_json.bnf[key][n][1];
  
  if(typeof fn === 'function'){
    var res = fn.apply(that, newargs);
  }

  parts.shift();
  
  console.log( 'BNF Action  : ', key + '[' + n + ']');
  console.log( '    |symbols: ', JSON.stringify(symbols));
  console.log( '    |  parts: ', JSON.stringify(parts));
  console.log( '    | this.$: ', JSON.stringify(that.$));

  if(res != undefined){
  console.log( '    |  reslt: ', res);
  return res;
  }
}

function clone(a) {
  return JSON.parse(JSON.stringify(a));
}

function convertToGrammar(){
  var json = clone(psudo_jison_json);
  var rules = json.lex.rules;
  for(n=0;n<rules.length;n++){
    rule = rules[n];
    x = rule.pop();
    if(x === null) x = rule.pop(); //will be null if it was a function.
    if(x === null || x === 'null'){
      x = "return null;";
    }else{
      x = "return '" + x + "';";
    }
    var newrule = 'yy.ex.matchedrule(' + n + ', this, arguments); ' + x;
    rule.push(newrule);
  };
  var bnf = json.bnf;
  _.forEach(bnf, function(value,key){
    //console.log('A', key);
    for(n=0; n< value.length; n++){
      //console.log('B', n);
      var row = value[n];
      //console.log('C', row[1]);
      var newaction =  'yy.ex.matchedbnf("' + key + '",' + n + ', this, arguments); ';
      if(row[1] === null || row[1] === 'null'){
        newaction = 'return ' + newaction;
      }else{
        newaction =  row[1] + '; ' + newaction + ';' ;
      }
      row[1] = newaction;
    }
  });    
  return json;
}

var Parser = require("jison").Parser;
var parser;

var generateParser = exports.generateParser = function(){
  var grammar = convertToGrammar();
//  console.log(util.inspect(grammar,false,4,true));
//  var grammar = orig_json;
//  console.log(util.inspect(grammar,false,4,true));
  parser = new Parser(grammar);
}

var saveParserToDisk = exports.saveParserToDisk = function(){
  var parserSource = parser.generate();  
  //TODO write to __NAME__
}

var loadParserFromDisk = exports.loadParserFromDisk = function(){
  parser = require(__NAME__).parser;
}

var parse = exports.parse = function(input) {
  parser.yy.ex = yy;
  var result =  parser.parse(input);
  console.log("We're done. DISCO!");
  console.log(util.inspect(result,false,4,true));
  return result;
}

var psudo_jison_json = 
{
  "lex": {
    "rules": [
      [["*"]            , "<!---"          , 'FRAG_TAG_START'        , popThenBeginState('infragtag')],
      [["infragtag"]    , "fragment\\b"    , 'FRAG_TAG_START_OPEN' ] ,
      [["infragtag"]    , "\\/fragment\\b" , 'FRAG_TAG_START_CLOSE'] ,
      [["infragtag"]    , "--->"           , 'FRAG_TAG_END_OPEN'     , popState],
      [["infragtag"]    , "\\/--->"        , 'FRAG_TAG_END_CLOSED'   , popState],
      [["infragtag"]    , "\\s+"           , 'null' /* skip */     ] ,
      [["infragtag"]    , "\\n+"           , 'null' /* skip */     ] ,
      [["infragtag"]    , "\\.include\\b"  , 'FRAG_TAG_CMD'        ] ,
      [["infragtag"]    , "\\.define\\b"   , 'FRAG_TAG_CMD'        ] ,
      [["infragtag"]    , "[a-zA-Z]+"      , 'FRAG_TAG_ATR_NAME'   ] ,
      [["infragtag"]    , "=\""            , 'FRAG_TAG_ATR_START'    , beginState('infragtagattr')],
      [["infragtagattr"], "\""             , 'FRAG_TAG_ATR_END'      , popState],
      [["infragtagattr"], "[^\\\"\\n]+"    , 'FRAG_TAG_ATR_VALUE'  ] ,
      [                   ".+"             , 'NORM_START'            , beginState('normal')],
      [["INITIAL"]      , "\\n+"           , 'NORM_START'            , beginState('normal')],
      [["normal"]       , "[^<\\n]+"       , 'NORM_CONTENT'        ] ,
      [["normal"]       , "<"              , 'NORM_CONTENT'        ] ,
      [["normal"]       , "\\n+"           , 'NORM_CONTENT'        ] ,
      [["normal"]       , ".+"             , 'NORM_CONTENT'        ] ,
      [["*"]            , "$"              , 'EOF'                 ]
    ],
    "macros": {
      "COMMENTCLOSE": "--->",
      "COMMENTOPEN": "<!---",
      "COMMENTFIRST": "<"
    },
    "startConditions": {
      "infragtagattr": 1,
      "infragtag": 1,
      "normal": 1
    }
  },
  "start": "file",
  //$$ => this.$
  //$n => part.n
  "bnf": {
    
    "file": [
      ["sections EOF",
          function(part){return part[1]}]
    ],
    
    "sections": [
      ["section", 
          function(part){this.$ = [part[1]]}],
      ["sections section",
          function(part){this.$ = part[1].concat(part[2])}],
    ],
    
    "section": [
      ["fragtag",
          function(){this.$['type']='frgtag'}],
      ["normal",
          ""]
    ],
    
    "fragtag": [
      ["fragtag_selfclosing",
          "" ], 
      ["fragtag_openandclose", 
          "" ]
    ],
                         
    "fragtag_openandclose": [
      ["fragtag_open fragtag_close", 
         "" ],
      ["fragtag_open normal fragtag_close", 
         "$$['content']=$2; $$['raw'] += $2.raw + $3.raw "]
    ],
                         
    "fragtag_open": [
      ["FRAG_TAG_START FRAG_TAG_START_OPEN FRAG_TAG_CMD fragtag_attributes FRAG_TAG_END_OPEN",
         "$$ = {command:$3, attributes:$4.hash, raw: '<!---fragment' + $3 + $4.raw + '--->', raw1: '<!---fragment' + $3 + $4.raw + '--->', raw3: '<!---/fragment' + $3 + '--->'};"],
      ["FRAG_TAG_START FRAG_TAG_START_OPEN FRAG_TAG_CMD FRAG_TAG_END_OPEN",
         "$$ = {command:$3}"]
    ],
    
    "fragtag_close": [
      ["FRAG_TAG_START FRAG_TAG_START_CLOSE FRAG_TAG_CMD FRAG_TAG_END_OPEN",
         "$$ = {raw:$1 + $2 + $3 + $4}"]
    ],
    
    "fragtag_selfclosing": [
      ["FRAG_TAG_START FRAG_TAG_START_OPEN FRAG_TAG_CMD fragtag_attributes FRAG_TAG_END_CLOSED",
         "$$ ={command:$3, attributes:$4.hash, raw: '<!---fragment' + $3 + $4.raw + '/--->', raw1: '<!---fragment' + $3 + $4.raw + '--->', raw3: '<!---/fragment' + $3 + '--->'}"]
    ],
    
    "fragtag_attributes": [
      ["fragtag_attribute",
         "$$ = {hash:{}, raw:''}; $$.hash[$1.name] = $1.value; $$.raw += $1.raw "],
      ["fragtag_attributes fragtag_attribute",
         "$$ = $1;                $$.hash[$2.name] = $2.value; $$.raw += $2.raw  "]
    ],
    
    "fragtag_attribute": [
      ["FRAG_TAG_ATR_NAME FRAG_TAG_ATR_START FRAG_TAG_ATR_VALUE FRAG_TAG_ATR_END",
         "$$ = {name:$1, value:$3, raw: ' ' + $1 + $2 + $3 + $4}"]
    ],
    "fragtag_contents": [
      ["FRAG_TAG_CONTENT",
         "" ],
      ["FRAG_TAG_CONTENT fragtag_contents",
        "$$ = $1 + $2;"]
    ],
    
    "normal": [
      ["normalw", 
         "$$ = {type:'normal', raw:$1};"]
    ],
    
    "normalw": [ 
      ["NORM_START",
         ""],      
      ["NORM_START norm_contents",
         "$$ = $1 + $2;"]
    ],
    
    "norm_contents": [
      ["NORM_CONTENT",
         ""],
      ["NORM_CONTENT norm_contents",
         "$$ = $1 + $2;"]
    ]
  
  }
};

var orig_json = {
    "lex": {
      "rules": [
        [
          [
            "*"
          ],
          "<!---",
          "console.log('GOT A1 ', \"[\" + yytext + \"]\"); this.popState(); this.begin('infragtag'); return 'FRAG_TAG_START';"
        ],
        [
          [
            "infragtag"
          ],
          "fragment\\b",
          "console.log('GOT A1 ', \"[\" + yytext + \"]\"); return 'FRAG_TAG_START_OPEN';"
        ],
        [
          [
            "infragtag"
          ],
          "\\/fragment\\b",
          "console.log('GOT A2 ', \"[\" + yytext + \"]\"); return 'FRAG_TAG_START_CLOSE';"
        ],
        [
          [
            "infragtag"
          ],
          "--->",
          "console.log('GOT A3 ', \"[\" + yytext + \"]\"); this.popState();                          return 'FRAG_TAG_END_OPEN';"
        ],
        [
          [
            "infragtag"
          ],
          "\\/--->",
          "console.log('GOT A4 ', \"[\" + yytext + \"]\"); this.popState(); console.log(this);       return 'FRAG_TAG_END_CLOSED';"
        ],
        [
          [
            "infragtag"
          ],
          "\\s+",
          "console.log('GOT C-2', \"[\" + yytext + \"]\"); /* skip whitespace */"
        ],
        [
          [
            "infragtag"
          ],
          "\\n+",
          "console.log('GOT C-1', \"[\" + yytext + \"]\"); /* skip newlines */"
        ],
        [
          [
            "infragtag"
          ],
          "\\.include\\b",
          "console.log('GOT C1 ', \"[\" + yytext + \"]\"); return 'FRAG_TAG_CMD';"
        ],
        [
          [
            "infragtag"
          ],
          "\\.define\\b",
          "console.log('GOT C2 ', \"[\" + yytext + \"]\"); return 'FRAG_TAG_CMD';"
        ],
        [
          [
            "infragtag"
          ],
          "[a-zA-Z]+",
          "console.log('GOT C3 ', \"[\" + yytext + \"]\"); return 'FRAG_TAG_ATR_NAME';"
        ],
        [
          [
            "infragtag"
          ],
          "=\"",
          "console.log('GOT C4 ', \"[\" + yytext + \"]\"); this.begin('infragtagattr'); return 'FRAG_TAG_ATR_START';"
        ],
        [
          [
            "infragtagattr"
          ],
          "\"",
          "console.log('GOT C5 ', \"[\" + yytext + \"]\"); this.popState();             return 'FRAG_TAG_ATR_END';"
        ],
        [
          [
            "infragtagattr"
          ],
          "[^\\\"\\n]+",
          "console.log('GOT C6 ', \"[\" + yytext + \"]\"); return 'FRAG_TAG_ATR_VALUE';"
        ],
        [
          ".+",
          "console.log('GOT T5 ', \"[\" + yytext + \"]\"); this.begin('normal'); return 'NORM_START'"
        ],
        [
          [
            "INITIAL"
          ],
          "\\n+",
          "console.log('GOT T6 ', \"[\" + yytext + \"]\"); this.begin('normal'); return 'NORM_START'"
        ],
        [
          [
            "normal"
          ],
          "[^<\\n]+",
          "console.log('GOT T1 ', \"[\" + yytext + \"]\"); return 'NORM_CONTENT'"
        ],
        [
          [
            "normal"
          ],
          "<",
          "console.log('GOT T2 ', \"[\" + yytext + \"]\"); return 'NORM_CONTENT'"
        ],
        [
          [
            "normal"
          ],
          "\\n+",
          "console.log('GOT T3 ', \"[\" + yytext + \"]\"); return 'NORM_CONTENT'"
        ],
        [
          [
            "normal"
          ],
          ".+",
          "console.log('GOT T4 ', \"[\" + yytext + \"]\"); return 'NORM_CONTENT'"
        ],
        [
          [
            "*"
          ],
          "$",
          "console.log('GOT EOF', \"[\" + yytext + \"]\"); return 'EOF'"
        ]
      ],
      "macros": {
        "COMMENTCLOSE": "--->",
        "COMMENTOPEN": "<!---",
        "COMMENTFIRST": "<"
      },
      "startConditions": {
        "infragtagattr": 1,
        "infragtag": 1,
        "normal": 1
      }
    },
    "start": "file",
    "bnf": {
      "file": [
        [
          "sections EOF",
          "var util = require('util');console.log(\"We're done. DISCO!\");console.log(util.inspect($1,false,4,true)); return $1;"
        ]
      ],
      "sections": [
        [
          "section",
          "console.log('G2:',$1);$$ = [$1];"
        ],
        [
          "sections section",
          "console.log('G1:',$1);$$ = $1.concat($2);"
        ]
      ],
      "section": [
        [
          "fragtag",
          "$$ = $1; $$['type']='frgtag';"
        ],
        "normal"
      ],
      "fragtag": [
        "fragtag_selfclosing",
        "fragtag_openandclose"
      ],
      "fragtag_openandclose": [
        "fragtag_open fragtag_close",
        [
          "fragtag_open normal fragtag_close",
          "$$ = $1; $$['content']=$2; $$['raw'] += $2.raw + $3.raw "
        ]
      ],
      "fragtag_open": [
        [
          "FRAG_TAG_START FRAG_TAG_START_OPEN FRAG_TAG_CMD fragtag_attributes FRAG_TAG_END_OPEN",
          "$$ = {command:$3, attributes:$4.hash, raw: '<!---fragment' + $3 + $4.raw + '--->', raw1: '<!---fragment' + $3 + $4.raw + '--->', raw3: '<!---/fragment' + $3 + '--->'};"
        ],
        [
          "FRAG_TAG_START FRAG_TAG_START_OPEN FRAG_TAG_CMD FRAG_TAG_END_OPEN",
          "$$ = {command:$3}"
        ]
      ],
      "fragtag_close": [
        [
          "FRAG_TAG_START FRAG_TAG_START_CLOSE FRAG_TAG_CMD FRAG_TAG_END_OPEN",
          "$$ = {raw:$1 + $2 + $3 + $4}"
        ]
      ],
      "fragtag_selfclosing": [
        [
          "FRAG_TAG_START FRAG_TAG_START_OPEN FRAG_TAG_CMD fragtag_attributes FRAG_TAG_END_CLOSED",
          "$$ ={command:$3, attributes:$4.hash, raw: '<!---fragment' + $3 + $4.raw + '/--->', raw1: '<!---fragment' + $3 + $4.raw + '--->', raw3: '<!---/fragment' + $3 + '--->'}"
        ]
      ],
      "fragtag_attributes": [
        [
          "fragtag_attribute",
          "$$ = {hash:{}, raw:''}; $$.hash[$1.name] = $1.value; $$.raw += $1.raw "
        ],
        [
          "fragtag_attributes fragtag_attribute",
          "$$ = $1;                $$.hash[$2.name] = $2.value; $$.raw += $2.raw  "
        ]
      ],
      "fragtag_attribute": [
        [
          "FRAG_TAG_ATR_NAME FRAG_TAG_ATR_START FRAG_TAG_ATR_VALUE FRAG_TAG_ATR_END",
          "$$ = {name:$1, value:$3, raw: ' ' + $1 + $2 + $3 + $4}"
        ]
      ],
      "fragtag_contents": [
        "FRAG_TAG_CONTENT",
        [
          "FRAG_TAG_CONTENT fragtag_contents",
          "$$ = $1 + $2;"
        ]
      ],
      "normal": [
        [
          "normalw",
          "$$ = {type:'normal', raw:$1};"
        ]
      ],
      "normalw": [
        "NORM_START",
        [
          "NORM_START norm_contents",
          "$$ = $1 + $2;"
        ]
      ],
      "norm_contents": [
        "NORM_CONTENT",
        [
          "NORM_CONTENT norm_contents",
          "$$ = $1 + $2;"
        ]
      ]
    }
  }