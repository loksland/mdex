
var mdex = require('./mdex.js');

var Spinner = require('cli-spinner').Spinner;
 
var spinner = new Spinner('%s');
spinner.setSpinnerString('|/-\\');
spinner.start();

mdex.generate('./tests/cheatsheet.md', './tests/output/cheatsheet.html', function(err, outputFile){

	spinner.stop(true);

	if (err){
		throw err;
	}
	
	console.log('Successfully wrote to ' + outputFile);
	
	spinner.start();
	
	mdex.generate('./README.md', './tests/output/readme.html', function(err, outputFile){

		spinner.stop(true);

		if (err){
			throw err;
		}

		console.log('Successfully wrote to ' + outputFile);
		
		spinner.start();
		
		mdex.generate('./tests/cheatsheet.md', './tests/templates/narrow.html', './tests/output/cheatsheet-narrow.html', function(err, outputFile){
		
			spinner.stop(true);
			
			if (err){
				throw err;
			}
			
			console.log('Successfully wrote to ' + outputFile);
		
		});

	});

});