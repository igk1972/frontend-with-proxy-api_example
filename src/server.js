/* jshint esversion: 6 */
/* jshint asi: true */
/* jshint node: true */
/* jshint varstmt: true */

'use strict'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

global.__filename = fileURLToPath(import.meta.url)
global.__dirname = dirname(__filename)

const env = process.env.NODE_ENV === 'production' ? 'prod' :'dev'

await import( join(__dirname, 'server_' + env + '.js') )
