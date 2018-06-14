'use strict';

const path = require('path');
const os = require('os');
const fsPromises = require('fs').promises;

const ava = require('ava');

require('../../scope/h1');
const tests = require('../../lib/tests');

const now = Date.now();

const download = (resource, destination) => tests.run(`disk download --disk ${resource._id} --destination-file ${destination}`);
const resize = (resource, size) => tests.run(`disk resize --disk ${resource._id} --size ${size}`);

['archive', 'ssd', 'volume'].forEach(type =>
    ava.test.serial(`disk life cycle ${type}`, tests.resourceLifeCycle('disk', `--name disk-test-${now} --size 100 --type ${type}`))
);

ava.test.serial('disk create & download', async t => {
    const tmp_filename = path.join(os.tmpdir(), `cli-dcisk-${now}.vhdx`);
    const createParams = `--name disk-test-${now} --size 1 --type ssd`;
    const fresh_disk = await tests.create('disk', createParams);
    t.true(fresh_disk.created);

    await download(fresh_disk, tmp_filename);
    await fsPromises.access(tmp_filename);

    await tests.remove('disk', fresh_disk);

    const recreated_disk = await tests.create('disk', `${createParams} --no-progress --source-file ${tmp_filename}`);
    t.true(recreated_disk.created);

    await fsPromises.unlink(tmp_filename);
    await tests.remove('disk', recreated_disk);
    // TODO: Make the test that the re-downloaded disk is identical.
    // Take into account that the file will differ in metadata.
});

ava.test.serial('disk create & resize', async t => {
    const createParams = `--name disk-test-${now} --size 1 --type ssd`;
    const resource = await tests.create('disk', createParams);
    t.true(resource.size === 1);

    await resize(resource, 2);

    const resized_resource = await tests.show('disk', resource);
    t.true(resized_resource.size === 2);

    await tests.remove('disk', resource);
});
