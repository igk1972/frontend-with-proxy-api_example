/* jshint esversion: 6 */
/* jshint asi: true */
/* jshint node: true */
/* jshint varstmt: true */

'use strict'

import fs from 'fs'
import path from 'path'
import {Agent} from 'https'
import httpProxy from 'http-proxy-middleware'


const agent = Agent({
	keepAlive: true,
})

httpProxy('/api', {
  pathRewrite: {'^/api' : ''},
  target: 'https://jsonplaceholder.typicode.com/todos/1',
  changeOrigin: true,
  agent: agent,
  logLevel: 'error',
})
