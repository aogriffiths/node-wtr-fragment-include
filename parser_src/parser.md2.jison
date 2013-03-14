%lex

%%
"<!---"                             {this.begin('incomment'); return 'OPENCOMMENT';}
"--->"                              {this.popState(); return 'CLOSECOMMENT';}
<incomment>\s+                      {/* skip whitespace */}
<incomment>"fragment-include-start" {return 'START';}
<incomment>"fragment-include-end"   {return 'END';}
<incomment>.*                       {return 'COMMENTTEXT';}
.*                                  {return 'NORMALTEXT';}      
<<EOF>>                             {return 'EOF';}

/lex

%%

SIMPLE
    : OPENCOMMENT COMMENTTEXT CLOSECOMMENT {print($1); return $1;}
    ;