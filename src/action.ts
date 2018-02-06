import { processFile } from './hint'
const io = (global as any).io;

export const Action = {

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

        var files = config.files.map(x => new io.File(x)).filter(x => x.exists());


        files.forEach(file => {
            file.read();
            processFile(file, config);
        });

        done();
    }
};
