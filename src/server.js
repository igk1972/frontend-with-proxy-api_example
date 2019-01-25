/* jshint esversion: 6 */
/* jshint asi: true */
/* jshint node: true */
/* jshint varstmt: true */

'use strict'


global.require = require('esm')(module)

const env = process.env.NODE_ENV === 'production' ? 'prod' :'dev'

global.require('./server_' + env + '.mjs')
