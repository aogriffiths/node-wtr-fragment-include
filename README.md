```
                                 .("""")                                      (j)
                               (_(_ __(_ )                                 (n o d e)
             _                   / / /                       (n)              (s)
 )) ) ) ___  )_ __ __           / / /           n            \|/              \|/
((,(,' (_(| (_ (('(|             n             \|/            |                |
```
Part of the [Node Water](https://github.com/aogriffiths/node-wtr) collection. 

Introduction
------------

* __fragment-include__ - Wash your files with this preprocessor and DRY.
    * On [github.com](https://github.com/aogriffiths/node-wtr-fragment-include)
    * On [npmjs.org](https://npmjs.org/package/fragment-include)

So What Does it Do?!
--------------------

It's a command line tool call called fipp (the fragment include pre-processor),
which helps you include fragments from some files in others, so you 
Dont Repeat Yourself.

Great for including examples from your code in your documentation.

How Does it Work?
-----------------

Fipp instructions are embedded in your files using comments. This means they won't 
effect the normal use of your files, but fipp parse for and use them.

There are two kinds of files fipp works with, source and target. The most basic 
use of fipp is:

```bash
$ fipp <target>
```

Fipp will parse the target file looking for **fragment-include\* ** instuctions which it will
replace with fragments from source files. Fragments in the source files are denfined
using **fragment-define\* ** instuctions. There are five instuctions in total.

* **fragment-include {source}{fragmentid}** - shorthand for pair of 
  **fragment-include-start** and **fragment-include-end tags**.
* **fragment-include-start {source}{fragmentid}** - the start of a fragment-include 
  region in a target file.
* **fragment-include-end** - the end of a fragment-include region in a target file.
* **fragment-define-start {fragmentid}** - the start of a fragment definition  in a 
  source file. 
* **fragment-define-end** - the end of a fragment definition in a source file.

Fipp uses the following logic.

1. Replace any **fragment-include** instructions with a pair of **fragment-include-start** 
   and **fragment-include-end** instructions.
2. Anything between a **fragment-include-start** and **fragment-include-end** instruction
   is defined as an *include region*.
3. Extract all **{source}{fragmentid}** references from the 
   **fragment-include-start {source}{fragmentid}** instructions.
4. Extracts the *fragments* from the source files specified by **{source}**. *Fragments* are 
   everything between a **fragment-define-start {fragmentid}** and a 
   **fragment-define-end** instruction.
5. Inserts the *fragments* extracted from source files into the *include regions* defined 
   in the target file.

Example
-------

file1.md
```md
#Here is an example
<!--- fragment-include file2.js#example1 --->
```

file2.js
```js
var a = 1;
/*** fragment-define-start example1 ***/
var b = 2;
/*** fragment-define-end ***/
var c = 3;
```
`fipp file1.md` will updated file1.md to be:

file1.md
```md
#Here is an example
<!--- fragment-include-start file2.js#example1 --->
\`\`\`js
var b = 2;
\`\`\`
<!--- fragment-include-end --->
```

Comments
--------

Fipp looks for comments in a file based on it's extension. The comments must be exactly as follows: 

* **.html or .md** - comments must start with `<!--- ` and end with ` --->`.
* **.js** - comments must start with `/*** ` and end with ` ***/`.

Installation
------------

Official releases can be obtained from:
* __github.com__ - the [tags section](https://github.com/aogriffiths/node-wtr-fragment-include/tags) 
                   provides links to zip or tar.gz packages. 
* __npm__        - use `npm install -g fragment-include`

The lastest developed code may node have not have been released, but can always be found
from:
* __github.com__ - the [project homepage](https://github.com/aogriffiths/node-wtr-fragment-include)
                   provides links to all the source code, branches and issue tracking.
                   
Help
----
See the output of fipp --help

