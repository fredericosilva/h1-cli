'use strict';
const cli = require('../bin/index.js');

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

const run = async (cmd) => {
    if (typeof cmd === 'string') {
        cmd = {cmd: cmd, history: []};
    }
    cmd.history.push();
    const old_argv = process.argv;

    process.argv = ['node', process.env.SCOPE_NAME, ...cmd.cmd.split(' ').filter(x => x.trim()), '-o', 'json'];
    console.log(new Date().toISOString(), process.argv.join(' '));

    try {
        const result = await cli.run();
        process.argv = old_argv;
        return result;
    } catch (err) {
        console.log(err);
        throw {cmd: cmd, err: err, history: cmd.history};
    }
};

const create = (type, params) => run(`${type} create ${params}`);
const show = (type, resource) => run(`${type} show --${type} ${resource._id}`);
const remove = (type, resource) => run(`${type} delete --${type} ${resource._id} --yes`);

const wrap = (type, createParams, func) => async t => {
    // await delay(wait++ * 2000);
    const resource = await create(type, createParams);

    t.true(resource.created);
    await func(t, resource);
    await remove(type, resource);
};

const resourceLifeCycle = (type, createParams) => wrap(type, createParams, async (t, resource) => {
    const history = [];
    const list = await run({cmd: `${type} list`, history: history});
    t.true(list.some(d => d._id === resource._id));

    await run({cmd: `${type} show --${type} ${resource._id}`, history: history});
});

module.exports = {resourceLifeCycle, show, create, remove, run, delay};
