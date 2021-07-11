const http = require('http')
const assert = require('assert')

require('dotenv').config()


const shouldBeOk = (method, path, done) => {
  http
    .request(
      {
        host: process.env.HOST,
        port: process.env.PORT,
        method,
        path,
      },
      response => {
        assert.equal(200, response.statusCode);
        done()
      },
    )
    .end()
}
