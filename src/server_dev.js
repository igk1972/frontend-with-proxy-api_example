/* jshint esversion: 6 */
/* jshint asi: true */
/* jshint node: true */
/* jshint varstmt: true */

'use strict'

import fs from 'fs'
import path from 'path'
import browserSync from 'browser-sync'
import { createProxyMiddleware } from 'http-proxy-middleware'


const target_api = {
	protocol: 'https:',
	host: 'jsonplaceholder.typicode.com',
	method: 'GET',
  headers: {
    accept: 'application/json'
	},
}

const httpsCert = function(name = 'cert.pem'){
	const fileCert = path.join('.', name)
	if (fs.existsSync(fileCert)) {
		target_api.cert = fs.readFileSync(fileCert)
	}
}
const httpsKey = function(name = 'key.pem'){
	const fileKey = path.join('.', name)
	if (fs.existsSync(fileKey)) {
		target_api.key = fs.readFileSync(fileKey)
	}
}
const httpsPass = function(){
	target_api.passphrase = process.env.CERT_PASS
}

httpsCert()
httpsKey()
httpsPass()


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
			logLevel: 'debug',
		}),
		{
			route: '/hello',
			handle: function (req, res, next) {
				let body = 'Hi!'
				res.end(body)
			}
		},
	],
})
