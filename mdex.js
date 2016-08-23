#! /usr/bin/env node

var githubMarkdownCss = require('generate-github-markdown-css');
var fs = require('fs');
var extrator = require("html-extractor");
var githubMarkdownRender = require('github-markdown-render');
// var pdf = require('html-pdf');
var path = require('path');

var Mdex = function(){
	
	return this;
	
};
// Can be called as:
// mdFile, outputFile, callback
// or 
// mdFile, templateFile, outputFile, callback
Mdex.generate = function(mdFile, templateFile, outputFile, callback) {
	
	
	
	if (callback == null && String(typeof(outputFile)) == 'function'){
		// No template arg
		callback = outputFile;
		outputFile = templateFile;
		templateFile = null;
		
	}
	
	if (!templateFile){
		templateFile = __dirname + path.sep + './templates/standard.html';
	}
	
	if (!fs.existsSync(templateFile)){
		return callback(new Error('Template file not found ('+templateFile+')'));
	}
	
	if (!fs.existsSync(mdFile)){
		return callback(new Error('Source file not found ('+mdFile+')'));
	}
	
	// Remove existing output file
	if (fs.existsSync(outputFile)){
		fs.unlinkSync(outputFile);
	}
	
	var template = fs.readFileSync(templateFile).toString(); 
	var markdown = fs.readFileSync(mdFile).toString(); 
	
	// Get css from github
	githubMarkdownCss(function (err, css) {
		
		if (err){
			return callback(err);
		}
		
		
		//console.log('HOLA');
		
		githubMarkdownRender(markdown).then(body => {
			
		// Render md as html
		//githubMarkdownRender(markdown, function (err, body) {
		
			console.log('githubMarkdownRender GOT');
		
			
			if (err){
				return callback(err);
			}
		
			// Read the h1 to inject into title
			var ex = new extrator();
			ex.extract(body, null, function(err, data){
				
				if (err){
					return callback(err);
				}
			
				var title = '';
				if (data.h1 && data.h1.length > 0){
					title = data.h1[0];
				}
			
				var oputput = template;
				oputput = oputput.split('{{title}}').join(title);
				oputput = oputput.split('{{style}}').join('<style>\n'+css+'\n</style>');
				oputput = oputput.split('{{body}}').join(body);
				
				var ext = path.extname(outputFile).toLowerCase();
				if (ext == '.html'){				
				
					fs.writeFileSync(outputFile, oputput);				
					
					if (!fs.existsSync(outputFile)){
						return callback(new Error('Failed to create output file ('+outputFile+')')); 
					} else {
						return callback(null, outputFile);
					}
				
				} else {
					return callback(new Error('Output filetype not supported ('+ext+')'));
				}
				
			});
		});
	});
};

// Export 
// ------

var argv = require('minimist')(process.argv.slice(2));
if (argv['_'] && (argv['_'].length == 2 || argv['_'].length == 3)){

	var Spinner = require('cli-spinner').Spinner;
 
	var spinner = new Spinner('%s');
	spinner.setSpinnerString('|/-\\');
	spinner.start();
	
	var mdFile, templateFile, outputFile;
	if (argv['_'].length == 2){
		mdFile = argv['_'][0];
		templateFile = null;
		outputFile = argv['_'][1];		
	} else if (argv['_'].length == 3){
		mdFile = argv['_'][0];
		templateFile = argv['_'][1];
		outputFile = argv['_'][2];
	}
	
	Mdex.generate(mdFile, templateFile, outputFile, function(err, outputFile){
		
		spinner.stop(true);
	
		if (err){
			throw err;
		}
		console.log('Successfully generated \''+outputFile+'\'');
	});
} else {
	module.exports = Mdex;
}
