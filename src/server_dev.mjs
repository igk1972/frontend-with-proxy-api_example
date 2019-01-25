/* jshint esversion: 6 */
/* jshint asi: true */
/* jshint node: true */
/* jshint varstmt: true */

'use strict'

import fs from 'fs'
import path from 'path'
import {Agent} from 'https'
import browserSync from 'browser-sync'
import httpProxy from 'http-proxy-middleware'


const agent = Agent({
	keepAlive: true,
})

const httpsCert = function(name){
	const fileCert = path.join('.', name)
	if (fs.existsSync(fileCert)) {
		agent.cert = fs.readFileSync(fileCert)
	}
}
const httpsKey = function(name){
	const fileKey = path.join('.', name)
	if (fs.existsSync(fileKey)) {
		agent.key = fs.readFileSync(fileKey)
	}
}

httpsCert('cert.pem')
httpsKey('key.pem')


const browser = browserSync.create()

browser.init({
	open: false,
	ui: false,
	notify: false,
  server: [
		'./static/',
	],
	port: 8080,
	files: ['./static/*.html', './static/**/*.{html,js,css}'],
	middleware: [
		httpProxy('/api', {
			pathRewrite: {'^/api' : ''},
			target: 'https://jsonplaceholder.typicode.com/todos/1',
			changeOrigin: true,
			agent: agent,
			logLevel: 'debug',
		}),
		{
			route: "/hello",
			handle: function (req, res, next) {
				let body = 'Hi!'
				res.end(body);
			}
		}
	]
})
