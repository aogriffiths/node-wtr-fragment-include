
/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex

//if you get "TypeError: Cannot read property 'rules' of undefined" 
//maybe you are missing an entry here?
%x normal
%x infragtag
%x infragtagattr

COMMENTFIRST "<"
COMMENTOPEN "<!---"
COMMENTCLOSE "--->"

%%
//<a> </a>
//<!-- fragment.include(a) -->

//<!---fragment.include src=""/--->
//<!---fragment.include src=""--->
//<!---/fragment.include-->

<*>"<!---"               {console.log('GOT A1 ', "[" + yytext + "]"); this.popState(); this.begin('infragtag'); return 'FRAG_TAG_START';}
<infragtag>"fragment"    {console.log('GOT A1 ', "[" + yytext + "]"); return 'FRAG_TAG_START_OPEN';}
<infragtag>"/fragment"   {console.log('GOT A2 ', "[" + yytext + "]"); return 'FRAG_TAG_START_CLOSE';}
<infragtag>"--->"        {console.log('GOT A3 ', "[" + yytext + "]"); this.popState();                          return 'FRAG_TAG_END_OPEN';}
<infragtag>"/--->"       {console.log('GOT A4 ', "[" + yytext + "]"); this.popState(); console.log(this);       return 'FRAG_TAG_END_CLOSED';}

<infragtag>\s+           {console.log('GOT C-2', "[" + yytext + "]"); /* skip whitespace */}
<infragtag>\n+           {console.log('GOT C-1', "[" + yytext + "]"); /* skip newlines */}
<infragtag>".include"    {console.log('GOT C1 ', "[" + yytext + "]"); return 'FRAG_TAG_CMD';}
<infragtag>".define"     {console.log('GOT C2 ', "[" + yytext + "]"); return 'FRAG_TAG_CMD';}
<infragtag>[a-zA-Z]+     {console.log('GOT C3 ', "[" + yytext + "]"); return 'FRAG_TAG_ATR_NAME';}
<infragtag>"=\""         {console.log('GOT C4 ', "[" + yytext + "]"); this.begin('infragtagattr'); return 'FRAG_TAG_ATR_START';}
<infragtagattr>"\""      {console.log('GOT C5 ', "[" + yytext + "]"); this.popState();             return 'FRAG_TAG_ATR_END';}
<infragtagattr>[^\"\n]+  {console.log('GOT C6 ', "[" + yytext + "]"); return 'FRAG_TAG_ATR_VALUE';}

.+              {console.log('GOT T5 ', "[" + yytext + "]"); this.begin('normal'); return 'NORM_START'}  
<INITIAL>\n+             {console.log('GOT T6 ', "[" + yytext + "]"); this.begin('normal'); return 'NORM_START'}  

<normal>[^<\n]+          {console.log('GOT T1 ', "[" + yytext + "]"); return 'NORM_CONTENT'}  //eat everything except <, incase it is the start of a <!---
<normal>"<"              {console.log('GOT T2 ', "[" + yytext + "]"); return 'NORM_CONTENT'}  //eat loan <
<normal>\n+              {console.log('GOT T3 ', "[" + yytext + "]"); return 'NORM_CONTENT'}  //eat loan \n
<normal>.+               {console.log('GOT T4 ', "[" + yytext + "]"); return 'NORM_CONTENT'}  //eat loan \n


<*><<EOF>>               {console.log('GOT EOF', "[" + yytext + "]"); return 'EOF'}

/lex

/* operator associations and precedence */

%start file

%% /* language grammar */

//yytext,yyleng,yylineno,yy,yystate
//http://www.gnu.org/software/bison/manual/bison.html#Actions

file
    : sections EOF
        {var util = require('util');console.log("We're done. DISCO!");console.log(util.inspect($1,false,4,true)); return $1;}
    ;
             
sections
    : section
        {console.log('G2:',$1);$$ = [$1];}
    | sections section
        {console.log('G1:',$1);$$ = $1.concat($2);}
    ;

section
    : fragtag
        {$$ = $1; $$['type']='frgtag';}
    | normal
    ;

fragtag
     : fragtag_selfclosing
     | fragtag_openandclose
     ; 
     
fragtag_openandclose
     : fragtag_open fragtag_close
     | fragtag_open normal fragtag_close
        {$$ = $1; $$['content']=$2; $$['raw'] += $2.raw + $3.raw }
     ;

fragtag_open
     : FRAG_TAG_START FRAG_TAG_START_OPEN FRAG_TAG_CMD fragtag_attributes FRAG_TAG_END_OPEN
        {$$ = {command:$3, attributes:$4.hash, raw: '<!---fragment' + $3 + $4.raw + '--->', raw1: '<!---fragment' + $3 + $4.raw + '--->', raw3: '<!---/fragment' + $3 + '--->'};}
     | FRAG_TAG_START FRAG_TAG_START_OPEN FRAG_TAG_CMD FRAG_TAG_END_OPEN
        {$$ = {command:$3}}
     ;

fragtag_close
     : FRAG_TAG_START FRAG_TAG_START_CLOSE FRAG_TAG_CMD FRAG_TAG_END_OPEN
        {$$ = {raw:$1 + $2 + $3 + $4}}
     ;

fragtag_selfclosing
     : FRAG_TAG_START FRAG_TAG_START_OPEN FRAG_TAG_CMD fragtag_attributes FRAG_TAG_END_CLOSED
        {$$ ={command:$3, attributes:$4.hash, raw: '<!---fragment' + $3 + $4.raw + '/--->', raw1: '<!---fragment' + $3 + $4.raw + '--->', raw3: '<!---/fragment' + $3 + '--->'}}
     ;

fragtag_attributes
     : fragtag_attribute
        {$$ = {hash:{}, raw:''}; $$.hash[$1.name] = $1.value; $$.raw += $1.raw }
     | fragtag_attributes fragtag_attribute
        {$$ = $1;                $$.hash[$2.name] = $2.value; $$.raw += $2.raw  }
     ;

fragtag_attribute
     :  FRAG_TAG_ATR_NAME FRAG_TAG_ATR_START FRAG_TAG_ATR_VALUE FRAG_TAG_ATR_END
        {$$ = {name:$1, value:$3, raw: ' ' + $1 + $2 + $3 + $4}}
     ;
     
     
fragtag_contents
     : FRAG_TAG_CONTENT
     | FRAG_TAG_CONTENT fragtag_contents
             {$$ = $1 + $2;}
     ;

normal
     : normalw
             {$$ = {type:'normal', raw:$1};}
      ;
     
normalw
     : NORM_START 
     | NORM_START norm_contents
             {$$ = $1 + $2;}
     ;

norm_contents
     : NORM_CONTENT
     | NORM_CONTENT norm_contents
             {$$ = $1 + $2;}
     ;     