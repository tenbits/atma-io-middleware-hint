
				// source ./templates/RootModule.js
				(function(){
					
					var _src_action = {};
var _src_hint = {};

				// source ./templates/ModuleSimplified.js
				var _src_hint;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Importer = require("atma-io-middleware-importer");
var hint = require("jshint");
var jshint = hint.JSHINT;
var Utils = Importer.utils;
function process(content, file, compiler, method) {
    processFile(file, compiler.options.jshint, compiler.logger);
    return content;
}
exports.process = process;
function processFile(file, config, logger) {
    if (config === void 0) { config = getDefault(); }
    if (config == null)
        return;
    var globals = config.globals, options = config.options, ignore = config.ignore, nolog = config.nolog;
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
    var start = Date.now(), result = jshint(file.content, options, globals);
    logger.write((result ? 'Success'.green : ('Warn ' + jshint.errors.length).red) + " [" + (Date.now() - start) + "ms] " + file.uri.file);
    if (!result && !nolog) {
        var rgx_source = /^[ \t]*\/\/[ \t]*source/gm;
        var path = file.uri.toLocalFile(), map = Utils.map_parse(file.content, path), importedFile, currentImportedFile;
        jshint.errors.forEach(function (e) {
            if (!e)
                return;
            if (map) {
                importedFile = Utils.map_getFileAt(map, e.line);
                if (importedFile == null) {
                    if (e.line > map[0].start) {
                        logger.write('<hint:importedFile> file not resolved at ' + e.line, 'error');
                    }
                }
                else {
                    if (currentImportedFile == null
                        || currentImportedFile.file !== importedFile.file) {
                        logger.write(' ' + importedFile.file.trim().magenta);
                    }
                    currentImportedFile = importedFile;
                    e.line -= importedFile.start;
                }
            }
            var evidence = e.evidence, character = e.character, pos;
            logger.write(("[yellow<L" + e.line + ">:yellow<C" + character + ">] bold<" + e.reason + ">").color);
            if (evidence) {
                logger.write('  ' + evidence.trim().cyan);
            }
        });
    }
}
exports.processFile = processFile;
;
function file_mapImports(content) {
    var map = [];
}
function getDefault() {
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
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_hint) && isObject(module.exports)) {
						Object.assign(_src_hint, module.exports);
						return;
					}
					_src_hint = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_action;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hint_1 = _src_hint;
var io = global.io;
exports.Action = {
    help: {
        description: 'Run JSHint on specified files',
        args: {
            files: '<array|string>',
            jshint: '<object> jshint variables, support ignore property to ignore some files'
        }
    },
    process: function (config, done) {
        if (config.files == null) {
            done('Set file(s) in config.files');
            return;
        }
        if (typeof config.files === 'string') {
            config.files = [config.files];
        }
        var files = config.files.map(function (x) { return new io.File(x); }).filter(function (x) { return x.exists(); });
        files.forEach(function (file) {
            file.read();
            hint_1.processFile(file, config);
        });
        done();
    }
};
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_action) && isObject(module.exports)) {
						Object.assign(_src_action, module.exports);
						return;
					}
					_src_action = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				
"use strict";
var Base = require("atma-io-middleware-base");
var hint_1 = _src_hint;
var action_1 = _src_action;
module.exports = Base.create({
    name: 'atma-io-middleware-hint',
    defaultOptions: {},
    textOnly: true,
    process: hint_1.process,
    action: action_1.Action
});

				
				}());
				// end:source ./templates/RootModule.js
				