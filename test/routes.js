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


const shouldHaveMessage = (method, path, message, done) => {
  http
    .request(
      {
        host: process.env.HOST,
        port: process.env.PORT,
        method,
        path,
      },
      response => {
        let data = ''

        response.on('data', chunk => {
          data += chunk
        })

        response.on('end', () => {
          assert.equal(message, data)
          done()
        })
      },
    )
    .end()
}

// test the GET method of /login route
describe('GET /login', () => {
  it('should have the correct status (200)', done => {
    shouldBeOk('GET', '/login', done)
  })

  it('should have the correct message', done => {
    shouldHaveMessage('GET', '/login', done)
  })
})


// test the POST method of /login route
describe('POST /login', () => {
  it('should have the correct status code (200)', done => {
    shouldBeOk('POST', '/login', done)
  })

  it('should have the correct message', done => {
    shouldHvaeMessage('POST', '/login', done)
  })
})
