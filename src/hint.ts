import { Compiler } from 'atma-io-middleware-base'
import * as Importer from 'atma-io-middleware-importer'
import { File } from 'atma-io'
import * as hint from 'jshint'
import * as logger from 'atma-logger'

const jshint = hint.JSHINT;
const Utils = Importer.utils;


export function process(content, file, compiler: Compiler, method: 'read' | 'write') {

	processFile(file, compiler.options.jshint, compiler.logger);
	return content;
}


export function processFile(file: File, config = getDefault(), logger) {
	if (config == null)
		return;

	let globals = config.globals,
		options = config.options,
		ignore = config.ignore,
		nolog = config.nolog;

	/**
	 *  DO not apply jshint on minimized scripts
	 */
	if (file.uri.file.indexOf('.min.') > -1) {
		return;
	}

	if (ignore && ignore.hasOwnProperty(file.uri.file)) {
		return;
	}

	if (typeof file.content !== 'string') {
		file.content = file.content.toString();
	}

	var start = Date.now(),
		result = jshint(file.content, options, globals);

	logger.write(
		`${(result ? 'Success'.green : ('Warn ' + jshint.errors.length).red)} [${(Date.now() - start)}ms] ${file.uri.file}`
	);


	if (!result && !nolog) {
		var rgx_source = /^[ \t]*\/\/[ \t]*source/gm;

		var path = file.uri.toLocalFile(),
			map = Utils.map_parse(file.content, path),

			importedFile, currentImportedFile;


		jshint.errors.forEach(function (e) {

			if (!e)
				return;

			if (map) {

				importedFile = Utils.map_getFileAt(map, e.line);

				if (importedFile == null) {

					if (e.line > map[0].start) {

						logger.write('<hint:importedFile> file not resolved at ' + e.line, 'error');
					}
				} else {

					if (currentImportedFile == null
						|| currentImportedFile.file !== importedFile.file) {

						logger.write(' ' + importedFile.file.trim().magenta);
					}

					currentImportedFile = importedFile;

					e.line -= importedFile.start;
				}
			}


			var evidence = e.evidence,
				character = e.character,
				pos;

			logger.write(
				(`[yellow<L${e.line}>:yellow<C${character}>] bold<${e.reason}>` as any).color
			);

			if (evidence) {
				logger.write('  ' + evidence.trim().cyan);
			}
		});
	}
};


function file_mapImports(content) {
	var map = [];
}


function getDefault () {
	var options = {
		"bitwise": false,
		"camelcase": false,
		"curly": false,
		"eqeqeq": true,
		"es3": false,
		"forin": false,
		"freeze": false,
		"immed": true,
		"indent": 2,
		"latedef": "nofunc",
		"newcap": false,
		"noarg": true,
		"noempty": true,
		"nonbsp": true,
		"nonew": false,
		"plusplus": false,
		"quotmark": false,
		"undef": true,
		"unused": false,
		"strict": false,
		"trailing": false,
		"maxparams": false,
		"maxdepth": false,
		"maxstatements": false,
		"maxcomplexity": false,
		"maxlen": false,
		"asi": true,
		"boss": false,
		"debug": true,
		"eqnull": true,
		"esnext": true,
		"evil": true,
		"expr": true,
		"funcscope": false,
		"gcl": false,
		"globalstrict": true,
		"iterator": false,
		"lastsemic": true,
		"laxbreak": true,
		"laxcomma": true,
		"loopfunc": false,
		"maxerr": false,
		"moz": false,
		"multistr": true,
		"notypeof": false,
		"proto": true,
		"scripturl": false,
		"smarttabs": true,
		"shadow": true,
		"sub": true,
		"supernew": true,
		"validthis": true,
		"noyield": false,
		"browser": true,
		"couch": false,
		"devel": false,
		"dojo": false,
		"jquery": true,
		"mootools": false,
		"node": true,
		"nonstandard": false,
		"phantom": false,
		"prototypejs": false,
		"rhino": false,
		"worker": false,
		"wsh": false,
		"yui": false,
		"nomen": false,
		"onevar": false,
		"passfail": false,
		"white": false,
		"predef": [
			"global",
			"include",
			"define",
			"atma",
			"eq_",
			"notEq_",
			"deepEq_",
			"notDeepEq_",
			"has_",
			"hasNot_"
		]
	};
	return {
		options: options,
		globals: options.predef
	};
}