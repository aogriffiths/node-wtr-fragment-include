/* Jison generated parser */
var parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"file":3,"sections":4,"EOF":5,"section":6,"fragtag":7,"normal":8,"fragtag_selfclosing":9,"fragtag_openandclose":10,"fragtag_open":11,"fragtag_close":12,"FRAG_TAG_START":13,"FRAG_TAG_START_OPEN":14,"FRAG_TAG_CMD":15,"fragtag_attributes":16,"FRAG_TAG_END_OPEN":17,"FRAG_TAG_START_CLOSE":18,"FRAG_TAG_END_CLOSED":19,"fragtag_attribute":20,"FRAG_TAG_ATR_NAME":21,"FRAG_TAG_ATR_START":22,"FRAG_TAG_ATR_VALUE":23,"FRAG_TAG_ATR_END":24,"fragtag_contents":25,"FRAG_TAG_CONTENT":26,"normalw":27,"NORM_START":28,"norm_contents":29,"NORM_CONTENT":30,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",13:"FRAG_TAG_START",14:"FRAG_TAG_START_OPEN",15:"FRAG_TAG_CMD",17:"FRAG_TAG_END_OPEN",18:"FRAG_TAG_START_CLOSE",19:"FRAG_TAG_END_CLOSED",21:"FRAG_TAG_ATR_NAME",22:"FRAG_TAG_ATR_START",23:"FRAG_TAG_ATR_VALUE",24:"FRAG_TAG_ATR_END",26:"FRAG_TAG_CONTENT",28:"NORM_START",30:"NORM_CONTENT"},
productions_: [0,[3,2],[4,1],[4,2],[6,1],[6,1],[7,1],[7,1],[10,2],[10,3],[11,5],[11,4],[12,4],[9,5],[16,1],[16,2],[20,4],[25,1],[25,2],[8,1],[27,1],[27,2],[29,1],[29,2]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1:var util = require('util');console.log("We're done. DISCO!");console.log(util.inspect($$[$0-1],false,4,true)); return $$[$0-1];
break;
case 2:console.log('G2:',$$[$0]);this.$ = [$$[$0]];
break;
case 3:console.log('G1:',$$[$0-1]);this.$ = $$[$0-1].concat($$[$0]);
break;
case 4:this.$ = $$[$0]; this.$['type']='frgtag';
break;
case 9:this.$ = $$[$0-2]; this.$['content']=$$[$0-1]; this.$['raw'] += $$[$0-1].raw + $$[$0].raw 
break;
case 10:this.$ = {command:$$[$0-2], attributes:$$[$0-1].hash, raw: '<!---fragment' + $$[$0-2] + $$[$0-1].raw + '--->', raw1: '<!---fragment' + $$[$0-2] + $$[$0-1].raw + '--->', raw3: '<!---/fragment' + $$[$0-2] + '--->'};
break;
case 11:this.$ = {command:$$[$0-1]}
break;
case 12:this.$ = {raw:$$[$0-3] + $$[$0-2] + $$[$0-1] + $$[$0]}
break;
case 13:this.$ ={command:$$[$0-2], attributes:$$[$0-1].hash, raw: '<!---fragment' + $$[$0-2] + $$[$0-1].raw + '/--->', raw1: '<!---fragment' + $$[$0-2] + $$[$0-1].raw + '--->', raw3: '<!---/fragment' + $$[$0-2] + '--->'}
break;
case 14:this.$ = {hash:{}, raw:''}; this.$.hash[$$[$0].name] = $$[$0].value; this.$.raw += $$[$0].raw 
break;
case 15:this.$ = $$[$0-1];                this.$.hash[$$[$0].name] = $$[$0].value; this.$.raw += $$[$0].raw  
break;
case 16:this.$ = {name:$$[$0-3], value:$$[$0-1], raw: ' ' + $$[$0-3] + $$[$0-2] + $$[$0-1] + $$[$0]}
break;
case 18:this.$ = $$[$0-1] + $$[$0];
break;
case 19:this.$ = {type:'normal', raw:$$[$0]};
break;
case 21:this.$ = $$[$0-1] + $$[$0];
break;
case 23:this.$ = $$[$0-1] + $$[$0];
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:5,9:6,10:7,11:10,13:[1,9],27:8,28:[1,11]},{1:[3]},{5:[1,12],6:13,7:4,8:5,9:6,10:7,11:10,13:[1,9],27:8,28:[1,11]},{5:[2,2],13:[2,2],28:[2,2]},{5:[2,4],13:[2,4],28:[2,4]},{5:[2,5],13:[2,5],28:[2,5]},{5:[2,6],13:[2,6],28:[2,6]},{5:[2,7],13:[2,7],28:[2,7]},{5:[2,19],13:[2,19],28:[2,19]},{14:[1,14]},{8:16,12:15,13:[1,17],27:8,28:[1,11]},{5:[2,20],13:[2,20],28:[2,20],29:18,30:[1,19]},{1:[2,1]},{5:[2,3],13:[2,3],28:[2,3]},{15:[1,20]},{5:[2,8],13:[2,8],28:[2,8]},{12:21,13:[1,17]},{18:[1,22]},{5:[2,21],13:[2,21],28:[2,21]},{5:[2,22],13:[2,22],28:[2,22],29:23,30:[1,19]},{16:24,17:[1,25],20:26,21:[1,27]},{5:[2,9],13:[2,9],28:[2,9]},{15:[1,28]},{5:[2,23],13:[2,23],28:[2,23]},{17:[1,30],19:[1,29],20:31,21:[1,27]},{13:[2,11],28:[2,11]},{17:[2,14],19:[2,14],21:[2,14]},{22:[1,32]},{17:[1,33]},{5:[2,13],13:[2,13],28:[2,13]},{13:[2,10],28:[2,10]},{17:[2,15],19:[2,15],21:[2,15]},{23:[1,34]},{5:[2,12],13:[2,12],28:[2,12]},{24:[1,35]},{17:[2,16],19:[2,16],21:[2,16]}],
defaultActions: {12:[2,1]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == "undefined")
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === "function")
        this.parseError = this.yy.parseError;
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || 1;
        if (typeof token !== "number") {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
            var errStr = "";
            if (!recovering) {
                expected = [];
                for (p in table[state])
                    if (this.terminals_[p] && p > 2) {
                        expected.push("'" + this.terminals_[p] + "'");
                    }
                if (this.lexer.showPosition) {
                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                } else {
                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                }
                this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }
        }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0)
                    recovering--;
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
            if (ranges) {
                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== "undefined") {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}
};
/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        if (this.options.ranges) this.yylloc.range = [0,0];
        this.offset = 0;
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) this.yylloc.range[1]++;

        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length-1);
        this.matched = this.matched.substr(0, this.matched.length-1);

        if (lines.length-1) this.yylineno -= lines.length-1;
        var r = this.yylloc.range;

        this.yylloc = {first_line: this.yylloc.first_line,
          last_line: this.yylineno+1,
          first_column: this.yylloc.first_column,
          last_column: lines ?
              (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
              this.yylloc.first_column - len
          };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
less:function (n) {
        this.unput(this.match.slice(n));
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.options = {};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:console.log('GOT A1 ', "[" + yy_.yytext + "]"); this.popState(); this.begin('infragtag'); return 13;
break;
case 1:console.log('GOT A1 ', "[" + yy_.yytext + "]"); return 14;
break;
case 2:console.log('GOT A2 ', "[" + yy_.yytext + "]"); return 18;
break;
case 3:console.log('GOT A3 ', "[" + yy_.yytext + "]"); this.popState();                          return 17;
break;
case 4:console.log('GOT A4 ', "[" + yy_.yytext + "]"); this.popState(); console.log(this);       return 19;
break;
case 5:console.log('GOT C-2', "[" + yy_.yytext + "]"); /* skip whitespace */
break;
case 6:console.log('GOT C-1', "[" + yy_.yytext + "]"); /* skip newlines */
break;
case 7:console.log('GOT C1 ', "[" + yy_.yytext + "]"); return 15;
break;
case 8:console.log('GOT C2 ', "[" + yy_.yytext + "]"); return 15;
break;
case 9:console.log('GOT C3 ', "[" + yy_.yytext + "]"); return 21;
break;
case 10:console.log('GOT C4 ', "[" + yy_.yytext + "]"); this.begin('infragtagattr'); return 22;
break;
case 11:console.log('GOT C5 ', "[" + yy_.yytext + "]"); this.popState();             return 24;
break;
case 12:console.log('GOT C6 ', "[" + yy_.yytext + "]"); return 23;
break;
case 13:console.log('GOT T5 ', "[" + yy_.yytext + "]"); this.begin('normal'); return 28
break;
case 14:console.log('GOT T6 ', "[" + yy_.yytext + "]"); this.begin('normal'); return 28
break;
case 15:console.log('GOT T1 ', "[" + yy_.yytext + "]"); return 30
break;
case 16:console.log('GOT T2 ', "[" + yy_.yytext + "]"); return 30
break;
case 17:console.log('GOT T3 ', "[" + yy_.yytext + "]"); return 30
break;
case 18:console.log('GOT T4 ', "[" + yy_.yytext + "]"); return 30
break;
case 19:console.log('GOT EOF', "[" + yy_.yytext + "]"); return 5
break;
}
};
lexer.rules = [/^(?:<!---)/,/^(?:fragment\b)/,/^(?:\/fragment\b)/,/^(?:--->)/,/^(?:\/--->)/,/^(?:\s+)/,/^(?:\n+)/,/^(?:\.include\b)/,/^(?:\.define\b)/,/^(?:[a-zA-Z]+)/,/^(?:=")/,/^(?:")/,/^(?:[^\"\n]+)/,/^(?:.+)/,/^(?:\n+)/,/^(?:[^<\n]+)/,/^(?:<)/,/^(?:\n+)/,/^(?:.+)/,/^(?:$)/];
lexer.conditions = {"infragtagattr":{"rules":[0,11,12,19],"inclusive":false},"infragtag":{"rules":[0,1,2,3,4,5,6,7,8,9,10,19],"inclusive":false},"normal":{"rules":[0,15,16,17,18,19],"inclusive":false},"INITIAL":{"rules":[0,13,14,19],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;
function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.Parser = parser.Parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    var source, cwd;
    if (typeof process !== 'undefined') {
        source = require('fs').readFileSync(require('path').resolve(args[1]), "utf8");
    } else {
        source = require("file").path(require("file").cwd()).join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}