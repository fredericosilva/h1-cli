'use strict';
const Cli = require('structured-cli');

const epilog = require('lib/epilog');

module.exports = {
    createCommand: (name, options) => {
        const command = Cli.createCommand(name, options);

        if (options.dirname) {
            epilog.examples(command, options.dirname);
        }
        return command;
    },
    createCategory: (name, options) => {
        const category = Cli.createCategory(name, options);
        if (options.dirname) {
            epilog.examples(category, options.dirname);
        }
        return category;
    },
    run: cli => {
        // console.log(process.argv);
        // console.log(cli);
        const result = Cli.run(cli);
        // console.log(process.argv);
        return result;
    },
    error: Cli.error,
};
