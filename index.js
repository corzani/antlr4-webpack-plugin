'use strict';

// Webpack port of the grunt task => http://github.com/olukyrich/grunt-antlr4

var childProcess = require('child_process');

module.exports = function(options) {
    return {
        apply: apply.bind(this, options)
    };
};

function apply(settings,compiler) {
  compiler.plugin('compile', function() {
        var commandLine = ['-jar', __dirname + '/antlr-4.5.2-complete.jar'];
        var options = settings.options;
        if (options.flags) options.flags.forEach(function (flag) {
            commandLine.push('-' + flag);
        });
        delete options.flags;
        if (options.grammarLevel) Object.keys(options.grammarLevel).forEach(function (optionKey) {
            commandLine.push('-D' + optionKey + '=' + options.grammarLevel[optionKey]);
        });
        delete options.grammarLevel;
        Object.keys(options).forEach(function (optionKey) {
            commandLine.push('-' + optionKey);
            commandLine.push(options[optionKey]);
        });
        commandLine.push(settings.grammar);
        childProcess.spawnSync('java', commandLine, {stdio: 'inherit'});      
  });
};
