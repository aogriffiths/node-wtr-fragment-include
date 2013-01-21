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

* __fragment-include__ - Wash your files with this preprocessor and then DRY.
    * On [github.com](https://github.com/aogriffiths/node-wtr-fragment-include)
    * On [npmjs.org](https://npmjs.org/package/fragment-include)

So What Does it Do?!
--------------------

It's a command line tool call called `fipp` (fragment include pre-processor),
that helps you include fragments from some files into others, so you 
Dont Repeat Yourself.

Great for including examples from your code in your documentation.

How Does it Work?
-----------------

fipp instructions are embedded in your files using comments. This means they won't 
effect the normal use of your files, but fipp parse for and use them.

There are two kinds of files fipp works with, source and target. The most basic 
use of fipp is:

```bash
fipp <target>
```

fipp will parse the target file looking for `fragment-include*` instuctions which it
replaces with fragments from source files. Fragments in the source files are denfined
using `fragment-define*` instuctions. There are five instuctions in total.

* **fragment-include {source}{fragmentid}** - shorthand for pair of 
  fragment-include-start and fragment-include-end tags.
* **fragment-include-start {source}{fragmentid}** - the start of a fragment-include 
  region in a target file.
* **fragment-include-end** - the end of a fragment-include region in a target file.
* **fragment-define-start {fragmentid}** - the start of a fragment definition  in a 
  source file. 
* **fragment-define-end** - the end of a fragment definition in a source file.

fipp uses the following logic.

1. Replaces any **fragment-include** instructions with a pair of **fragment-include-start** 
   and **fragment-include-end** instructions.
2. Anything between a **fragment-include-start** and **fragment-include-end** instruction
   is defined as an *include region*.
3. Extracts all {source}{fragmentid} references from the 
   **fragment-include-start {source}{fragmentid}** instructions.
4. Extracts the *fragments* from the source files specified by {source}. Fragments are defined 
   as everything between a **fragment-define-start {fragmentid}** and a 
   **fragment-define-end** instruction.
5. Inserts the *fragments* extracted from source files into the *include regions* defined in the target 
   file.


Comments Reference
------------------

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

