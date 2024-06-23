/* jshint esversion: 6 */
/* jshint asi: true */
/* jshint node: true */
/* jshint varstmt: true */

'use strict'

import express from 'express'
import {Agent} from 'https'
import { createProxyMiddleware } from 'http-proxy-middleware'

const target_api = {
	protocol: 'https:',
	host: 'jsonplaceholder.typicode.com',
	method: 'GET',
  headers: {
    accept: 'application/json'
	},
}

const agent = Agent({
	keepAlive: true,
})


const app = express()

app.use(
  createProxyMiddleware({
    pathFilter: [
      '/api/**',
    ],
    pathRewrite: {
      '^/api': '',
    },
    target: Object.assign(
      {
        path: '',
      },
      target_api
    ),
  changeOrigin: true,
  agent: agent,
  logLevel: 'error',
})
)

app.use(
  '/hello',
  function (req, res, next) {
    let body = 'Hi!'
    res.end(body)
  }
)

app.listen(8080)
