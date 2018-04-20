'use strict';

const genericResource = require('bin/generic');
const genericDefaults = require('bin/generic/defaults');

const resource = {
    name: 'vm'
  , defaultQuery: '[].{id:_id,name:name,flavour:flavour,state:state,processing:processing}'
  , url: () => 'vm'
  , plugins: genericDefaults.plugins
  , commands: [ 'list', 'show' ]
};

const childDefaults = Object.assign({}, resource, {
    params: {
        id: {
            description: 'Resource identifier'
          , type: 'string'
          , required: true
        }
    }
  , url: args => `${resource.url(args)}/${args.id}`
});

const category = genericResource(resource);

category.addChild(require('./create'));
category.addChild(require('./delete')(resource));

category.addChild(require('./queue')(childDefaults));
category.addChild(require('./console')(childDefaults));

category.addChild(require('./action/generic')('stop'));
category.addChild(require('./action/generic')('start'));
category.addChild(require('./action/generic')('restart'));
category.addChild(require('./action/generic')('turnoff'));
category.addChild(require('./action/rename'));
category.addChild(require('./action/userdata'));

category.addChild(require('./disk'));
category.addChild(require('./nic'));
category.addChild(require('./dvd'));
category.addChild(require('./tag')(resource));

category.addChild(require('./ssh')(childDefaults));
category.addChild(require('./serialport')(resource));
category.addChild(require('./passwordreset')(resource));
category.addChild(require('./metrics')(childDefaults));

module.exports = category;
