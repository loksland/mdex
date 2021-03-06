mdex
====

Markdown in, github styled static docs out

Command line
------------

Install globally for command line use:
```bash
$ npm install mdex -g
```

```bash
$ mdex src/mydoc.md output/mydoc.html
```

A static github styled HTML doc will be generated

Run locally
-----------

Install module locally
```bash
$ npm install mdex --save
```

```js
var mdex = require('mdex.js');

mdex.generate('./tests/cheatsheet.md', './tests/output/cheatsheet.html', function(err, outputFile){

	if (err){
		throw err;
	}
	
	console.log('Successfully wrote to ' + outputFile);

});

```

Templating
----------

You can specify a custom template to generate command by adding an arg:


```bash
$ mdex src/mydoc.md templates/custom.html output/mydoc.html
```

```js
var mdex = require('mdex');

mdex.generate('./tests/cheatsheet.md', './tests/templates/narrow.html', './tests/output/cheatsheet.html', function(err, outputFile){

	if (err){
		throw err;
	}
	
	console.log('Successfully wrote to ' + outputFile);

});

```

Templates replace the following placeholder tags:
- `{{title}}`  
Autogenerated title will be inserted here. Place inside title tags.
- `{{style}}`  
An area in the head tag where the github style block will be added. Don't place inside style tags.
- `{{body}}`  
The body text placeholder

Note
----

*At the moment only HTML output is supported.*

### Release History ###

- v0.1.1 - Initial working version
- v0.1.2 - Command line pathing fix
- v0.1.3 - Added template config option   
- v0.1.4 - Documentation fix
- v0.1.5 - Dependencies update